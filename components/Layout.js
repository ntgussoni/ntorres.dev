/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import Head from 'next/head';
import Link from 'next/link';
import Logo from './Logo';

const Layout = ({ children, showGradient = true }) => (
  <div
    className={clsx(
      'text-white flex flex-col items-center justify-center min-h-screen',
      showGradient &&
        'bg-[#4F4F4F] bg-gradient-to-b from-[#333333,28.89%] to-[rgba(79, 79, 79, 0.81),96.17%]'
    )}
  >
    <Head>
      <title>ntorres.dev</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="flex flex-col w-full flex-1 items-center">
      <div
        className={clsx(
          'flex h-[66px] items-center w-full flex-wrap justify-center ',
          !showGradient &&
            'bg-[#4F4F4F] bg-gradient-to-b from-[#333333,28.89%] to-[rgba(79, 79, 79, 0.81),96.17%] sticky top-0  z-10'
        )}
      >
        <div className="max-w-[1024px] px-4 md:px-20 flex items-center w-full py-2 ">
          <Link href="/" passHref>
            <a className="flex flex-1 ">
              <Logo />
            </a>
          </Link>
          <Link href="/contact-me" passHref>
            <a className="overflow-hidden children-spin flex p-[1px] relative rounded-lg shadow-boxes justify-center items-center">
              <span className="z-0 bg-gradient-radial-hot absolute w-[110%] h-[450%]" />
              <span className="z-10 flex uppercase font-bold bg-[#272727] text-xs px-3 py-3 rounded-lg">
                Call me, maybe
              </span>
            </a>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1024px] px-4 md:px-20 pt-10 mb-10">
        {children}
      </div>
      <footer className="p-8">
        <div className="flex flex-row justify-center items-center grayscale opacity-20">
          <div className="relative w-[32px] h-[31px]">
            <div className="w-[27px] h-[27px] box-border absolute border border-white rounded-[8px] left-0 top-0 bottom-[12.9%] right-[88.84%]" />
            <div className="w-[27px] h-[27px] box-border absolute bg-primary-blue border border-primary-blue shadow-[0px,0px,6px,#2D9CDB] rounded-[8px] left-[12.9%] top-[12.9%]" />
          </div>
          <span
            className={clsx(
              'font-bold ml-2 text-xl',
              !showGradient && 'text-black'
            )}
          >
            NICOTORRES
          </span>
        </div>
      </footer>
    </main>
  </div>
);

export default Layout;
