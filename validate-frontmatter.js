#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, 'src', 'content', 'posts');
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

console.log(`Validating ${files.length} files...\n`);

let errorCount = 0;

files.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) {
    console.log(`✗ ${file}: No frontmatter found`);
    errorCount++;
    return;
  }
  
  try {
    const parsed = yaml.load(match[1]);
    if (!parsed.slug) {
      console.log(`✗ ${file}: Missing slug field`);
      errorCount++;
    }
  } catch (e) {
    console.log(`✗ ${file}: ${e.message}`);
    errorCount++;
  }
});

console.log(`\n${errorCount > 0 ? '❌' : '✅'} Found ${errorCount} errors`);
process.exit(errorCount > 0 ? 1 : 0);
