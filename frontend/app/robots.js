export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const allowIndexing = process.env.ALLOW_INDEXING === 'true';

  if (!allowIndexing) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/newsletter/unsubscribe', '/newsletter/unsubscribed-success', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
