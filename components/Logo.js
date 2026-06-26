import clsx from 'clsx';

const Logo = ({ variant = 'dark', compact = false }) => (
  <div className="flex flex-row items-center">
    <div className="relative h-[31px] w-[32px]">
      <div
        className={clsx(
          'absolute left-0 top-0 box-border h-[27px] w-[27px] rounded-[8px] border',
          variant === 'light' ? 'border-neutral-900' : 'border-white'
        )}
      />
      <div
        className={clsx(
          'absolute left-[12.9%] top-[12.9%] box-border h-[27px] w-[27px] rounded-[8px] border',
          variant === 'light'
            ? 'border-neutral-900 bg-neutral-900'
            : 'border-primary-blue bg-primary-blue shadow-[0px,0px,6px,#2D9CDB]'
        )}
      />
    </div>
    {!compact && (
      <span
        className={clsx(
          'ml-2 text-xl font-bold tracking-tight',
          variant === 'light' ? 'text-neutral-900' : 'text-white'
        )}
      >
        NICOTORRES
      </span>
    )}
  </div>
);

export default Logo;
