import Head from 'next/head';
import {
  SITE_NAME,
  absoluteUrl,
  getDefaultOgImage,
  siteDefaults,
} from '../lib/site';

export default function Seo({
  title,
  description = siteDefaults.description,
  image,
  path = '/',
  type = 'website',
  publishedTime,
}) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const url = absoluteUrl(path);
  const ogImage = image || getDefaultOgImage();

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={siteDefaults.twitterHandle} />
      <meta name="twitter:creator" content={siteDefaults.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
