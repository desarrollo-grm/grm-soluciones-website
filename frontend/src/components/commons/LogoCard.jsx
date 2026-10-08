import Image from 'next/image';

const LogoCard = ({logoSrc, altText, link, width = "w-48", height = "h-32"}) => {

    const image = (link === "") ? 
        <Image src={logoSrc} alt={altText} width={256} height={160} sizes="(max-width: 768px) 192px, 256px" className="max-h-full max-w-full object-contain" />
        : 
        <a href={link} className="flex items-center justify-center w-full h-full">
            <Image src={logoSrc} alt={altText} width={256} height={160} sizes="(max-width: 768px) 192px, 256px" className="max-h-full max-w-full object-contain" />
        </a>;

    return (
        <div className={`flex items-center justify-center p-4 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 flex-shrink-0 ${width} ${height}`}>
            {image}
        </div>
    );
}

export default LogoCard;