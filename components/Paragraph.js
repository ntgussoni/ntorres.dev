export const Paragraph = ({ children }) => {
  if (
    children &&
    children[0] &&
    children.length === 1 &&
    children[0].props &&
    children[0].props.src
  ) {
    // rendering media without p wrapper
    return children;
  }

  return <div className="tracking-wider my-6">{children}</div>;
};
