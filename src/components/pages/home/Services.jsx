import UnderlinedTitle from "/src/components/commons/UnderlinedTitle";
import ServiceCard from "/src/components/commons/ServiceCard";
import { getFeaturedService, getNonFeaturedServices } from "/src/data/services.js";

const Services = () => {
    const featuredService = getFeaturedService();
    const standardServices = getNonFeaturedServices();

    const featuredColor = "primary";
    const standardColors = ["secondary", "secondary", "accent", "accent"];

    return (
        <section id="services" className="bg-light py-12 px-4 min-h-[calc(100dvh-88px)] scroll-mt-[88px]">
            <UnderlinedTitle color="secondary">Nuestros productos y servicios</UnderlinedTitle>
            <div className="container mx-auto mt-10 max-w-6xl">
                {/* Featured Card - Full Width */}
                <div className="mb-8">
                    <ServiceCard 
                        service={featuredService} 
                        featured={true} 
                        color={featuredColor}
                    />
                </div>

                {/* Standard Cards - 2x2 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {standardServices.map((service, index) => (
                        <ServiceCard 
                            key={service.id} 
                            service={service}
                            color={standardColors[index]}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;