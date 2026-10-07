import Hero from '@/src/components/pages/about-us/Hero'
import Values from '@/src/components/pages/about-us/Values';
import Objectives from '@/src/components/pages/about-us/Objectives';
import Partners from '@/src/components/pages/about-us/Partners';
import partnersData from "@/src/data/partners"
import ContactUs from '@/src/components/pages/about-us/ContactUs';

const AboutUsPage = () => {
    return (
        <>
            <Hero />
            <Values />
            <Objectives />
            <Partners partners={partnersData} />
            <ContactUs />
        </>
    );
};

export default AboutUsPage;
