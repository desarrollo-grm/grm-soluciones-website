import Link from 'next/link';
import PostCard from '@/src/components/commons/PostCard';
import SectionHeader from '@/src/components/commons/SectionHeader';
import { getFilteredPaginatedPosts, getFormattedPosts } from '@/src/data/posts';

export const revalidate = 300;

export const metadata = {
  title: 'Blog',
  description: 'Noticias, consejos y tendencias para optimizar tu negocio.',
  alternates: {
    canonical: '/blog',
  },
};

export default async function BlogPage({ searchParams }) {
  const params = await searchParams;
  const search = typeof params?.search === 'string' ? params.search : '';
  const categories = typeof params?.category === 'string' ? [params.category] : [];
  const products = typeof params?.product === 'string' ? [params.product] : [];
  const page = Math.max(1, Number(params?.page) || 1);

  const [featuredPosts, postsData] = await Promise.all([
    getFormattedPosts(0, 1),
    getFilteredPaginatedPosts(search, categories, products, page, 6),
  ]);
  const featuredPost = featuredPosts[0];
  const noIndexFilters = Boolean(search || categories.length || products.length || page > 1);

  return (
    <main className="bg-light">
      <section className="pb-16 pt-8 md:pb-20 md:pt-10">
        <div className="container mx-auto px-4">
          <SectionHeader
            title="Nuestro blog"
            titleColor="secondary"
            subtitle="Noticias y consejos de expertos para optimizar tu negocio"
            alignment="center"
          />
          {featuredPost ? (
            <div className="mt-12 lg:mx-24">
              <h2 className="font-display text-xl font-semibold text-dark mb-6">
                Creemos que te podría interesar
              </h2>
              <PostCard post={featuredPost} featured />
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-light py-12 md:py-16">
        <div className="container mx-auto px-8 xl:px-18">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-8 text-center">
            Más artículos
          </h2>
          {postsData.currentPosts.length ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {postsData.currentPosts.map((post) => <PostCard key={post.id} post={post} />)}
            </div>
          ) : (
            <p className="text-center text-dark/60">No se encontraron artículos.</p>
          )}
          {postsData.totalPages > 1 ? (
            <nav className="mt-10 flex justify-center gap-3" aria-label="Paginación del blog">
              {page > 1 ? <Link className="rounded-lg bg-gray-200 px-4 py-2" href={`/blog?page=${page - 1}`}>Anterior</Link> : null}
              <span className="px-4 py-2">Página {page} de {postsData.totalPages}</span>
              {page < postsData.totalPages ? <Link className="rounded-lg bg-gray-200 px-4 py-2" href={`/blog?page=${page + 1}`}>Siguiente</Link> : null}
            </nav>
          ) : null}
        </div>
      </section>
      {noIndexFilters ? (
        <meta name="robots" content="noindex,follow" />
      ) : null}
    </main>
  );
}
