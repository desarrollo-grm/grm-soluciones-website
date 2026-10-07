'use client';

import { products, categories } from '@/src/data/posts';
import NewsletterForm from '@/src/components/layout/NewsletterForm';

const BlogSidebar = ({ 
    searchTerm, 
    onSearchChange, 
    selectedProducts, 
    onProductsChange, 
    selectedCategories, 
    onCategoriesChange 
}) => {
    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscador de artículos"
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="w-full pl-10 pr-4 py-2.5 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                    />
                    <svg 
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                        />
                    </svg>
                </div>
            </div>

            {/* Products and Services */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-4">
                    Productos y servicios
                </h3>
                <ul className="space-y-3">
                    {products.map((product, index) => (
                        <li key={index}>
                            <button 
                                onClick={() => onProductsChange(product.tag)}
                                className={`transition-colors text-left ${
                                    selectedProducts.includes(product.tag)
                                        ? 'text-secondary font-semibold'
                                        : 'text-dark/80 hover:text-secondary'
                                }`}
                            >
                                {product.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-4">
                    Categorías
                </h3>
                <ul className="space-y-3">
                    {categories.map((category, index) => (
                        <li key={index}>
                            <button 
                                onClick={() => onCategoriesChange(category)}
                                className={`transition-colors text-left ${
                                    selectedCategories.includes(category)
                                        ? 'text-secondary font-semibold'
                                        : 'text-dark/80 hover:text-secondary'
                                }`}
                            >
                                {category}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-display text-xl font-bold text-dark mb-2">
                    Newsletter
                </h3>
                <p className="text-dark/80 text-sm mb-4">
                    Mantente al tanto de todas las novedades
                </p>
                <NewsletterForm variant="blog" />
            </div>
        </div>
    );
};

export default BlogSidebar;
