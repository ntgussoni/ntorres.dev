import { useEffect, useId, useRef, useState } from 'react';
import { absoluteUrl } from '../lib/site';

function MarkdownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-neutral-500"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M2.5 3.5h11v9h-11v-9z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M5 6.5h6M5 8.5h4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-neutral-500"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="M6 3.5h6.5V10M9.5 6.5 3 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 text-neutral-500 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function MenuItem({ href, onClick, icon, title, description, external }) {
  const className =
    'flex w-full items-start gap-3 rounded-md px-3 py-2.5 text-left transition-colors hover:bg-neutral-50';

  const content = (
    <>
      {icon}
      <span className="min-w-0">
        <span className="block text-sm font-medium text-neutral-900">{title}</span>
        <span className="mt-0.5 block text-xs text-neutral-500">{description}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a
        className={className}
        href={href}
        onClick={onClick}
        rel={external ? 'noopener noreferrer' : undefined}
        target={external ? '_blank' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {content}
    </button>
  );
}

export default function CopyPageMenu({ slug, title }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const rootRef = useRef(null);
  const menuId = useId();

  const pageUrl = absoluteUrl(`/blog/${slug}`);
  const markdownPath = `/blog/${slug}.md`;
  const chatGptUrl = `https://chatgpt.com/?hints=search&q=${encodeURIComponent(
    `Read ${pageUrl} and answer questions about this article: ${title}`
  )}`;
  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(
    `Read ${pageUrl} and answer questions about this article: ${title}`
  )}`;

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copyMarkdown = async () => {
    setCopyError(false);

    try {
      const response = await fetch(markdownPath);
      if (!response.ok) throw new Error('Failed to load markdown');

      const markdown = await response.text();
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setOpen(false);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition-colors hover:bg-neutral-50"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        {copied ? 'Copied' : copyError ? 'Copy failed' : 'Copy page'}
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          className="absolute right-0 z-20 mt-2 w-72 overflow-hidden rounded-xl border border-neutral-200 bg-white p-1.5 shadow-lg"
          id={menuId}
          role="menu"
        >
          <MenuItem
            description="Open this page in Markdown"
            external
            href={markdownPath}
            icon={<MarkdownIcon />}
            onClick={() => setOpen(false)}
            title="View as Markdown"
          />
          <MenuItem
            description="Copy the source Markdown to your clipboard"
            icon={<MarkdownIcon />}
            onClick={copyMarkdown}
            title="Copy Markdown"
          />
          <MenuItem
            description="Ask questions about this page"
            external
            href={chatGptUrl}
            icon={<ExternalIcon />}
            onClick={() => setOpen(false)}
            title="Open in ChatGPT"
          />
          <MenuItem
            description="Ask questions about this page"
            external
            href={claudeUrl}
            icon={<ExternalIcon />}
            onClick={() => setOpen(false)}
            title="Open in Claude"
          />
        </div>
      )}
    </div>
  );
}
