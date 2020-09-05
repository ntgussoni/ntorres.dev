export const Category = ({ id, className }) => {
  const { slug, name, className: style } = {
    technology: {
      slug: "technology",
      name: "Technology",
      className: "bg-primary-lighter text-white",
    },
    random: {
      slug: "random",
      name: "Random",
      className: "bg-primary-lighter text-white",
    },
    hydroponics: {
      slug: "hydroponics",
      name: "Hydroponics",
      className: "bg-primary-lighter text-white",
    },
  }[id];

  return (
    <span
      className={`${className} ${style} px-1 py-1 text-xs border-transparent rounded-md`}
    >
      {name}
    </span>
  );
};
