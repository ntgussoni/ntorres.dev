import { useState } from "react";

const Button = ({ children, width, height, onClick }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e) => {
    setLoading(true);
    await onClick(e);
    setLoading(false);
  };
  return (
    <div
      style={{ minWidth: width, minHeight: height }}
      onClick={handleClick}
      className={`${
        loading ? "highlight-animation" : ""
      } mr-4 px-2 py-2 border text-center border-gray-600 rounded-md hover:bg-primary-lighter hover:text-white hover:border-transparent transition-colors duration-300 ease-in-out"`}
    >
      {loading ? "Sending" : children}
    </div>
  );
};

export default Button;
