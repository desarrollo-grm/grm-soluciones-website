import { Link } from 'react-router-dom';

const ServiceCard = ({ service, featured = false, color }) => {
    // Map color prop to Tailwind classes
    const colorClass = color === 'primary' ? 'bg-primary' : 
                       color === 'secondary' ? 'bg-secondary' : 
                       color === 'accent' ? 'bg-accent' : 
                       'bg-primary';

    if (featured) {
        // Featured card: horizontal layout
        const CardWrapper = service.link ? Link : 'div';
        return (
            <CardWrapper
                to={service.link || undefined}
                aria-label={service.title}
                className={`bg-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 w-full p-8 md:p-10 ${service.link ? 'cursor-pointer' : ''} block`}
            >
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                    {/* Left Column - Icon (20-25% width) */}
                    <div className="flex-shrink-0 w-28 h-28 md:w-32 md:h-32">
                        <div className={`w-full h-full ${colorClass} rounded-full flex items-center justify-center shadow-md`}>
                            <div 
                                className="w-16 h-16 md:w-20 md:h-20 bg-white"
                                style={{
                                    maskImage: `url(${service.icon})`,
                                    WebkitMaskImage: `url(${service.icon})`,
                                    maskSize: 'contain',
                                    maskRepeat: 'no-repeat',
                                    maskPosition: 'center'
                                }}
                                role="img"
                                aria-label={service.title}
                            />
                        </div>
                    </div>

                    {/* Right Column - Text (75-80% width) */}
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-dark mb-3">
                            {service.title}
                        </h3>
                        <p className="font-sans text-base md:text-lg text-gray-600 leading-relaxed">
                            {service.description}
                        </p>
                    </div>
                </div>
            </CardWrapper>
        );
    }

    // Standard card: vertical centered layout
    const CardWrapper = service.link ? Link : 'div';
    return (
        <CardWrapper
            to={service.link || undefined}
            aria-label={service.title}
            className={`bg-white rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-shadow duration-300 p-8 flex flex-col items-center justify-center text-center h-full min-h-[280px] ${service.link ? 'cursor-pointer' : ''} block`}
        >
            {/* Icon */}
            <div className="mb-6">
                <div className={`w-24 h-24 ${colorClass} rounded-full flex items-center justify-center shadow-md`}>
                    <div 
                        className="w-14 h-14 bg-white"
                        style={{
                            maskImage: `url(${service.icon})`,
                            WebkitMaskImage: `url(${service.icon})`,
                            maskSize: 'contain',
                            maskRepeat: 'no-repeat',
                            maskPosition: 'center'
                        }}
                        role="img"
                        aria-label={service.title}
                    />
                </div>
            </div>

            {/* Title */}
            <h4 className="font-display text-xl md:text-2xl font-bold text-dark mb-3">
                {service.title}
            </h4>

            {/* Description */}
            <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
                {service.description}
            </p>
        </CardWrapper>
    );
};

export default ServiceCard;
