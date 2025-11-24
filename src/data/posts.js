import { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts as getRelatedPostsFromSanity, 
  getFilteredPosts,
  getPostsCount 
} from '/src/sanity/queries';

// Keep old posts array for fallback (commented out)
// export const posts = [ ... ];



// Products and services with their tag mappings
export const products = [
  { name: 'Condominio Sagúes', tag: 'Condominio' },
  { name: 'Facturación digital', tag: 'Facturación' },
  { name: 'Saint', tag: 'Saint' },
  { name: 'Soporte integral', tag: 'Soporte' },
  { name: 'Equipos y maquinas fiscales', tag: 'Equipos' },
  { name: 'Asesoría integral', tag: 'Asesoría' }
];

// Categories
export const categories = [
  'Noticias',
  'Consejos',
  'Optimización',
  'Tendencias',
  'Normativas'
];

/**
 * Format a Sanity post for display in PostCard component
 */
export const formatPost = (post) => ({
  id: post._id,
  slug: post.slug,
  image: post.coverImage,
  categories: post.tags,
  title: post.title,
  excerpt: post.excerpt,
  date: new Date(post.publishedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }),
  readTime: `${post.readtime} minutos de lectura`
});

/**
 * Get all posts formatted for display
 */
export const getFormattedPosts = async (start = 0, end = 100) => {
  const posts = await getAllPosts(start, end);
  return posts.map(formatPost);
};

/**
 * Get a single post by slug
 */
export const getPost = async (slug) => {
  return await getPostBySlug(slug);
};

/**
 * Get filtered and paginated posts from Sanity
 */
export const getFilteredPaginatedPosts = async (
  searchTerm = '', 
  selectedCategories = [], 
  selectedProducts = [], 
  page = 1, 
  postsPerPage = 6,
  skipFirst = false
) => {
  const [posts, totalPosts] = await Promise.all([
    getFilteredPosts(searchTerm, selectedCategories, selectedProducts, page, postsPerPage, skipFirst),
    getPostsCount(searchTerm, selectedCategories, selectedProducts)
  ]);
  
  const formattedPosts = posts.map(formatPost);
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  return {
    currentPosts: formattedPosts,
    totalPages,
    currentPage: page,
    totalPosts
  };
};

/**
 * Get related posts
 */
export const getRelatedPosts = async (postId, postTags, limit = 3) => {
  const posts = await getRelatedPostsFromSanity(postId, postTags, limit);
  return posts.map(formatPost);
};
