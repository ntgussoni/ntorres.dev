const Card = ({ post, forceBig = false }) => (
  <div
    className={`relative left-0 w-full ${
      forceBig ? "pb-2/3" : ""
    } md:pb-2/3 mb-2`}
  >
    <img
      className={`${
        forceBig ? "" : "hidden md:flex"
      } absolute top-0 h-full w-full object-cover z-0`}
      src={post.image}
    />
    <div
      className={`${
        forceBig ? "absolute text-white" : "relative"
      } bottom-0 w-full flex flex-col p-1 md:absolute md:text-white  z-10 p-4`}
    >
      <div className="mb-1 font-bold text-base md:text-4xl font-bold tracking-wide mb-4">
        {post.title}
      </div>
      <div className="text-xs">{post.description}</div>
    </div>
  </div>
);

export default Card;
