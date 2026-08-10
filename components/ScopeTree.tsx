'use client';

import { useState } from 'react';
import { FolderSharp } from 'pixelarticons/react';
import type { SitemapItem } from '@/data/proposals';

function isLastSibling(items: SitemapItem[], i: number): boolean {
  const depth = items[i].depth;
  for (let j = i + 1; j < items.length; j++) {
    if (items[j].depth < depth) return true;
    if (items[j].depth === depth) return false;
  }
  return true;
}

function ancestorContinues(items: SitemapItem[], i: number, ancestorDepth: number): boolean {
  for (let j = i + 1; j < items.length; j++) {
    if (items[j].depth < ancestorDepth) return false;
    if (items[j].depth === ancestorDepth) return true;
  }
  return false;
}

// Trunk columns for each strict ancestor depth (excludes item i's own depth).
function ancestorPrefix(items: SitemapItem[], i: number): string {
  let prefix = '';
  for (let d = 0; d < items[i].depth; d++) {
    prefix += ancestorContinues(items, i, d) ? '│   ' : '    ';
  }
  return prefix;
}

// Same, plus a trunk segment for item i's own depth — a filler row leading up to item i
// always has more content coming (item i itself), so that column is never blank.
function fillerPrefix(items: SitemapItem[], i: number): string {
  return ancestorPrefix(items, i) + '│   ';
}

// Filler lines before each item, in line-height units: 2x from the button down to the
// first branch, 1x between siblings, none from a branch straight into its sub-branch —
// filled with the trunk above (where present) so the list never looks disconnected.
function fillerLineCount(items: SitemapItem[], i: number): number {
  if (i === 0) return 2;
  return items[i].depth > items[i - 1].depth ? 0 : 1;
}

interface TreeLine {
  connector: string;
  path?: string;
}

function buildTreeLines(items: SitemapItem[]): TreeLine[] {
  const lines: TreeLine[] = [];
  items.forEach((item, i) => {
    const filler = fillerPrefix(items, i);
    for (let f = 0; f < fillerLineCount(items, i); f++) {
      lines.push({ connector: filler });
    }
    const branch = isLastSibling(items, i) ? '└── ' : '├── ';
    lines.push({ connector: `${ancestorPrefix(items, i)}${branch}`, path: `.${item.path}` });
  });
  return lines;
}

export default function ScopeTree({ items }: { items: SitemapItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="proposal_tree-toggle"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <FolderSharp className="proposal_tree-icon" aria-hidden="true" />
        sitemap
      </button>
      {open && (
        <pre className="proposal_tree">
          {buildTreeLines(items).map((line, i) => (
            <div key={i}>
              <span className="proposal_tree-connector">{line.connector}</span>
              {line.path}
            </div>
          ))}
        </pre>
      )}
    </>
  );
}
