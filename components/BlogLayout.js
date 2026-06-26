import Layout from './Layout';

const BlogLayout = ({ children, title = 'Blog' }) => (
  <Layout title={title === 'Blog' ? 'Blog' : title}>{children}</Layout>
);

export default BlogLayout;
