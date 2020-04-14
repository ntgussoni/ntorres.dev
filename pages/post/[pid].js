import posts from "../../posts";
import Card from "../../components/Card";

const Post = ({ post }) => {
  return <Card post={post} forceBig />;
};

export async function getStaticProps({ params }) {
  return {
    props: { post: posts.find((p) => p.id == params.pid) }, // will be passed to the page component as props
  };
}

export async function getStaticPaths() {
  return {
    paths: posts.map((p) => {
      return { params: { pid: `${p.id}` } };
    }),
    fallback: false,
  };
}

export default Post;
