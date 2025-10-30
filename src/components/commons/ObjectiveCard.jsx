const ObjectiveCard = ({ icon, title, description, color = "accent" }) => {
    const bgColorClasses = color === "secondary" ? "bg-secondary" : color === "primary" ? "bg-primary" : color === "accent" ? "bg-accent" : "bg-accent";

    return (
        <article className="flex flex-col items-center text-center gap-4 max-w-md">
            <div className={`w-32 h-32 ${bgColorClasses} rounded-full flex items-center justify-center shadow-lg`}>
                <div 
                    className="w-20 h-20 bg-white"
                    style={{
                        maskImage: `url(${icon})`,
                        WebkitMaskImage: `url(${icon})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                    }}
                    role="img"
                    aria-label={title}
                />
            </div>
            <h3 className="font-display text-2xl font-bold text-dark">
                {title}
            </h3>
            <p className="font-sans text-base text-dark leading-relaxed">
                {description}
            </p>
        </article>
    );
};

export default ObjectiveCard;
