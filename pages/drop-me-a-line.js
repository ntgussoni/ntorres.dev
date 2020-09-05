import Head from "next/head";
import ContactForm from "../components/ContactForm";

const DropMeALine = () => {
  return (
    <>
      <Head>
        <title>Drop me a line - Nicolás Torres</title>
      </Head>
      <div className="flex flex-col w-full sm:align-middle sm:justify-center p-4 mt-8">
        <h1 className="font-bold mb-1 text-3xl">Something to say?</h1>
        <p className="text-xl mb-1">Drop me a line, I'd love to talk to you</p>
        <ContactForm />
      </div>
    </>
  );
};

export default DropMeALine;
