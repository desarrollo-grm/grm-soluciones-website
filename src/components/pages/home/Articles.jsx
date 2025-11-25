import UnderlinedTitle from "/src/components/commons/UnderlinedTitle";
import PostCard from "/src/components/commons/PostCard";

const Articles = ({articles}) => {
    return (
        <section className="bg-light py-16 px-4 min-h-[calc(100dvh-88px)]">
            <div className="container mx-auto">
                <UnderlinedTitle color="primary">Nuestros últimos artículos</UnderlinedTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-8">
                    {articles.map((article) => (
                        <PostCard
                            key={article.id}
                            post={article}
                        />
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Articles;