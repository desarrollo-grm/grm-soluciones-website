import { notFound } from 'next/navigation';
import PostCard from '@/src/components/commons/PostCard';
import PortableTextRenderer from '@/src/components/commons/PortableTextRenderer';
import BlogPostSidebar from '@/src/components/pages/blog/BlogPostSidebar';
import { getFormattedPosts, getPost, getRelatedPosts } from '@/src/data/posts';

export const revalidate = 300;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getFormattedPosts(0, 1000);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
      publishedTime: post.date,
      tags: post.categories,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(post.id, post.categories, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://grm.net.ve';
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image ? [post.image] : undefined,
    datePublished: post.date,
    mainEntityOfPage: articleUrl,
    author: { '@type': 'Organization', name: 'GRM Soluciones' },
    publisher: { '@type': 'Organization', name: 'GRM Soluciones', url: siteUrl },
  };

  return (
    <main className="bg-light py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_350px] lg:gap-12">
          <article className="max-w-4xl">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">{post.title}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories.map((tag) => <span key={tag} className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-white">{tag}</span>)}
            </div>
            <div className="text-dark/60 mb-8">Publicado el {post.date} · Lectura de {post.readtime} minutos</div>
            <img src={post.image} alt={post.title} className="mb-8 w-full rounded-2xl object-cover" />
            <div className="space-y-4"><PortableTextRenderer content={post.content} /></div>
            <div className="my-12 rounded-2xl bg-white p-8 text-center shadow-lg">
              <h2 className="font-display text-2xl font-bold text-dark mb-4">{post.ctaTitle}</h2>
              <p className="mb-6 text-dark/80">{post.ctaSubtitle}</p>
              <a className="inline-block rounded-2xl bg-secondary px-8 py-3 font-semibold text-white" href="/contact">{post.ctaButton}</a>
            </div>
          </article>
          <aside className="self-start lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
            <BlogPostSidebar />
          </aside>
        </div>
      </div>
      {relatedPosts.length ? (
        <section className="container mx-auto max-w-6xl px-6">
          <h2 className="font-display text-3xl font-bold text-dark mb-8">También te puede interesar</h2>
          <div className="grid gap-8 md:grid-cols-3">{relatedPosts.map((related) => <PostCard key={related.id} post={related} />)}</div>
        </section>
      ) : null}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
