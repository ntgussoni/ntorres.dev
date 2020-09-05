import { BaseImage } from "../components/BaseImage";
import Head from "next/head";

const Work = () => {
  return (
    <>
      <Head>
        <title>Work - Nicolás Torres</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col w-full sm:align-middle sm:justify-center p-4">
        <h1 className="font-bold mb-1 text-6xl">What I've done...</h1>
        <p className="text-2xl mb-1">
          <b>I'm Nicolás Torres</b> and I've been a fullstack dev, and product
          manager since 2009. I love building stuff, with or without code in it.
        </p>
        <div className="flex  flex-row">
          <div className=" w-2/12 my-0 mx-auto mt-10">
            <div className="h-0 w-full pb-full relative">
              <BaseImage
                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white object-cover "
                src={"avatar.jpg"}
                alt="Nicolás Torres"
              />
            </div>
          </div>
          <div className="inline-flex text-grey-dark sm:flex items-center">
            <svg
              className="h-5 w-5 text-grey mr-1"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                className="heroicon-ui"
                d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zm11.31-1.41a7 7 0 1 0-9.9 0L12 19.9l4.95-4.95zM12 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
              ></path>
            </svg>
            Amsterdam, The Netherlands
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
