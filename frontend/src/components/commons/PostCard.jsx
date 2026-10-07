import Link from 'next/link';

const PostCard = ({ post, featured = false, compact = false }) => {
    const { slug, image, categories, title, excerpt, date, readTime } = post;

    // Compact card layout (image + title only)
    if (compact) {
        return (
            <Link href={`/blog/${slug}`} className="block h-full group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                    {/* Image - Square aspect ratio */}
                    <div className="relative w-full overflow-hidden flex-shrink-0" style={{ paddingTop: '100%' }}>
                        <img 
                            src={image} 
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    {/* Title */}
                    <div className="p-3">
                        <h4 className="font-display text-sm font-semibold text-dark line-clamp-3 group-hover:text-secondary transition-colors">
                            {title}
                        </h4>
                    </div>
                </div>
            </Link>
        );
    }

    if (featured) {
        return (
            <Link href={`/blog/${slug}`} className="block h-full">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex">
                    <div className="grid grid-cols-2 gap-0 h-full w-full">
                        {/* Image */}
                        <div className="relative h-auto min-h-[200px] md:min-h-0 md:h-full">
                            <img 
                                src={image} 
                                alt={title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 lg:px-10 flex flex-col justify-center">
                            {/* Categories */}
                            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                                {categories.map((category, index) => (
                                    <span 
                                        key={index}
                                        className={`px-4 py-1.5 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold ${
                                            index === 0 
                                                ? 'bg-primary text-white' 
                                                : 'bg-accent text-white'
                                        }`}
                                    >
                                        {category}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-dark mb-3 md:mb-4">
                                {title}
                            </h3>

                            {/* Excerpt */}
                            <p className="text-dark/80 text-sm line-clamp-5 md:text-base lg:text-lg mb-4 md:mb-6">
                                {excerpt}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-dark/60">
                                <span>{date}</span>
                                <span className="w-1 h-1 bg-dark/60 rounded-full"></span>
                                <span>{readTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    // Regular card layout
    return (
        <Link href={`/blog/${slug}`} className="block h-full">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                {/* Image - Consistent 16:9 aspect ratio */}
                <div className="relative w-full overflow-hidden flex-shrink-0" style={{ paddingTop: '56.25%' }}>
                    <img 
                        src={image} 
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                    {/* Categories */}
                    <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                        {categories.map((category, index) => (
                            <span 
                                key={index}
                                className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold ${
                                    index === 0 
                                        ? 'bg-primary text-white' 
                                        : 'bg-accent text-white'
                                }`}
                            >
                                {category}
                            </span>
                        ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-xl md:text-2xl font-bold text-dark mb-2 md:mb-3 line-clamp-2">
                        {title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-dark/80 text-base md:text-lg mb-3 md:mb-4 flex-grow line-clamp-3">
                        {excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-3 text-sm md:text-base text-dark/60 mt-auto">
                        <span>{date}</span>
                        <span className="w-1 h-1 bg-dark/60 rounded-full"></span>
                        <span>{readTime}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;