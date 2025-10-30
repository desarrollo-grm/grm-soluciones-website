import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/about-us/Hero'
import Values from '/src/components/pages/about-us/Values';
import Objectives from '/src/components/pages/about-us/Objectives';
import Footer from '/src/components/layout/Footer';

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Values />
            <Objectives />
            <Footer />
        </>
    );
};

export default AboutUsPage;