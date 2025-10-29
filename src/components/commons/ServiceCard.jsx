const ServiceCard = ({ service, isSquare, isFill, onMouseEnter, onMouseLeave }) => {

    const colorClasses = (isFill) ? 'bg-primary' : 'bg-secondary'


    const textcontainer = (isSquare) ? "" : (isFill) ?
        <div className="transition-opacity duration-300">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-sm opacity-90">
                {service.bullets.map((bullet, index) => (
                    <span key={index}>
                        {bullet}
                        {index < service.bullets.length - 1 && <br />}
                    </span>
                ))}
            </p>
        </div>
        :
        <div className="transition-opacity duration-700">
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-sm opacity-90">{service.description}</p>
        </div>;

    const cardWidth = isSquare ? "w-auto aspect-square" : isFill ? "grow min-w-[50%] md:min-w-[60%] lg:min-w-[50%]" : "w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"

    return (
        <div
            className={`
                rounded-xl p-8 shadow-lg flex flex-col items-center justify-center
                ${cardWidth}
                h-[160px]
                ${colorClasses} text-white`
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className={`flex justify-center items-center gap-4 w-full`}>
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                    {service.icon}
                </div>
                {textcontainer}
            </div>
        </div>
    );
}

export default ServiceCard;
