'use client'
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import CTAButton from "@/src/components/commons/CTAButton";

const telephonePattern = /^[+]?[0-9\s().-]{9,20}$/;

const isValidTelephone = (telephone) => {
    if (!telephone.trim()) {
        return true;
    }

    const digits = telephone.replace(/\D/g, "");
    return telephonePattern.test(telephone) && digits.length >= 9 && digits.length <= 15;
};

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        telephone: "",
        message: "",
    });
    const [status, setStatus] = useState("idle");
    const [feedback, setFeedback] = useState("");
    const { executeRecaptcha } = useGoogleReCaptcha() || {};
    const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "/api/contact";

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [id]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isValidTelephone(formData.telephone)) {
            setStatus("error");
            setFeedback("Introduce un número de teléfono válido.");
            return;
        }

        if (!executeRecaptcha) {
            setStatus("error");
            setFeedback("No pudimos verificar tu solicitud. Intenta de nuevo más tarde.");
            return;
        }

        setStatus("loading");
        setFeedback("");

        try {
            const captchaToken = await executeRecaptcha("contact_form");
            const response = await fetch(contactEndpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, captchaToken }),
            });
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data.error || "No pudimos enviar tu mensaje.");
            }

            setStatus("success");
            setFeedback("Mensaje enviado correctamente. Te contactaremos pronto.");
            setFormData({ name: "", email: "", telephone: "", message: "" });
        } catch (error) {
            console.error("Error sending contact message:", error);
            setStatus("error");
            setFeedback("No pudimos conectar con el servidor. Intenta más tarde.");
        }
    };

    return (
        <div className="flex flex-col max-w-md w-full overflow-visible px-1 min-h-0 lg:h-full">
            <h2 className="text-2xl font-display font-bold mb-4">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-1 overflow-visible min-h-0">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-sm font-medium text-dark mb-1">
                        Nombre
                    </label>
                    <input 
                        type="text" 
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Alejandro Rodríguez" 
                        required 
                        className="px-3 py-1.5 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent text-sm"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-medium text-dark mb-1">
                        Correo electrónico
                    </label>
                    <input 
                        type="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="correo@ejemplo.com" 
                        required 
                        className="px-3 py-1.5 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent text-sm"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="telephone" className="text-sm font-medium text-dark mb-1">
                        Teléfono <span className="text-dark/60">(opcional)</span>
                    </label>
                    <input 
                        type="tel" 
                        id="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="0412-555-1234" 
                        pattern="[+]?[0-9\s().-]{7,20}"
                        maxLength={20}
                        inputMode="tel"
                        title="Usa entre 9 y 15 dígitos. Puedes incluir +, espacios, paréntesis, puntos o guiones."
                        className="px-3 py-1.5 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent text-sm"
                    />
                </div>
                
                <div className="flex flex-col flex-1 min-h-0">
                    <label htmlFor="message" className="text-sm font-medium text-dark mb-1">
                        Mensaje
                    </label>
                    <textarea 
                        id="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre tu proyecto o consulta..." 
                        required 
                        className="px-3 py-2 border border-dark/20 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-0 focus:border-transparent resize-none flex-1 text-sm"
                    ></textarea>
                </div>
                
                <CTAButton type="submit" disabled={status === "loading"}>
                    {status === "loading" ? "Enviando..." : "Enviar mensaje"}
                </CTAButton>
                {feedback && (
                    <p
                        role="status"
                        aria-live="polite"
                        className={`text-sm ${status === "success" ? "text-green-700" : "text-red-700"}`}
                    >
                        {feedback}
                    </p>
                )}
            </form>
        </div>
    );
}

export default ContactForm;