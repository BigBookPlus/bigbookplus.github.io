#!/usr/bin/env node

import fs from 'fs';
import yaml from 'js-yaml';

const content = fs.readFileSync('src/content/posts/2012-05-10-fftw-3.3.2-vs2010.zh.md', 'utf-8');

// Extract frontmatter
const match = content.match(/^---\n([\s\S]*?)\n---/);
if (match) {
  const frontmatterText = match[1];
  console.log('=== RAW FRONTMATTER ===');
  console.log(frontmatterText);
  console.log('\n=== PARSED ===');
  try {
    const parsed = yaml.load(frontmatterText);
    console.log(JSON.stringify(parsed, null, 2));
  } catch (e) {
    console.error('YAML Parse Error:', e.message);
  }
}
