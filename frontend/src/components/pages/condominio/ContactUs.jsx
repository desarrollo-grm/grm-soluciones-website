import SectionHeader from '/src/components/commons/SectionHeader';
import Carousel from '/src/components/commons/Carousel';
import CTAButton from '/src/components/commons/CTAButton';

import { ccClients } from '/src/data/clients';

const ContactUs = () => {
    return (
        <section className="bg-light lg:h-min-[calc(100dvh-88px)] py-16 px-6 flex flex-col justify-center items-center gap-2">
            <SectionHeader 
            title="Condominio Sagués"
            subtitle="Lleva tu gestión de condominios al siguiente nivel"
            />
            <p className="text-lg text-dark font-normal text-center max-w-2xl">Ya estos 5 grandes centros comerciales confían en nosotros.</p>
            <div className="w-full">
                <div className="block lg:hidden">
                    <Carousel objects={ccClients} animated={true}/>
                </div>
                <div className="hidden lg:block">
                    <Carousel objects={ccClients} animated={false}/>
                </div>
            </div>
            <CTAButton to="/contact">
                Solicita una demo
            </CTAButton>
        </section>
    );
};

export default ContactUs;