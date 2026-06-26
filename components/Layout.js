import clsx from 'clsx';
import Logo from './Logo';
import { SiteHeader } from './SiteHeader';
import Seo from './Seo';

const Layout = ({
  children,
  title,
  description,
  image,
  path = '/',
  type = 'website',
  publishedTime,
  wide = false,
}) => (
  <div className="min-h-screen overflow-x-hidden bg-white font-[Inter,system-ui,sans-serif] text-neutral-900">
    <Seo
      title={title}
      description={description}
      image={image}
      path={path}
      type={type}
      publishedTime={publishedTime}
    />
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
