import { Link } from 'react-router-dom';

const CTAButton = ({children, onClick, type, to}) => {
    const className = "bg-secondary hover:bg-accent text-white font-sans font-semibold py-3 px-8 rounded-2xl transition-colors shadow-lg w-64 inline-block text-center";
    
    if (to) {
        return (
            <Link to={to} className={className}>
                {children}
            </Link>
        );
    }
    
    return (
        <button type={type || "button"} className={className} onClick={onClick}>
            {children}
        </button>
    );
};

export default CTAButton;