const siteName = 'GRM Soluciones';
const defaultImage = '/assets/images/partners.webp';

export function createPageMetadata({
  title,
  description,
  path,
  image = defaultImage,
  type = 'website',
  publishedTime,
  tags,
}) {
  const fullTitle = `${title} | ${siteName}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type,
      locale: 'es_VE',
      siteName,
      title: fullTitle,
      description,
      url: path,
      images: [
        {
          url: image,
          alt: `${title} - ${siteName}`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(tags?.length ? { tags } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
