import { BaseImage } from "./BaseImage";

export const Image = ({ alt, src }) => {
  return <BaseImage alt={alt || src} src={src} />;
};
