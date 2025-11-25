import Header from '/src/components/layout/Header';
import Hero from '/src/components/pages/home/Hero';
import Clients from '/src/components/pages/home/Clients';
import Services from '/src/components/pages/home/Services';
import Articles from '/src/components/pages/home/Articles';
import Footer from '/src/components/layout/Footer';
import clientsData from '/src/data/clients';

const HomePage = () => {
    return (
        <>
            <Header />
            <Hero />
            <Clients clients={clientsData}/>
            <Services />
            <Articles />
            <Footer />
        </>
    );
};

export default HomePage;