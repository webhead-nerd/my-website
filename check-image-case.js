#!/usr/bin/env node
/**
 * check-image-case.js
 *
 * Scans a Next.js project for image/asset references (in code) that don't
 * exactly match the real casing of files inside /public — the kind of bug
 * that works fine on Windows/Mac locally but 404s on Vercel (Linux).
 *
 * Usage:
 *   node check-image-case.js
 * Run this from the root of your Next.js project.
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');

const CODE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.mdx', '.css', '.scss']);
const IGNORE_DIRS = new Set(['node_modules', '.next', '.git', '.vercel', 'dist', 'build']);

// Matches quoted strings starting with "/" and ending in a common asset extension.
// e.g. "/images/mobile.bg.webp", '/Images/hero.png', `/fonts/Inter.woff2`
const ASSET_REF_REGEX = /["'`](\/[^"'`\s]+\.(?:png|jpe?g|webp|gif|svg|avif|ico|woff2?|ttf|mp4|json))["'`]/gi;

function walk(dir, exts, ignoreDirs, out = []) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (ignoreDirs.has(entry.name)) continue;
      walk(path.join(dir, entry.name), exts, ignoreDirs, out);
    } else if (exts === null || exts.has(path.extname(entry.name))) {
      out.push(path.join(dir, entry.name));
    }
  }
  return out;
}

// Build a case-sensitive set of every real file path under /public,
// as it would appear in a URL (e.g. "/images/mobile.bg.webp"),
// plus a lowercase-keyed lookup for finding near-matches.
function buildPublicIndex() {
  const realPaths = new Set();
  const lowerToReal = new Map();

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`No /public directory found at ${PUBLIC_DIR}`);
    process.exit(1);
  }

  const files = walk(PUBLIC_DIR, null, IGNORE_DIRS);
  for (const absPath of files) {
    const rel = '/' + path.relative(PUBLIC_DIR, absPath).split(path.sep).join('/');
    realPaths.add(rel);
    lowerToReal.set(rel.toLowerCase(), rel);
  }
  return { realPaths, lowerToReal };
}

function scanCodeForAssetRefs() {
  const files = walk(PROJECT_ROOT, CODE_EXTENSIONS, new Set([...IGNORE_DIRS, 'public']));
  const refs = []; // { ref, file, line }

  for (const absPath of files) {
    const content = fs.readFileSync(absPath, 'utf8');
    const lines = content.split('\n');
    lines.forEach((lineText, idx) => {
      let match;
      ASSET_REF_REGEX.lastIndex = 0;
      while ((match = ASSET_REF_REGEX.exec(lineText)) !== null) {
        refs.push({
          ref: match[1],
          file: path.relative(PROJECT_ROOT, absPath),
          line: idx + 1,
        });
      }
    });
  }
  return refs;
}

function main() {
  const { realPaths, lowerToReal } = buildPublicIndex();
  const refs = scanCodeForAssetRefs();

  const mismatches = [];
  const missing = [];
  const seen = new Set();

  for (const { ref, file, line } of refs) {
    const key = `${ref}|${file}|${line}`;
    if (seen.has(key)) continue;
    seen.add(key);

    if (realPaths.has(ref)) continue; // exact match, all good

    const lower = ref.toLowerCase();
    if (lowerToReal.has(lower)) {
      mismatches.push({ ref, actual: lowerToReal.get(lower), file, line });
    } else {
      missing.push({ ref, file, line });
    }
  }

  console.log(`Scanned ${realPaths.size} files in /public.\n`);

  if (mismatches.length === 0 && missing.length === 0) {
    console.log('✅ No case mismatches or missing references found.');
    return;
  }

  if (mismatches.length > 0) {
    console.log(`⚠️  CASE MISMATCHES (${mismatches.length}) — will 404 on Vercel:\n`);
    for (const m of mismatches) {
      console.log(`  ${m.file}:${m.line}`);
      console.log(`    code says:   ${m.ref}`);
      console.log(`    actual file: ${m.actual}\n`);
    }
  }

  if (missing.length > 0) {
    console.log(`❓ REFERENCED BUT NOT FOUND AT ALL (${missing.length}) — check these manually, may be external/dynamic/false positives:\n`);
    for (const m of missing) {
      console.log(`  ${m.file}:${m.line}  ->  ${m.ref}`);
    }
  }
}

main();