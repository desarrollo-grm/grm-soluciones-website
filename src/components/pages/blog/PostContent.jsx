import { useParams } from 'react-router-dom';
import { posts, getRelatedPosts } from '/src/data/posts';
import PostCard from '/src/components/commons/PostCard';
import CTAButton from '/src/components/commons/CTAButton';

const PostContent = () => {
    const { slug } = useParams();
    
    // Find the post by slug
    const post = posts.find(p => p.slug === slug);
    
    if (!post) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="font-display text-3xl font-bold text-dark mb-4">
                    Post no encontrado
                </h2>
                <p className="text-dark/80 mb-8">
                    El artículo que buscas no existe o ha sido eliminado.
                </p>
                <CTAButton to="/blog" variant="secondary">
                    Volver al blog
                </CTAButton>
            </div>
        );
    }

    const formattedDate = new Date(post.publishedAt).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    // Get related posts (same tags, excluding current post)
    const relatedPosts = getRelatedPosts(post.id, post.tags, 3);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
                    {post.title}
                </h1>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag, index) => (
                        <span 
                            key={index}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                                index === 0 
                                    ? 'bg-primary text-white' 
                                    : 'bg-accent text-white'
                            }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-dark/60 mb-8">
                    <span>Publicado el {formattedDate}</span>
                    <span className="w-1 h-1 bg-dark/60 rounded-full"></span>
                    <span>Lectura de {post.readTime} minutos</span>
                </div>

                {/* Featured Image */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-8">
                    <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div 
                className="prose prose-lg max-w-none
                    prose-headings:font-display prose-headings:font-bold prose-headings:text-dark
                    prose-p:text-dark/80 prose-p:text-lg prose-p:leading-relaxed
                    prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-dark prose-strong:font-bold
                    prose-ul:text-dark/80 prose-ol:text-dark/80
                    prose-img:rounded-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* CTA Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg md:p-10 text-center my-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4">
                    Prueba el condominio Sagúes
                </h3>
                <p className="text-dark/80 mb-6 max-w-2xl mx-auto">
                    Optimiza la gestión de tu condominio con nuestra plataforma integral
                </p>
                <CTAButton to="/contacto" variant="secondary">
                    Solicita una demo
                </CTAButton>
            </div>

            {/* Share Section */}
            <div className="border-t border-gray-200 pt-8">
                <h4 className="font-display text-lg font-semibold text-dark mb-4">
                    Comparte este artículo
                </h4>
                <div className="flex gap-4">
                    <a 
                        href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${post.title}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en X"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                    </a>
                    <a 
                        href={`https://www.instagram.com/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en Instagram"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                    </a>
                    <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en LinkedIn"
                    >
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <div className="border-t border-gray-200 pt-12">
                    <h3 className="font-display text-2xl font-bold text-dark mb-6">
                        También te puede interesar
                    </h3>
                    <div className="grid grid-cols-3 gap-6">
                        {relatedPosts.map(relatedPost => (
                            <PostCard 
                                key={relatedPost.id}
                                post={relatedPost}
                                compact={true}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostContent;
