import { useState } from "react";

const Button = ({ text, loadingText, width, height, onClick }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    setLoading(true);
    await onClick(e);
    setLoading(false);
  };
  return (
    <div
      style={{ minWidth: width, minHeight: height }}
      onClick={() => !loading && handleClick()}
      className={`${
        loading ? "highlight-animation" : ""
      } cursor-pointer mr-4 md:mr-0 px-2 py-2 border text-center border-gray-600 rounded-md hover:bg-primary-lighter hover:text-white hover:border-transparent transition-colors duration-300 ease-in-out`}
    >
      {loading ? loadingText : text}
    </div>
  );
};

export default Button;
