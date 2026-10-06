export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve';
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
        disallow: ['/unsubscribe', '/unsubscribed-success', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
