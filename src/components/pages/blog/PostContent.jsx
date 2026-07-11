import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost, getRelatedPosts } from '/src/data/posts';
import PostCard from '/src/components/commons/PostCard';
import CTAButton from '/src/components/commons/CTAButton';
import PortableTextRenderer from '/src/components/commons/PortableTextRenderer';
import { FacebookIcon, XIcon, LinkedInIcon, WhatsAppIcon } from '/assets/icons';
const PostContent = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [relatedPosts, setRelatedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            try {
                const fetchedPost = await getPost(slug);
                if (fetchedPost) {
                    setPost(fetchedPost);
                    // Fetch related posts
                    const related = await getRelatedPosts(fetchedPost.id, fetchedPost.categories, 3);
                    setRelatedPosts(related);
                }
            } catch (error) {
                console.error('Error fetching post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                <div className="h-64 bg-gray-200 rounded-2xl"></div>
                <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
            </div>
        );
    }
    
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-6">
                    {post.title}
                </h1>
                
                {/* Categories */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {post.categories.map((tag, index) => (
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
                    <span>Publicado el {post.date}</span>
                    <span className="w-1 h-1 bg-dark/60 rounded-full"></span>
                    <span>Lectura de {post.readtime} minutos</span>
                </div>

                {/* Featured Image */}
                <div className="relative w-full rounded-2xl overflow-hidden mb-8">
                    <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
                <PortableTextRenderer content={post.content} />
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-2xl p-8 shadow-lg md:p-10 text-center my-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-4">
                    {post.ctaTitle}
                </h3>
                <p className="text-dark/80 mb-6 max-w-2xl mx-auto">
                    {post.ctaSubtitle}
                </p>
                <CTAButton to="/contact" variant="secondary">
                    {post.ctaButton}
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
                        <XIcon className="w-5 h-5 text-white" />
                    </a>
                    <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en Facebook"
                    >
                        <FacebookIcon className="w-5 h-5 text-white" />
                    </a>
                    <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en LinkedIn"
                    >
                        <LinkedInIcon className="w-5 h-5 text-white" />
                    </a>
                    <a 
                        href={`https://wa.me/?text=${encodeURIComponent(post.title + ' - ' + window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Compartir en WhatsApp"
                    >
                        <WhatsAppIcon className="w-5 h-5 text-white" />
                    </a>
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert('¡Enlace copiado al portapapeles!');
                        }}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-primary hover:bg-secondary transition-colors"
                        aria-label="Copiar enlace"
                    >
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                    </button>
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
