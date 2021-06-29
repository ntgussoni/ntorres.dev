const Logo = () => (
  <div className="flex flex-row justify-center items-center">
    <div className="relative w-[32px] h-[31px]">
      <div className="w-[27px] h-[27px] box-border absolute border border-white rounded-[8px] left-0 top-0 bottom-[12.9%] right-[88.84%]" />
      <div className="w-[27px] h-[27px] box-border absolute bg-primary-blue border border-primary-blue shadow-[0px,0px,6px,#2D9CDB] rounded-[8px] left-[12.9%] top-[12.9%]" />
    </div>
    <span className="hidden md:block font-bold ml-2 text-xl">NICOTORRES</span>
  </div>
);

export default Logo;
