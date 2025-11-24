import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '/src/components/layout/Header';
import PostContent from '/src/components/pages/blog/PostContent';
import BlogSidebar from '/src/components/commons/BlogSidebar';
import Footer from '/src/components/layout/Footer';

const BlogPost = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        // Navigate to blog page with search
        if (value) {
            navigate(`/blog?search=${encodeURIComponent(value)}`);
        }
    };

    const handleProductToggle = (productTag) => {
        navigate(`/blog?product=${productTag}`);
    };

    const handleCategoryToggle = (category) => {
        navigate(`/blog?category=${category}`);
    };

    return (
        <>
            <Header />
            <section className="bg-light py-12 md:py-16">
                <div className="container mx-auto px-16">
                    <div className="grid lg:grid-cols-[1fr_350px] gap-8 lg:gap-12">
                        {/* Main Content - Slightly wider */}
                        <div className="max-w-4xl">
                            <PostContent />
                        </div>

                        {/* Sidebar - Sticky */}
                        <div className="sticky top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto">
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
                </div>
            </section>
            <Footer />
        </>
    );
};

export default BlogPost;
