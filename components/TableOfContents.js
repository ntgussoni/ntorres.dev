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

const Headings = ({ headings, activeId }) => (
  <ul>
    {headings.map((heading) => (
      <li
        key={heading.id}
        className={clsx(
          'p-1',
          heading.id === activeId ? 'text-gray-800 ' : 'text-headers'
        )}
      >
        <a
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="ml-4">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={clsx(
                  'p-1',
                  child.id === activeId ? 'text-gray-800  ' : 'text-headers'
                )}
              >
                <a
                  href={`#${child.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${child.id}`).scrollIntoView({
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
  const headingElementsRef = useRef({});
  useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        // eslint-disable-next-line no-param-reassign
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        // eslint-disable-next-line no-use-before-define
        headingElements.findIndex((heading) => heading.id === id);

      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px 0px -40% 0px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

const ToC = () => {
  const [activeId, setActiveId] = useState();
  const [nestedHeadings, setNestedHeadings] = useState([]);
  useIntersectionObserver(setActiveId);

  useEffect(() => {
    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return (
    <nav
      aria-label="Table of contents"
      className="text-black sticky top-8 ml-8 mt-8 text-sm max-h-[calc(100vh-40px)]"
    >
      <Headings headings={nestedHeadings} activeId={activeId} />
    </nav>
  );
};

export default ToC;
