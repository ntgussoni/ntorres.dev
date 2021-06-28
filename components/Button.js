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
    <button
      className="overflow-hidden children-spin flex p-[1px] relative rounded-lg shadow-boxes justify-center items-center"
      onClick={() => !loading && onClick()}
      {...rest}
    >
      <span className="z-0 bg-gradient-radial absolute w-[110%] h-[450%]" />
      <span className="z-10 flex uppercase  bg-[#272727] px-3 py-3 rounded-lg text-sm ">
        {loading ? loadingText : text}
      </span>
    </button>
  );
};

export default Button;
