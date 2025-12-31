#!/usr/bin/env node

/**
 * Migration script to convert existing posts to Content Collections format
 * 
 * This script will:
 * 1. Read all markdown files from post/ directory
 * 2. Extract or infer metadata (title, date, tags, etc.)
 * 3. Create new files in src/content/posts/ with proper frontmatter
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POST_DIR = path.join(__dirname, 'post');
const ARCHIVE_DIR = path.join(POST_DIR, 'archive');
const OUTPUT_DIR = path.join(__dirname, 'src', 'content', 'posts');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function extractFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };
  
  const [, frontmatterText, bodyWithPossibleFrontmatter] = match;
  const frontmatter = {};
  
  // Parse YAML-like frontmatter
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentValue = [];
  
  lines.forEach(line => {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        frontmatter[currentKey] = currentValue.join('\n').trim();
      }
      currentKey = keyMatch[1];
      currentValue = [keyMatch[2]];
    } else if (currentKey && line.trim()) {
      currentValue.push(line.trim());
    }
  });
  
  if (currentKey) {
    frontmatter[currentKey] = currentValue.join('\n').trim();
  }
  
  // Remove any additional frontmatter blocks from the body
  let body = bodyWithPossibleFrontmatter;
  const secondFrontmatterMatch = body.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/);
  if (secondFrontmatterMatch) {
    body = secondFrontmatterMatch[1];
  }
  
  return { frontmatter, body };
}

function parseTagsFromFrontmatter(tagString) {
  if (!tagString) return [];
  
  // Handle array format: [tag1, tag2]
  const arrayMatch = tagString.match(/\[(.*?)\]/);
  if (arrayMatch) {
    return arrayMatch[1].split(',').map(t => t.trim().replace(/['"]/g, ''));
  }
  
  // Handle YAML list format
  const tags = [];
  const lines = tagString.split('\n');
  lines.forEach(line => {
    const match = line.match(/^-\s*(.+)$/);
    if (match) {
      tags.push(match[1].trim());
    }
  });
  
  return tags.length > 0 ? tags : [tagString];
}

function extractDateFromFilename(filename) {
  // Match YYYY-MM-DD pattern
  const match = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return new Date().toISOString().split('T')[0];
}

function generateSlug(filename, title) {
  // Remove date prefix and .md extension
  let slug = filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  
  // Remove language suffix if exists
  slug = slug.replace(/\.(zh|en)$/, '');
  
  // If slug is empty or just numbers, use title
  if (!slug || /^\d+$/.test(slug)) {
    slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
  }
  
  return slug;
}

function detectLanguage(content, filename) {
  // Check if filename has language suffix
  if (filename.includes('.zh.md')) return 'zh';
  if (filename.includes('.en.md')) return 'en';
  
  // Simple heuristic: count Chinese characters
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = content.replace(/\s/g, '').length;
  
  // Lower threshold for better detection
  return chineseChars / totalChars > 0.05 ? 'zh' : 'en';
}

function extractDescription(body) {
  // Try to get first meaningful paragraph
  const lines = body.split('\n').filter(l => l.trim());
  for (let line of lines) {
    // Skip headers, images, code blocks, horizontal rules
    if (line.startsWith('#') || line.startsWith('!') || line.startsWith('```') || line.startsWith('---')) continue;
    const cleanLine = line.trim();
    if (cleanLine.length > 20 && cleanLine.length < 300) {
      return cleanLine;
    }
  }
  return '';
}

function processFile(filePath, isArchive = false) {
  const filename = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const { frontmatter, body } = extractFrontmatter(content);
  
  // Extract metadata - try to get title from first H1 if frontmatter doesn't have it
  let title = frontmatter.title;
  if (!title || title === filename.replace(/\.md$/, '')) {
    const h1Match = body.match(/^#\s+(.+)$/m);
    if (h1Match) {
      title = h1Match[1].trim();
    } else {
      title = filename.replace(/\.md$/, '');
    }
  }
  const date = frontmatter.date || extractDateFromFilename(filename);
  const lang = detectLanguage(content, filename);
  const slug = generateSlug(filename, title);
  const tags = frontmatter.tag ? parseTagsFromFrontmatter(frontmatter.tag) : 
               frontmatter.tags ? parseTagsFromFrontmatter(frontmatter.tags) : [];
  const author = frontmatter.author || '';
  const description = frontmatter.description || frontmatter.subtitle || extractDescription(body);
  
  // Create new frontmatter
  const newFrontmatter = {
    title: title.replace(/^["']|["']$/g, ''),
    description: description.replace(/^["']|["']$/g, ''),
    date,
    lang,
    slug,
    tags,
    draft: false,
    featured: false,
  };
  
  if (author) {
    newFrontmatter.author = author.replace(/^["']|["']$/g, '');
  }
  
  // Build new content
  const newContent = `---
title: "${newFrontmatter.title}"
description: "${newFrontmatter.description}"
date: ${newFrontmatter.date}
lang: ${newFrontmatter.lang}
slug: "${newFrontmatter.slug}"
tags: [${newFrontmatter.tags.map(t => `"${t}"`).join(', ')}]
featured: ${newFrontmatter.featured}
draft: ${newFrontmatter.draft}${author ? `\nauthor: "${newFrontmatter.author}"` : ''}
---

${body.trim()}
`;

  // Generate output filename
  const outputFilename = `${date}-${slug}.${lang}.md`;
  const outputPath = path.join(OUTPUT_DIR, outputFilename);
  
  fs.writeFileSync(outputPath, newContent, 'utf-8');
  console.log(`✓ Migrated: ${filename} → ${outputFilename}`);
  
  return { filename: outputFilename, ...newFrontmatter };
}

// Process files
console.log('Starting migration...\n');

const stats = {
  total: 0,
  success: 0,
  errors: 0,
};

// Process archive files
if (fs.existsSync(ARCHIVE_DIR)) {
  const archiveFiles = fs.readdirSync(ARCHIVE_DIR).filter(f => f.endsWith('.md'));
  console.log(`Processing ${archiveFiles.length} archive files...`);
  
  archiveFiles.forEach(file => {
    try {
      stats.total++;
      processFile(path.join(ARCHIVE_DIR, file), true);
      stats.success++;
    } catch (error) {
      stats.errors++;
      console.error(`✗ Error processing ${file}:`, error.message);
    }
  });
}

// Process root post files
const rootFiles = fs.readdirSync(POST_DIR).filter(f => f.endsWith('.md'));
console.log(`\nProcessing ${rootFiles.length} root-level files...`);

rootFiles.forEach(file => {
  try {
    stats.total++;
    processFile(path.join(POST_DIR, file), false);
    stats.success++;
  } catch (error) {
    stats.errors++;
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✅ Migration complete!`);
console.log(`Total files: ${stats.total}`);
console.log(`Successful: ${stats.success}`);
console.log(`Errors: ${stats.errors}`);
console.log(`\nFiles saved to: ${OUTPUT_DIR}`);
