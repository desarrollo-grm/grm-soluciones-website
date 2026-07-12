import { useState, useEffect } from 'react';
import UnderlinedTitle from "/src/components/commons/UnderlinedTitle";
import PostCard from "/src/components/commons/PostCard";
import { getPostsForHome } from '/src/data/posts';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const posts = await getPostsForHome(4);
                setArticles(posts);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return null;
    }

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