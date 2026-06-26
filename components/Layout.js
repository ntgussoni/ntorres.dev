import clsx from 'clsx';
import Head from 'next/head';
import Logo from './Logo';
import { SiteHeader } from './SiteHeader';

const Layout = ({ children, title, wide = false }) => (
  <div className="min-h-screen bg-white font-[Inter,system-ui,sans-serif] text-neutral-900">
    <Head>
      <title>
        {title ? `${title} — Nicolás Torres` : 'Nicolás Torres'}
      </title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SiteHeader />
    <main
      className={clsx(
        'mx-auto w-full px-6 py-10 md:py-14',
        wide ? 'max-w-6xl' : 'max-w-5xl'
      )}
    >
      {children}
    </main>
    <footer className="border-t border-neutral-200 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 text-sm text-neutral-500">
        <Logo variant="light" compact />
        <p>© {new Date().getFullYear()} Nicolás Torres</p>
      </div>
    </footer>
  </div>
);

export default Layout;
