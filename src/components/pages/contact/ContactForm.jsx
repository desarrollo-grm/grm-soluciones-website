import CTAButton from "/src/components/commons/CTAButton";

const ContactForm = () => {
    return (
        <div className="flex flex-col max-w-md w-full overflow-visible px-1 min-h-0">
            <h2 className="text-2xl font-display font-bold mb-4">Envíanos un mensaje</h2>
            <form action="" className="flex flex-col gap-3 flex-1 overflow-visible min-h-0">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-dark mb-1">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        placeholder="Alejandro Rodríguez" 
                        required 
                        className="px-4 py-2 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-dark mb-1">
                        Correo electrónico
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="correo@ejemplo.com" 
                        required 
                        className="px-4 py-2 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-sm font-medium text-dark mb-1">
                        Teléfono <span className="text-dark/60">(opcional)</span>
                    </label>
                    <input 
                        type="tel" 
                        id="phone" 
                        placeholder="0412-555-1234" 
                        className="px-4 py-2 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent"
                    />
                </div>
                
                <div className="flex flex-col flex-1 min-h-0">
                    <label htmlFor="message" className="text-sm font-medium text-dark mb-1">
                        Asunto
                    </label>
                    <textarea 
                        id="message" 
                        placeholder="Cuéntanos sobre tu proyecto o consulta..." 
                        required 
                        className="px-4 py-2 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent resize-none flex-1"
                    ></textarea>
                </div>
                
                <CTAButton type="submit">
                    Enviar mensaje
                </CTAButton>
            </form>
        </div>
    );
}

export default ContactForm;