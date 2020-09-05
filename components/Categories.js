import { Category } from "./Category";
export const Categories = ({ categories }) => {
  return (
    <div className="flex flex-row">
      {categories.map((i) => (
        <Category id={i} className={"mr-2"} />
      ))}
    </div>
  );
};