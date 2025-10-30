import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/home/Hero';
import Clients from '/src/components/pages/home/Clients';
import Services from '/src/components/pages/home/Services';
import Articles from '/src/components/pages/home/Articles';
import Footer from '/src/components/layout/Footer';
import clientsData from '/src/data/clients.js';
import articlesData from "/src/data/articles";
import servicesData from "/src/data/services";

const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Clients clients={clientsData}/>
            <Services services={servicesData} />
            <Articles articles={articlesData} />
            <Footer />
        </>
    );
};

export default HomePage;