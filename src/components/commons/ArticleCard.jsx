const ArticleCard = ({ image, title, description, link, color = "primary" }) => {
    const colorClasses = color === "secondary" ? "border-secondary" : color === "accent" ? "border-accent" : "border-primary";
    const textColorClasses = color === "secondary" ? "text-secondary" : color === "accent" ? "text-accent" : "text-primary";

    return (
        <article className={`bg-white rounded-xl border-2 ${colorClasses} shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full`}>
            <div className="aspect-video w-full overflow-hidden p-2">
                <img 
                    src={image} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-300 rounded-t"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold mb-3 text-dark">
                    {title}
                </h3>
                <p className="text-dark font-sans text-sm mb-4 flex-grow">
                    {description}
                </p>
                <a 
                    href={link} 
                    className={`${textColorClasses} font-sans font-semibold text-sm hover:underline inline-flex items-center gap-2`}
                >
                    Leer Artículo
                    <span aria-hidden="true">→</span>
                </a>
            </div>
        </article>
    );
};

export default ArticleCard;
