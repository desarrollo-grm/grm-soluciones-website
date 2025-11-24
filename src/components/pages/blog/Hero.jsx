import SectionHeader from '/src/components/commons/SectionHeader';
import PostCard from '/src/components/commons/PostCard';
import { getFormattedPosts } from '/src/data/posts';

const Hero = () => {
    // Get the first post as featured
    const featuredPost = getFormattedPosts()[0];

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
                        <PostCard 
                            post={featuredPost}
                            featured={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;