import '/src/styles/carousel.css';
import LogoCard from '/src/components/commons/LogoCard';

const Carousel = ({ objects }) => {
    return (
        <div className="relative w-full mx-0 px-0 mt-10 carousel-container">
                <div className="overflow-hidden py-12 flex">
                    <div className="flex flex-row gap-8 items-center pl-8 animate-scroll">
                        {objects.map((object) => (
                            <LogoCard 
                                key={`${object.id}`} 
                                logoSrc={object.logo} 
                                altText={object.name} 
                                link={object.link} 
                            />
                        ))}
                    </div>
                    <div className="aria-hidden flex flex-row gap-8 items-center pl-8 animate-scroll">
                        {objects.map((object) => (
                            <LogoCard 
                                key={`${object.id}-2`} 
                                logoSrc={object.logo} 
                                altText={object.name} 
                                link={object
                                    .link} 
                            />
                        ))}
                    </div>
                </div>
                {/* Gradient overlays */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-light to-transparent pointer-events-none z-10"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-light to-transparent pointer-events-none z-10"></div>
            </div>
    );
};

export default Carousel;