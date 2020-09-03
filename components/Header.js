import Link from "next/link";

const Header = ({ onMenuClick, onMenuClose }) => (
  <nav className="flex sticky top-0  bg-white w-full p-5 max-w-full justify-center border-b border-gray-light mb-4 z-40 shadow-base">
    <div className="flex w-full sm:max-w-screen-lg items-center justify-between flex-wrap">
      <div className="flex items-center flex-shrink-0 text-black mr-6">
        <Link href="/">
          <a
            className="font-light text-xl tracking-tight uppercase"
            onClick={onMenuClose}
          >
            Nico<span className="font-bold">Torres</span>
          </a>
        </Link>
      </div>
      <div className="flex lg:hidden">
        <button
          onClick={onMenuClick}
          className="flex items-center px-3 py-2 border rounded text-grey border-gray-600 hover:text-black hover:border-black"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="hidden flex-grow lg:flex items-center w-auto ">
        <div className="text-sm flex flex-grow justify-end">
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-grey hover:text-black mr-4"
          >
            Docs
          </a>
          <a
            href="#responsive-header"
            className="block mt-4 lg:inline-block lg:mt-0 text-grey hover:text-black mr-4"
          >
            Examples
          </a>
          <Link href="/blog">
            <a className="block mt-4 lg:inline-block lg:mt-0 text-grey hover:text-black">
              Blog
            </a>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

export default Header;
