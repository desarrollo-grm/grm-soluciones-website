export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve';

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
