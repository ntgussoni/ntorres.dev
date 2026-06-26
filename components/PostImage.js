import Image from 'next/image';

const imageContext = require.context('../posts', true, /^(?!.*\.(mdx)$).*/);

export const PostImage = ({
  src,
  folderName,
  fill = false,
  className = '',
  alt = '',
  ...rest
}) => {
  const imageSrc = imageContext(`./${folderName}/${src}`);

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={`object-contain ${className}`.trim()}
        sizes="(max-width: 768px) 100vw, 33vw"
        {...rest}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={800}
      height={600}
      className={`h-auto w-full ${className}`.trim()}
      sizes="(max-width: 768px) 100vw, 800px"
      {...rest}
    />
  );
};
