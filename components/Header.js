/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx';
import Link from 'next/link';
import Logo from './Logo';

export const Header = ({ showGradient }) => (
  <div
    className={clsx(
      'flex h-[66px] items-center w-full flex-wrap justify-center',
      !showGradient &&
        'bg-[#4F4F4F] bg-gradient-to-b from-[#333333,28.89%] to-[rgba(79, 79, 79, 0.81),96.17%] sticky top-0 z-10 border-b-2 border-[#F2994A]'
    )}
  >
    <div className="max-w-[1240px] px-4 md:px-20 flex items-center w-full py-2 ">
      <Link href="/" passHref>
        <a className="flex flex-1 ">
          <Logo />
        </a>
      </Link>
      <Link href="/about-me" passHref>
        <a className="overflow-hidden flex p-[1px] relative justify-center items-center hover:text-green-50 mr-4">
          <span className="z-10 flex uppercase font-bold  text-xs px-3 py-3 rounded-lg">
            About me
          </span>
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
);
