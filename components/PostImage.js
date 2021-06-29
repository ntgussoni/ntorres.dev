import React from 'react';
import Image from 'next/image';

const imageContext = require.context('../posts', true, /^(?!.*\.(mdx)$).*/);

export const PostImage = ({ src, folderName, ...rest }) => (
  <Image
    layout="responsive"
    src={imageContext(`./${folderName}/${src}`)}
    {...rest}
  />
);
