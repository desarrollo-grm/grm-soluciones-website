import { getFormattedPosts } from '@/src/data/posts';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve';
  const now = new Date();
  const staticRoutes = [
    '',
    '/about-us',
    '/contact',
    '/facturacion-digital',
    '/equipos-maquinas-fiscales',
    '/condominio',
    '/saint-e-integraciones',
    '/soporte',
    '/blog',
  ];
  const posts = await getFormattedPosts(0, 1000);

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '/blog' ? 'daily' : 'monthly',
      priority: route === '' ? 1 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
      changeFrequency: 'weekly',
      priority: 0.6,
    })),
  ];
}
