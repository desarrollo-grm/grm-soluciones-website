import Link from 'next/link';

const CTAButton = ({ children, onClick, type, to, fullWidth = false, className = '', disabled = false }) => {
    const widthClass = fullWidth ? 'w-full' : 'w-64';
    const disabledClass = disabled ? 'opacity-60 cursor-not-allowed pointer-events-none' : 'hover:bg-accent';
    const baseClassName = `bg-secondary text-white font-sans font-semibold py-3 px-8 rounded-2xl transition-colors shadow-lg ${widthClass} inline-block text-center ${disabledClass} ${className}`.trim();

    if (to) {
        if (disabled) {
            return (
                <Link
                    href={to}
                    className={baseClassName}
                    aria-disabled="true"
                    onClick={(event) => event.preventDefault()}
                >
                    {children}
                </Link>
            );
        }

        return (
            <Link href={to} className={baseClassName}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type || "button"} className={baseClassName} onClick={onClick} disabled={disabled}>
            {children}
        </button>
    );
};

export default CTAButton;