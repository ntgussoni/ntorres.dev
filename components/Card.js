import { BaseImage } from "./BaseImage";
import { DateComponent } from "./DateComponent";
import { Categories } from "./Categories";

const Card = ({ post: { metadata }, forceBig = false }) => (
  <div className={`relative w-full ${forceBig ? "pb-2/3" : ""} mb-4 md:pb-2/3`}>
    <BaseImage
      alt={metadata.title}
      className={`${
        forceBig ? "" : "hidden "
      } md:flex absolute top-0 h-full w-full object-cover z-0`}
      src={metadata.image}
    />
    <div
      className={`${
        forceBig ? "" : "hidden "
      } md:flex absolute w-full h-full left-0 top-0 bg-gray-900 opacity-75 z-10 bg-gradient-to-b from-primary to-black`}
    ></div>

    <div
      className={`${
        forceBig ? "absolute text-white" : "relative"
      } bottom-0 w-full flex flex-col md:absolute md:text-white  z-20 p-4`}
    >
      <div className="font-bold tracking-wide mb-4 text-2xl md:text-4xl">
        {metadata.title}
      </div>
      <div className="flex flex-row align-middle mb-1">
        <DateComponent
          className="flex text-xs items-center mr-2"
          date={metadata.date}
        />
        {metadata.categories && <Categories categories={metadata.categories} />}
      </div>
      <div className="text-xs md:text-sm">{metadata.description}</div>
    </div>
  </div>
);

export default Card;
