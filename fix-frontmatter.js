#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_DIR = path.join(__dirname, 'src', 'content', 'posts');

const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));

console.log(`Checking ${files.length} files...\n`);

files.forEach(file => {
  const filePath = path.join(POSTS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Normalize line endings to \n
  const normalized = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  
  // Check if the file needs fixing
  if (content !== normalized) {
    fs.writeFileSync(filePath, normalized, 'utf-8');
    console.log(`✓ Fixed: ${file}`);
  }
});

console.log('\n✅ Done!');
