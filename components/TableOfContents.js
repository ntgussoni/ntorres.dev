import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const headingKey = (heading, index, prefix) =>
  heading.id || `${prefix}-${index}-${heading.title}`;

const Headings = ({ headings, activeId }) => (
  <ul className="space-y-1">
    {headings.map((heading, index) => (
      <li
        key={headingKey(heading, index, 'h2')}
        className={clsx(
          'leading-snug',
          heading.id === activeId ? 'text-neutral-900' : 'text-neutral-400'
        )}
      >
        <a
          href={heading.id ? `#${heading.id}` : undefined}
          className="hover:text-neutral-700"
          onClick={(e) => {
            if (!heading.id) return;
            e.preventDefault();
            document.querySelector(`#${heading.id}`)?.scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="ml-3 mt-1 space-y-1 border-l border-neutral-200 pl-3">
            {heading.items.map((child, childIndex) => (
              <li
                key={headingKey(child, childIndex, `h3-${index}`)}
                className={clsx(
                  child.id === activeId ? 'text-neutral-900' : 'text-neutral-400'
                )}
              >
                <a
                  href={child.id ? `#${child.id}` : undefined}
                  className="hover:text-neutral-700"
                  onClick={(e) => {
                    if (!child.id) return;
                    e.preventDefault();
                    document.querySelector(`#${child.id}`)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = useRef([]);
  const observedEntriesRef = useRef({});

  useEffect(() => {
    const domHeadings = Array.from(document.querySelectorAll('h2, h3'));
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
  }, [setActiveId]);
};

const ToC = ({ variant = 'all' }) => {
  const [activeId, setActiveId] = useState();
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- DOM headings exist only after MDX mounts
    setNestedHeadings(getNestedHeadings(headingElements));
  }, []);

  useIntersectionObserver(setActiveId);

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
          className="sticky top-20 hidden text-xs lg:block"
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
