import clsx from 'clsx';

const Button = ({
  text,
  loading = false,
  loadingText,
  width,
  height,
  onClick,
  hot = true,
  ...rest
}) => (
  <button
    type="button"
    className="overflow-hidden children-spin flex p-[1px] relative rounded-lg shadow-boxes justify-center items-center"
    onClick={() => !loading && onClick()}
    {...rest}
  >
    <span
      className={clsx(
        'z-0 absolute w-[110%] h-[450%]',
        hot ? 'bg-gradient-radial-hot' : 'bg-gradient-radial-cool'
      )}
    />
    <span className="z-10 flex uppercase bg-[#272727] px-3 py-3 rounded-lg text-xs ">
      {loading ? loadingText : text}
    </span>
  </button>
);

export default Button;
