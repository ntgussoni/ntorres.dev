import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';
import Logo from './Logo';

export const SiteHeader = () => {
  const { pathname } = useRouter();

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <Logo variant="light" />
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/blog" className={linkClass('/blog')}>
            Blog
          </Link>
          <Link href="/about-me" className={linkClass('/about-me')}>
            About
          </Link>
          <Link href="/contact-me" className={linkClass('/contact-me')}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export const BlogHeader = SiteHeader;
