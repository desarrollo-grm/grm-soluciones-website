const CTAButton = ({children, onClick, type}) => {
    return (
        <button type={type || "button"} className="bg-secondary hover:bg-accent text-white font-sans font-semibold py-3 px-8 rounded-2xl transition-colors shadow-lg w-64" onClick={onClick}>
            {children}
        </button>
    );
};

export default CTAButton;