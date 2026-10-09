import ContactForm from "@/src/components/pages/contact/ContactForm"; 
import ContactInfo from "@/src/components/pages/contact/ContactInfo"; 
import SectionHeader from "@/src/components/commons/SectionHeader";

const ContactPage = () => {
    return (
        <>
            <section className="bg-light xl:h-[calc(100dvh-88px)] flex flex-col overflow-hidden pb-12">
                <SectionHeader 
                    title="Contáctanos"
                    subtitle="Envíanos tus datos y te contactaremos pronto."
                    margin="small"
                    headingLevel={1}
                />
                <div id="contact" className="bg-light flex-1 px-4 py-4 flex flex-wrap items-stretch justify-center gap-8">
                    <ContactForm />
                    <ContactInfo />
                </div>
            </section>
        </>
    );
};

export default ContactPage;
