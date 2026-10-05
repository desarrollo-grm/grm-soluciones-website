import UnderlinedTitle from "@/src/components/commons/UnderlinedTitle";
import Carousel from "@/src/components/commons/Carousel";

const Clients = ({ clients }) => {
    return (
        <section className="bg-light py-12">
            <UnderlinedTitle color="accent">Nuestros Clientes</UnderlinedTitle>
            <Carousel objects={clients} />
        </section>
    );
}

export default Clients;