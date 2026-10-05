import UnderlinedTitle from "@/src/components/commons/UnderlinedTitle";
import PostCard from "@/src/components/commons/PostCard";
import { getPostsForHome } from '@/src/data/posts';

const Articles = async () => {
    const articles = await getPostsForHome(4);

    return (
        <section className="bg-light py-16 px-4 min-h-[calc(100dvh-88px)]">
            <div className="container mx-auto">
                <UnderlinedTitle color="primary">Nuestros últimos artículos</UnderlinedTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-8">
                    {articles.map((article, index) => (
                        <div
                            key={article.id}
                            className={index === 3 ? 'hidden md:block lg:hidden' : ''}
                        >
                            <PostCard post={article} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Articles;