const BenefitCard = ({ icon, title, description, iconColor = "primary" }) => {
    const colorClass = iconColor === "primary" ? "bg-primary" : 
                       iconColor === "secondary" ? "bg-secondary" : 
                       iconColor === "accent" ? "bg-accent" : 
                       "bg-primary";

    return (
        <article className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex items-center justify-center gap-6 max-w-md">
            {/* Icon */}
            <div 
                className={`w-12 h-12 flex-shrink-0 ${colorClass}`}
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
            <div className="flex flex-col gap-4 mb-3">
                {/* Title */}
                <h3 className="font-display text-xl font-bold text-gray-900">
                    {title}
                </h3>
                {/* Description */}
                <p className="font-sans text-gray-600 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </article>
    );
};

export default BenefitCard;
