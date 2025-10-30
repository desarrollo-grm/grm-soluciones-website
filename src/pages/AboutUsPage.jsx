import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/about-us/Hero'
import Values from '/src/components/pages/about-us/Values';
import Objectives from '/src/components/pages/about-us/Objectives';
import Partners from '/src/components/pages/about-us/Partners';
import Footer from '/src/components/layout/Footer';
import partnersData from "/src/data/partners"

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Values />
            <Objectives />
            <Partners partners={partnersData} />
            <Footer />
        </>
    );
};

export default AboutUsPage;