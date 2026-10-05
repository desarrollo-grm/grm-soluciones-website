import Hero from '@/src/components/pages/home/Hero';
import Clients from '@/src/components/pages/home/Clients';
import Services from '@/src/components/pages/home/Services';
import Articles from '@/src/components/pages/home/Articles';
import clientsData from '@/src/data/clients';

const HomePage = () => {
    return (
        <>
            <Hero />
            <Clients clients={clientsData}/>
            <Services />
            <Articles />
        </>
    );
};

export default HomePage;
