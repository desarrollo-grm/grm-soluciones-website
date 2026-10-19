import SoftwareGestion from "@/src/components/pages/soporte/SoftwareGestion";
import Infraestructura from "@/src/components/pages/soporte/Infraestructura";
import Hero from "@/src/components/pages/soporte/Hero.jsx";
import ContactUs from "@/src/components/pages/soporte/ContactUs.jsx";

const SoportePage = () => {
    return (
        <>
            <Hero />
            <SoftwareGestion />
            <Infraestructura />
            <ContactUs />
        </>
    );
};

export default SoportePage;
