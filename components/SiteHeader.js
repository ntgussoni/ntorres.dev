import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import Logo from './Logo';

const navLinks = [
  { href: '/blog', label: 'Blog' },
  { href: '/about-me', label: 'About' },
  { href: '/contact-me', label: 'Contact' },
];

export const SiteHeader = () => {
  const { pathname } = useRouter();
  const [menu, setMenu] = useState({ open: false, at: pathname });

  const menuOpen = menu.open && menu.at === pathname;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const openMenu = () => setMenu({ open: true, at: pathname });
  const closeMenu = () => setMenu({ open: false, at: pathname });
  const toggleMenu = () =>
    menuOpen ? closeMenu() : openMenu();

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href) =>
    clsx(
      'text-sm transition-colors',
      isActive(href)
        ? 'font-medium text-neutral-900'
        : 'text-neutral-600 hover:text-neutral-900'
    );

  const mobileLinkClass = (href) =>
    clsx(
      'block rounded-lg px-3 py-2.5 text-base transition-colors',
      isActive(href)
        ? 'bg-neutral-100 font-medium text-neutral-900'
        : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900'
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center">
          <Logo variant="light" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Main">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClass(href)}>
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-neutral-100 hover:text-neutral-900 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-neutral-200 px-4 py-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={mobileLinkClass(href)}
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export const BlogHeader = SiteHeader;
