import { Link } from 'react-router-dom';

const CTAButton = ({ children, onClick, type, to, fullWidth = false, className = '' }) => {
    const widthClass = fullWidth ? 'w-full' : 'w-64';
    const baseClassName = `bg-secondary hover:bg-accent text-white font-sans font-semibold py-3 px-8 rounded-2xl transition-colors shadow-lg ${widthClass} inline-block text-center ${className}`.trim();
    
    if (to) {
        return (
            <Link to={to} className={baseClassName}>
                {children}
            </Link>
        );
    }
    
    return (
        <button type={type || "button"} className={baseClassName} onClick={onClick}>
            {children}
        </button>
    );
};

export default CTAButton;