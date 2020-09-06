import { useState } from "react";

const Button = ({
  text,
  loading = false,
  loadingText,
  width,
  height,
  onClick,
  ...rest
}) => {
  return (
    <div
      style={{ minWidth: width, minHeight: height }}
      onClick={() => !loading && onClick()}
      className={`${
        loading ? "highlight-animation" : ""
      } button cursor-pointer mr-0 md:mr-4 px-2 py-2 border text-center border-gray-600 rounded-md hover:bg-primary-lighter hover:text-white hover:border-transparent transition-colors duration-300 ease-in-out`}
      {...rest}
    >
      {loading ? loadingText : text}
    </div>
  );
};

export default Button;
