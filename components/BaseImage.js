import PropTypes from "prop-types";

import { useState, useRef, useEffect } from "react";

const BaseImage = ({ className, alt, src }) => {
  alt = alt || src;
  const [imageLoaded, setImageLoaded] = useState(false);
  const image = useRef();

  const styles = {
    lqip: {
      filter: "blur(10px)",
    },
  };

  useEffect(() => {
    if (image.current.complete) setImageLoaded(true);
  }, []);

  if (imageLoaded) {
    styles.lqip.filter = "none";
  }

  const resizedSrc = require(`../images/${src}`);
  const lqipSrc = require(`../images/${src}?lqip`);
  return (
    <div
      className={`${className}`}
      style={{
        backgroundImage: `url(${lqipSrc.src})`,
        backgroundSize: "contain",
        ...styles.lqip,
      }}
    >
      {/* <img
        className="absolute top-0 left-0 z-10 w-full transition-opacity duration-500 ease-in opacity-100"
        src={require(`../images/${src}?lqip&resize&size=1024`).src}
        alt={alt}
        // style={styles.lqip}
      /> */}
      <img
        className="w-full"
        ref={image}
        src={resizedSrc.src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{ borderRadius: "inherit", objectFit: "inherit" }}
        srcSet={resizedSrc.srcSet}
        width={resizedSrc.width}
        height={resizedSrc.height}
        sizes="(min-width: 0px) 320px, (min-width: 321px) 640px, (min-width: 641px) 960px, (min-width: 1024px) 1024px"
        loading="lazy"
      />
    </div>
  );
};

BaseImage.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
};

export { BaseImage };
