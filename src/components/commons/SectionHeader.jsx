const SectionHeader = ({ title, subtitle, titleColor = "secondary", alignment = "center" }) => {
    const colorClasses = titleColor === "secondary" ? "text-secondary" : titleColor === "primary" ? "text-primary" : titleColor === "accent" ? "text-accent" : "text-secondary";
    const alignmentClasses = alignment === "center" ? "text-center" : alignment === "left" ? "text-left" : "text-right";

    return (
        <div className={`mb-12 ${alignmentClasses}`}>
            <h2 className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${colorClasses} mb-2`}>
                {title}
            </h2>
            {subtitle && (
                <h3 className="font-display font-semibold text-lg md:text-2xl lg:text-3xl text-dark">
                    {subtitle}
                </h3>
            )}
        </div>
    );
};

export default SectionHeader;
