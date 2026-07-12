const StatPill = ({ number, text, bgColor = "bg-primary" }) => {
    return (
        <div className={`${bgColor} rounded-full px-6 py-4 flex items-center gap-1 shadow-lg min-w-fit`}>
            <div className="bg-light rounded-full w-30 h-30 flex items-center justify-center flex-shrink-0">
                <span className={`font-display font-bold text-5xl leading-none ${bgColor === 'bg-primary' ? 'text-primary' : bgColor === 'bg-secondary' ? 'text-secondary' : 'text-accent'}`}>
                    {number}
                </span>
            </div>
            <div className="text-white font-sans text-center font-semibold text-xl leading-tight max-w-[160px]">
                {text}
            </div>
        </div>
    );
};

export default StatPill;
