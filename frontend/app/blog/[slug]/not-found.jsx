import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="bg-light px-6 py-24 text-center">
      <h1 className="font-display text-4xl font-bold text-dark">Post no encontrado</h1>
      <p className="mt-4 text-dark/80">El artículo que buscas no existe o fue eliminado.</p>
      <Link className="mt-8 inline-block rounded-2xl bg-secondary px-8 py-3 font-semibold text-white" href="/blog">Volver al blog</Link>
    </main>
  );
}
