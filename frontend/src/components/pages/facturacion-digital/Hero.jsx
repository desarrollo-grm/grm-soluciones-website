import CTAButton from "@/src/components/commons/CTAButton";
import Image from "next/image";

const Hero = () => {
    return (
        <section className="bg-light lg:min-h-[calc(100dvh-88px)] flex items-center overflow-hidden py-16 px-6">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12 lg:gap-16">
                {/* Left Side - Text Content */}
                <div className="flex-1 flex flex-col gap-6 max-w-2xl">
                    <h1 className="font-display text-secondary text-5xl md:text-6xl lg:text-7xl font-bold">
                        Facturación Digital
                    </h1>
                    <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-dark">
                        Llevamos tu negocio al siguiente nivel
                    </h2>
                    <p className="text-lg md:text-xl text-dark leading-relaxed">
                        Te ofrecemos soluciones de facturación digital que simplifican
                        y optimizan el proceso de gestión de facturas para empresas
                        de todos los tamaños.
                    </p>
                    <CTAButton to="/contact">
                        Solicita Información
                    </CTAButton>
                </div>

                {/* Right Side - Image */}
                <div className="flex-1 flex items-center justify-center">
                    <div className="relative aspect-[4/3] w-full max-w-xl">
                        <Image
                            src="/assets/images/digital-invoice.png" 
                            alt="Sistema de Facturación Digital" 
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 576px"
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
