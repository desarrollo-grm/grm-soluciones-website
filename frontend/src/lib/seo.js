import { getServices } from '@/src/data/services';

const siteName = 'GRM Soluciones';
const defaultImage = '/assets/images/partners.webp';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve';

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

export function createOrganizationJsonLd() {
  const services = getServices();

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/#organization`,
    name: siteName,
    description: 'Soluciones tecnológicas para empresas y condominios.',
    url: siteUrl,
    logo: `${siteUrl}/assets/logo-grm.svg`,
    image: `${siteUrl}/assets/images/partners.webp`,
    telephone: '+58-212-959-7141',
    email: `${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}`,
    areaServed: 'Venezuela',
    sameAs: [
      'https://www.linkedin.com',
      'https://www.instagram.com',
      'https://x.com',
      'https://wa.me/584242139974',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'CCCT, Torre A, Piso 8, Ofícina 805',
      addressLocality: 'Caracas',
      addressRegion: 'Miranda',
      postalCode: '1060',
      addressCountry: 'VE',
    },
    location: {
      '@type': 'Place',
      name: 'CCCT, Caracas, Venezuela',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'CCCT, Torre A, Piso 8, Ofícina 805',
        addressLocality: 'Caracas',
        addressRegion: 'Miranda',
        postalCode: '1060',
        addressCountry: 'VE',
      },
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+58-212-959-7141',
        email: 'contacto@grmsoluciones.com',
        areaServed: 'VE',
        availableLanguage: ['Spanish'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        telephone: '+58-424-213-9974',
        email: 'contacto@grmsoluciones.com',
        areaServed: 'VE',
        availableLanguage: ['Spanish'],
      },
    ],
    knowsAbout: services.map((service) => service.title),
  };
}
