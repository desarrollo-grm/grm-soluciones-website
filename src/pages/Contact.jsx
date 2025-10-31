import Header from "/src/components/layout/Header";
import Footer from "/src/components/layout/Footer";
import ContactForm from "/src/components/pages/contact/ContactForm"; 
import ContactInfo from "/src/components/pages/contact/ContactInfo"; 
import SectionHearder from "/src/components/commons/SectionHeader";

const Contact = () => {
    return (
        <>
            <Header />
            <section className="bg-light md:h-[calc(100dvh-88px)] flex flex-col overflow-hidden mb-12">
                <SectionHearder 
                    title="Contáctanos"
                    subtitle="Envíanos tus datos y te contactaremos pronto."
                />
                <div id="contact" className="bg-light flex-1 px-4 py-4 flex items-stretch justify-center gap-8 overflow-hidden">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Contact;