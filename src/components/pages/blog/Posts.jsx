import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '/src/components/commons/PostCard';
import BlogSidebar from '/src/components/commons/BlogSidebar';
import { getFilteredPaginatedPosts } from '/src/data/posts';

const Posts = () => {

    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const product = searchParams.get('product');
    const category = searchParams.get('category');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [email, setEmail] = useState('');
    const postsPerPage = 4;

    // Initialize state from URL params
    useEffect(() => {
        if (search) setSearchTerm(search);
        if (category) setSelectedCategories([category]);
        if (product) setSelectedProducts([product]);
    }, [search, category, product]);

    // Get filtered and paginated posts (skip first post which is featured in Hero)
    const { currentPosts, totalPages } = getFilteredPaginatedPosts(
        searchTerm,
        selectedCategories,
        selectedProducts,
        currentPage,
        postsPerPage,
        true // skipFirst parameter
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleProductToggle = (productTag) => {
        setSelectedProducts(prev => {
            if (prev.includes(productTag)) {
                return prev.filter(t => t !== productTag);
            } else {
                return [...prev, productTag];
            }
        });
        setCurrentPage(1);
    };

    const handleCategoryToggle = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(c => c !== category);
            } else {
                return [...prev, category];
            }
        });
        setCurrentPage(1);
    };

    return (
        <section className="bg-light py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-8 text-center">
                            Más artículos
                </h2>
                <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-12">
                    {/* Main Content */}
                    <div>
                        {/* Posts Grid */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            {currentPosts.map(post => (
                                <PostCard 
                                    key={post.id}
                                    post={post}
                                    featured={false}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2 flex-wrap">
                                {/* Previous Button */}
                                <button
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-dark hover:bg-gray-300"
                                >
                                    ← Anterior
                                </button>

                                {/* Page Numbers */}
                                {(() => {
                                    const pages = [];
                                    
                                    // If 5 or fewer pages, show them all
                                    if (totalPages <= 5) {
                                        for (let i = 1; i <= totalPages; i++) {
                                            pages.push(
                                                <button
                                                    key={i}
                                                    onClick={() => setCurrentPage(i)}
                                                    className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                                                        currentPage === i
                                                            ? 'bg-secondary text-white'
                                                            : 'bg-gray-200 text-dark hover:bg-gray-300'
                                                    }`}
                                                >
                                                    {i}
                                                </button>
                                            );
                                        }
                                    } else {
                                        // Always show first page
                                        pages.push(
                                            <button
                                                key={1}
                                                onClick={() => setCurrentPage(1)}
                                                className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                                                    currentPage === 1
                                                        ? 'bg-secondary text-white'
                                                        : 'bg-gray-200 text-dark hover:bg-gray-300'
                                                }`}
                                            >
                                                1
                                            </button>
                                        );
                                        
                                        // Determine middle pages to show (3 pages between first and last)
                                        let middlePages = [];
                                        
                                        if (currentPage <= 3) {
                                            // Near start: show 2, 3, 4
                                            middlePages = [2, 3, 4];
                                        } else if (currentPage >= totalPages - 2) {
                                            // Near end: show last-3, last-2, last-1
                                            middlePages = [totalPages - 3, totalPages - 2, totalPages - 1];
                                        } else {
                                            // Middle: show current-1, current, current+1
                                            middlePages = [currentPage - 1, currentPage, currentPage + 1];
                                        }
                                        
                                        // Add ellipsis if gap after first page
                                        if (middlePages[0] > 2) {
                                            pages.push(<span key="ellipsis-start" className="px-2">...</span>);
                                        }
                                        
                                        // Add middle pages
                                        middlePages.forEach(pageNum => {
                                            pages.push(
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setCurrentPage(pageNum)}
                                                    className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                                                        currentPage === pageNum
                                                            ? 'bg-secondary text-white'
                                                            : 'bg-gray-200 text-dark hover:bg-gray-300'
                                                    }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        });
                                        
                                        // Add ellipsis if gap before last page
                                        if (middlePages[middlePages.length - 1] < totalPages - 1) {
                                            pages.push(<span key="ellipsis-end" className="px-2">...</span>);
                                        }
                                        
                                        // Always show last page
                                        pages.push(
                                            <button
                                                key={totalPages}
                                                onClick={() => setCurrentPage(totalPages)}
                                                className={`w-10 h-10 rounded-full font-semibold transition-colors ${
                                                    currentPage === totalPages
                                                        ? 'bg-secondary text-white'
                                                        : 'bg-gray-200 text-dark hover:bg-gray-300'
                                                }`}
                                            >
                                                {totalPages}
                                            </button>
                                        );
                                    }
                                    
                                    return pages;
                                })()}

                                {/* Next Button */}
                                <button
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 text-dark hover:bg-gray-300"
                                >
                                    Siguiente →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <BlogSidebar 
                        searchTerm={searchTerm}
                        onSearchChange={handleSearchChange}
                        selectedProducts={selectedProducts}
                        onProductsChange={handleProductToggle}
                        selectedCategories={selectedCategories}
                        onCategoriesChange={handleCategoryToggle}
                    />
                </div>
            </div>
        </section>
    );
};

export default Posts;
