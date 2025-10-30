import UnderlinedTitle from "/src/components/commons/UnderlinedTitle";
import ArticleCard from "/src/components/commons/ArticleCard";

const Articles = ({articles}) => {
    const colors = ["secondary", "accent"];

    return (
        <section className="bg-light py-16 px-4 min-h-[calc(100dvh-88px)]">
            <div className="container mx-auto">
                <UnderlinedTitle color="primary">Nuestros últimos artículos</UnderlinedTitle>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-8">
                    {articles.map((article, index) => (
                        <ArticleCard
                            key={article.id}
                            image={article.image}
                            title={article.title}
                            description={article.description}
                            link={article.link}
                            color={colors[index % colors.length]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Articles;