const SectionHeader = ({
    title,
    subtitle,
    titleColor = "secondary",
    alignment = "center",
    margin = "normal",
    headingLevel = 2,
}) => {
    const colorClasses = titleColor === "secondary" ? "text-secondary" : titleColor === "primary" ? "text-primary" : titleColor === "accent" ? "text-accent" : "text-secondary";
    const alignmentClasses = alignment === "center" ? "text-center" : alignment === "left" ? "text-left" : "text-right";
    const marginClasses = margin === "small" ? "mt-2 mb-8" : "mb-12";
    const Heading = headingLevel === 1 ? "h1" : "h2";

    return (
        <div className={`${marginClasses} ${alignmentClasses}`}>
            <Heading className={`font-display text-3xl md:text-4xl lg:text-5xl font-bold ${colorClasses} mb-2`}>
                {title}
            </Heading>
            {subtitle && (
                <p className="font-display font-semibold text-lg md:text-2xl lg:text-3xl text-dark">
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
