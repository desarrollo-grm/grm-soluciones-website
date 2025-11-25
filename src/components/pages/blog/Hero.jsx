import { useState, useEffect } from 'react';
import SectionHeader from '/src/components/commons/SectionHeader';
import PostCard from '/src/components/commons/PostCard';
import { getFormattedPosts } from '/src/data/posts';

const Hero = () => {
    const [featuredPost, setFeaturedPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedPost = async () => {
            setLoading(true);
            try {
                const posts = await getFormattedPosts(0, 1);
                setFeaturedPost(posts[0]);
            } catch (error) {
                console.error('Error fetching featured post:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPost();
    }, []);

    return (
        <section className="bg-light pb-16 pt-8 md:pb-20 md:pt-10">
            <div className="container mx-auto px-4">
                <SectionHeader 
                    title="Nuestro blog"
                    titleColor="secondary"
                    subtitle="Noticias y consejos de expertos para optimizar tu negocio"
                    alignment="center"
                />

                <div className="mt-12 lg:mx-24">
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-dark mb-6">
                        Creemos que te podría interesar
                    </h3>
                    <div className="lg:h-[400px]">
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="bg-gray-200 h-64 lg:h-[400px] rounded-2xl"></div>
                            </div>
                        ) : featuredPost ? (
                            <PostCard 
                                post={featuredPost}
                                featured={true}
                            />
                        ) : (
                            <p className="text-dark/60 text-center">No hay posts disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;