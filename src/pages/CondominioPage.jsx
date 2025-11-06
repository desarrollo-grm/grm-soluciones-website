import Header from "/src/components/layout/Header";
import Footer from "/src/components/layout/Footer";
import Features from "/src/components/pages/condominio/Features";
import Beneficios from "/src/components/pages/condominio/Beneficios";


const CondominioPage = () => {
    return (
        <>
            <Header />
            <Features />
            <Beneficios />
            <Footer />
        </>
    );
};

export default CondominioPage;