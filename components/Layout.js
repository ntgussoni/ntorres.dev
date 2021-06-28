import Head from 'next/head';
import Logo from './Logo';
import Link from 'next/link';
const Layout = ({ children }) => (
  <div className="text-white flex flex-col items-center justify-center min-h-screen bg-[#4F4F4F] bg-gradient-to-b from-[#333333,28.89%] to-[rgba(79, 79, 79, 0.81),96.17%]">
    <Head>
      <title>Ntorres.dev</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col w-full max-w-[1440px] flex-1 px-4 md:px-20">
      <div className="flex items-center w-full pt-2 pb-8 mb-8 flex-wrap gap-4 justify-center">
        <Link href="/" passHref>
          <a className="flex flex-1 justify-center md:justify-start mb-8 md:mb-0">
            <Logo />
          </a>
        </Link>
        <Link href="/contact-me" passHref>
          <a className="overflow-hidden children-spin flex p-[1px] relative rounded-lg shadow-boxes justify-center items-center">
            <span className="z-0 bg-gradient-radial absolute w-[110%] h-[450%]" />
            <span className="z-10 flex uppercase font-bold bg-[#272727] px-3 py-3 rounded-lg">
              Call me, maybe
            </span>
          </a>
        </Link>
      </div>
      {children}
    </main>
  </div>
);

export default Layout;
