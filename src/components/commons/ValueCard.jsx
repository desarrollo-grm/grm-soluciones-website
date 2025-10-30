const ValueCard = ({ icon, title, color = "secondary" }) => {
    const bgColorClasses = color === "secondary" ? "bg-secondary" : color === "primary" ? "bg-primary" : color === "accent" ? "bg-accent" : "bg-secondary";

    return (
        <article className={`${bgColorClasses} text-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center justify-center gap-4 min-h-[180px]`}>
            <div className="w-20 h-20 flex items-center justify-center">
                <div 
                    className="w-16 h-16 bg-white"
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
            <h3 className="font-display text-xl font-bold text-white text-center">
                {title}
            </h3>
        </article>
    );
};

export default ValueCard;
