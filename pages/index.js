import { BaseImage } from "../components/BaseImage";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Nicolás Torres - Fullstack dev & more</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col w-full sm:align-middle sm:justify-center p-4">
        <h1 className="font-bold mb-1 text-6xl">Welcome!</h1>
        <p className="text-2xl mb-1">
          <b>I'm Nicolás Torres</b> and I've been a fullstack dev, and product
          manager since 2009. I love building stuff, with or without code in it.
        </p>
        <div className="w-1/2 my-0 mx-auto mt-10">
          <div className="h-0 w-full pb-full relative">
            <BaseImage
              className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-white object-cover "
              src={"avatar.jpg"}
              alt="Nicolás Torres"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
