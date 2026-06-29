import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const TOC_MAX_DEPTH = 2;

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];
  const stack = [];

  headingElements.forEach((heading) => {
    const level = Number(heading.nodeName.slice(1));
    const { innerText: title, id } = heading;
    const item = { id, title, items: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop();
    }

    if (stack.length === 0) {
      nestedHeadings.push(item);
    } else {
      stack[stack.length - 1].item.items.push(item);
    }

    stack.push({ level, item });
  });

  return nestedHeadings;
};

const headingKey = (heading, index, prefix) =>
  heading.id || `${prefix}-${index}-${heading.title}`;

const HeadingLink = ({ heading, activeId }) => (
  <a
    href={heading.id ? `#${heading.id}` : undefined}
    className="hover:text-neutral-700"
    onClick={(e) => {
      if (!heading.id) return;
      e.preventDefault();
      document.querySelector(`#${CSS.escape(heading.id)}`)?.scrollIntoView({
        behavior: 'smooth',
      });
    }}
  >
    {heading.title}
  </a>
);

const Headings = ({ headings, activeId, depth = 0 }) => (
  <ul className={depth === 0 ? 'space-y-1' : 'ml-3 mt-1 space-y-1 border-l border-neutral-200 pl-3'}>
    {headings.map((heading, index) => (
      <li
        key={headingKey(heading, index, `h-${depth}`)}
        className={clsx(
          depth === 0 && 'leading-snug',
          heading.id === activeId ? 'text-neutral-900' : 'text-neutral-400'
        )}
      >
        <HeadingLink heading={heading} activeId={activeId} />
        {heading.items.length > 0 && depth + 1 < TOC_MAX_DEPTH && (
          <Headings headings={heading.items} activeId={activeId} depth={depth + 1} />
        )}
      </li>
    ))}
  </ul>
);

const getArticleHeadings = () =>
  Array.from(
    document.querySelectorAll(
      'article .prose-blog h2, article .prose-blog h3, article .prose-blog h4, article .prose-blog h5, article .prose-blog h6'
    )
  );

const useIntersectionObserver = (setActiveId, contentKey) => {
  const headingElementsRef = useRef([]);
  const observedEntriesRef = useRef({});

  useEffect(() => {
    observedEntriesRef.current = {};
    setActiveId(undefined);

    const domHeadings = getArticleHeadings();
    headingElementsRef.current = domHeadings;

    const callback = (entries) => {
      entries.forEach((entry) => {
        observedEntriesRef.current[entry.target.id] = entry;
      });

      const visibleHeadings = Object.values(observedEntriesRef.current).filter(
        (entry) => entry.isIntersecting
      );

      const getIndexFromId = (id) =>
        headingElementsRef.current.findIndex((heading) => heading.id === id);

      let nextActiveId;
      if (visibleHeadings.length === 1) {
        nextActiveId = visibleHeadings[0].target.id;
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = [...visibleHeadings].sort(
          (a, b) => getIndexFromId(a.target.id) - getIndexFromId(b.target.id)
        );
        nextActiveId = sortedVisibleHeadings[0].target.id;
      }

      if (nextActiveId) {
        setActiveId((current) =>
          current === nextActiveId ? current : nextActiveId
        );
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    });

    domHeadings.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId, contentKey]);
};

const ToC = ({ variant = 'all', contentKey }) => {
  const [activeId, setActiveId] = useState();
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    setActiveId(undefined);
    const headingElements = getArticleHeadings();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM headings exist only after MDX mounts
    setNestedHeadings(getNestedHeadings(headingElements));
  }, [contentKey]);

  useIntersectionObserver(setActiveId, contentKey);

  if (nestedHeadings.length === 0) return null;

  const tocList = (
    <Headings headings={nestedHeadings} activeId={activeId} />
  );

  const showMobile = variant === 'all' || variant === 'mobile';
  const showDesktop = variant === 'all' || variant === 'desktop';

  return (
    <>
      {showMobile && (
        <details className="not-prose mb-8 rounded-lg border border-neutral-200 bg-neutral-50 lg:hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-neutral-900">
            On this page
          </summary>
          <div className="border-t border-neutral-200 px-4 py-3 text-xs">
            {tocList}
          </div>
        </details>
      )}

      {showDesktop && (
        <nav
          aria-label="Table of contents"
          className="hidden text-xs lg:block"
        >
          <p className="mb-3 font-medium uppercase tracking-wider text-neutral-400">
            On this page
          </p>
          {tocList}
        </nav>
      )}
    </>
  );
};

export default ToC;
