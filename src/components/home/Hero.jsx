import CTAButton from "../commons/CTAButton";

const Hero = () => {
    return (
        <section className="bg-primary text-white h-[calc(100dvh-88px)] flex items-end overflow-hidden">
            <div className="container mx-auto px-6 pb-0 flex items-start gap-8 h-full">
                <div className="flex-1 px-8 py-8 gap-6 flex flex-col justify-center h-full">
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                        Más de <span className="text-secondary">31 años</span> ofreciendo soluciones para tu negocio
                    </h1>
                    <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-medium mb-8">
                        En GRM Soluciones combinamos experiencia, innovación y atención personalizada.
                    </h2>
                    <CTAButton onClick={() => window.location.href = '#contacto'}>Conócenos</CTAButton>
                </div>
                <div className="h-full flex items-start justify-start flex-shrink-0">
                    <img src="../../assets/images/partners.png" alt="Guiando a nuestros clientes" className="h-full w-auto object-contain"/>
                </div>
            </div>
        </section>
    );
};

export default Hero;