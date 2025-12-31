#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, 'src', 'content', 'posts');
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

console.log(`Processing ${files.length} files...\n`);

files.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    console.log(`⚠ ${file}: No frontmatter found, skipping`);
    return;
  }
  
  let frontmatterText = match[1];
  const body = match[2];
  
  try {
    // Try to parse as-is first
    yaml.load(frontmatterText);
    console.log(`✓ ${file}: Valid`);
  } catch (e) {
    console.log(`⚠ ${file}: ${e.message}`);
    console.log(`  Attempting to fix...`);
    
    // Fix common issues
    // 1. Replace curly quotes with straight quotes
    frontmatterText = frontmatterText
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'");
    
    // 2. Fix multiline descriptions that should be single line
    frontmatterText = frontmatterText.replace(
      /description: "([^"]*(?:"[^"]*"[^"]*)*)"(?:\s*\n\s*[^:\n]+)?/g,
      (match, desc) => {
        // Remove any line breaks within the description
        const cleanDesc = desc.replace(/\n\s*/g, ' ').trim();
        return `description: "${cleanDesc}"`;
      }
    );
    
    // 3. Ensure proper YAML structure
    const lines = frontmatterText.split('\n');
    const fixedLines = lines.map(line => {
      // Skip empty lines
      if (!line.trim()) return line;
      
      // If line starts with a key, ensure proper spacing
      if (line.match(/^[a-z]+:/)) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim();
        return `${key}: ${value}`;
      }
      
      return line;
    });
    
    frontmatterText = fixedLines.join('\n');
    
    // Try parsing again
    try {
      const parsed = yaml.load(frontmatterText);
      
      // Ensure required fields exist
      if (!parsed.slug) {
        console.log(`  ✗ Missing slug field`);
        return;
      }
      
      // Write fixed version
      const newContent = `---\n${frontmatterText}\n---\n${body}`;
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`  ✓ Fixed and saved`);
    } catch (e2) {
      console.log(`  ✗ Could not fix: ${e2.message}`);
    }
  }
});

console.log(`\nDone!`);
