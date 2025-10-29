const UnderlinedTitle = ({ children, color }) => {
    return (
        <div className="flex flex-col justify-center items-center gap-4">
                <h1 className={`text-dark font-${color} text-3xl md:text-4xl lg:text-5xl font-bold`}>{children}</h1>
                <div className="bg-accent w-64 h-1"></div>
        </div>
    );
}

export default UnderlinedTitle;