import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT_DIR = process.cwd();

const IGNORED_DIRS = new Set([
  '.git',
  '.angular',
  'node_modules',
  'dist',
  'coverage',
  'storybook-static',
]);

const MARKDOWN_EXT = '.md';
const MARKDOWN_LINK_REGEX = /!?\[[^\]]*]\(([^)]+)\)/g;

async function main() {
  const markdownFiles = await collectMarkdownFiles(ROOT_DIR);
  const errors = [];
  let checkedLinks = 0;

  for (const filePath of markdownFiles) {
    const content = await readFile(filePath, 'utf8');
    const sanitized = stripCodeFences(content);

    MARKDOWN_LINK_REGEX.lastIndex = 0;
    let match = MARKDOWN_LINK_REGEX.exec(sanitized);
    while (match) {
      const rawTarget = match[1] ?? '';
      const target = normalizeTarget(rawTarget);

      if (isSkippableTarget(target)) {
        match = MARKDOWN_LINK_REGEX.exec(sanitized);
        continue;
      }

      checkedLinks += 1;
      const linkPath = stripHashAndQuery(target);
      const absoluteTarget = path.resolve(path.dirname(filePath), decodeURIComponent(linkPath));
      const exists = await pathExists(absoluteTarget);

      if (!exists) {
        errors.push({
          filePath,
          line: getLineNumber(sanitized, match.index),
          target,
        });
      }

      match = MARKDOWN_LINK_REGEX.exec(sanitized);
    }
  }

  if (errors.length > 0) {
    console.error(`Found ${errors.length} broken Markdown link(s):`);
    for (const error of errors) {
      const relativeFile = path.relative(ROOT_DIR, error.filePath);
      console.error(`- ${relativeFile}:${error.line} -> ${error.target}`);
    }
    process.exit(1);
  }

  console.log(
    `Markdown links check passed. Files: ${markdownFiles.length}. Links checked: ${checkedLinks}.`,
  );
}

async function collectMarkdownFiles(directoryPath) {
  const results = [];
  const entries = await readdir(directoryPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.name.startsWith('.DS_Store')) {
      continue;
    }

    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }

      const nested = await collectMarkdownFiles(fullPath);
      results.push(...nested);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(MARKDOWN_EXT)) {
      results.push(fullPath);
    }
  }

  return results;
}

function stripCodeFences(content) {
  return content.replace(/```[\s\S]*?```/g, '');
}

function normalizeTarget(rawTarget) {
  const trimmed = rawTarget.trim();
  if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
    return trimmed.slice(1, -1).trim();
  }

  const token = trimmed.split(/\s+/)[0] ?? '';
  return token.trim();
}

function isSkippableTarget(target) {
  if (!target) {
    return true;
  }

  if (target.startsWith('#')) {
    return true;
  }

  if (target.startsWith('/')) {
    return true;
  }

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(target)) {
    return true;
  }

  return false;
}

function stripHashAndQuery(target) {
  const noHash = target.split('#')[0] ?? '';
  return noHash.split('?')[0] ?? '';
}

function getLineNumber(content, index) {
  const prefix = content.slice(0, index);
  return prefix.split('\n').length;
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

await main();
