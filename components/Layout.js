import clsx from 'clsx';
import Head from 'next/head';
import Logo from './Logo';
import { SiteHeader } from './SiteHeader';

const Layout = ({ children, title, wide = false }) => (
  <div className="min-h-screen overflow-x-hidden bg-white font-[Inter,system-ui,sans-serif] text-neutral-900">
    <Head>
      <title>
        {title ? `${title} — Nicolás Torres` : 'Nicolás Torres'}
      </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SiteHeader />
    <main
      className={clsx(
        'mx-auto w-full px-4 py-8 sm:px-6 sm:py-10 md:py-14',
        wide ? 'max-w-6xl' : 'max-w-5xl'
      )}
    >
      {children}
    </main>
    <footer className="border-t border-neutral-200 py-8 sm:py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-sm text-neutral-500 sm:px-6">
        <Logo variant="light" compact />
        <p>© {new Date().getFullYear()} Nicolás Torres</p>
      </div>
    </footer>
  </div>
);

export default Layout;
