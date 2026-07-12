import Benefits from "../components/pages/soporte/Benefits";
import Hero from "/src/components/pages/soporte/hero.jsx";
import Header from "/src/components/layout/Header";
import Footer from "/src/components/layout/Footer";
import ContactUs from "/src/components/pages/soporte/ContactUs.jsx";

const SoportePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Benefits />
            <ContactUs />
            <Footer />
        </>
    );
};

export default SoportePage;
