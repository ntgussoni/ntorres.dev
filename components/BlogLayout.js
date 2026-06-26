import Layout from './Layout';

const BlogLayout = ({
  children,
  title = 'Blog',
  description,
  image,
  path = '/blog',
  type = 'website',
  publishedTime,
}) => (
  <Layout
    title={title === 'Blog' ? 'Blog' : title}
    description={description}
    image={image}
    path={path}
    type={type}
    publishedTime={publishedTime}
  >
    {children}
  </Layout>
);

export default BlogLayout;
