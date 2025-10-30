import { useState, useRef, useEffect } from "react";
import UnderlinedTitle from "../commons/UnderlinedTitle";
import ServiceCard from "../commons/ServiceCard";
import { services } from "../../data/services";

const ProductsServices = () => {
    const [columnsPerRow, setColumnsPerRow] = useState(3);
    const [hoveredCardId, setHoveredCardId] = useState(null);

    useEffect(() => {
        const updateColumns = () => {
            const width = window.innerWidth;
            // Tailwind breakpoints: md = 768px, lg = 1024px
            if (width >= 1024) {
                setColumnsPerRow(3);
            } else if (width >= 768) {
                setColumnsPerRow(2);
            } else {
                setColumnsPerRow(1);
            }
        };

        // Initial check
        updateColumns();

        // Add event listener
        window.addEventListener('resize', updateColumns);

        // Cleanup
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    const getHoveredRow = () => {
        if (hoveredCardId === null) return null;
        const index = hoveredCardId - 1;
        if (index === -1) return null;
        return Math.floor(index / columnsPerRow);
    }

    const isInHoveredRow = (id) => {
        const hoveredRow = getHoveredRow();
        if (hoveredRow === null) return false;
        const index = id - 1;
        const row = Math.floor(index / columnsPerRow);
        return row === hoveredRow;
    }

    const isSquare = (id) => {
        if (hoveredCardId === null) return false;
        if (isInHoveredRow(id) && id !== hoveredCardId) {
            return true;
        }
        return false;
    }

    return (
        <section className="bg-light py-12 px-4 min-h-[calc(100dvh-88px)]">
            <UnderlinedTitle color="secondary">Nuestros productos y servicios</UnderlinedTitle>
            <div className="container mx-auto mt-10 max-w-6xl">
                <div className="flex flex-wrap items-stretch gap-6">
                    {services.map((service) => (
                        <ServiceCard 
                            key={service.id} 
                            service={service}
                            color={((service.id-1) % 2 === 0) ? 'secondary' : 'accent'}
                            isSquare={isSquare(service.id)}
                            isFill={service.id === hoveredCardId}
                            onMouseEnter={() => setHoveredCardId(service.id)}
                            onMouseLeave={() => setHoveredCardId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ProductsServices;