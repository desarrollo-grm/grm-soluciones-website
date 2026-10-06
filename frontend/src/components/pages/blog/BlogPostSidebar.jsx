'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import BlogSidebar from '@/src/components/commons/BlogSidebar';

export default function BlogPostSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const product = searchParams.get('product') || '';
  const category = searchParams.get('category') || '';
  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      router.push(`/blog?search=${encodeURIComponent(value)}`);
    }
  };

  const handleProductToggle = (productTag) => {
    router.push(`/blog?product=${encodeURIComponent(productTag)}`);
  };

  const handleCategoryToggle = (category) => {
    router.push(`/blog?category=${encodeURIComponent(category)}`);
  };

  return (
    <BlogSidebar
      searchTerm={searchTerm}
      onSearchChange={handleSearchChange}
      selectedProducts={product ? [product] : []}
      onProductsChange={handleProductToggle}
      selectedCategories={category ? [category] : []}
      onCategoriesChange={handleCategoryToggle}
    />
  );
}
