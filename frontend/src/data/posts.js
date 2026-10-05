import { 
  getAllPosts, 
  getPostBySlug, 
  getRelatedPosts as getRelatedPostsFromSanity, 
  getFilteredPosts,
  getPostsCount 
} from '@/src/sanity/queries';
import { urlFor } from '@/src/sanity/sanity';

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
 * Calculate read time based on content word count
 * Assumes average reading speed of 200 words per minute
 */
const calculateReadTime = (content) => {
  if (!content || !Array.isArray(content)) return 5; // Default fallback
  
  let wordCount = 0;
  
  content.forEach(block => {
    if (block._type === 'block' && block.children) {
      block.children.forEach(child => {
        if (child.text) {
          wordCount += child.text.split(/\s+/).filter(word => word.length > 0).length;
        }
      });
    }
  });
  
  const minutes = Math.ceil(wordCount / 200);
  return minutes > 0 ? minutes : 1; // Minimum 1 minute
};

/**
 * CTA-Title and Subtitle default values by products
 */
const defaultCTAs = {
  'Condominio': {
    ctaTitle: 'Descubre Condominio Sagúes',
    ctaSubtitle: 'Optimiza la gestión de tu condominio con nuestra solución integral.'
  },
  'Facturación': {
    ctaTitle: 'Transforma tu facturación',
    ctaSubtitle: 'Implementa la facturación digital y mejora la eficiencia de tu negocio.'
  },
  'Saint': {
    ctaTitle: 'Potencia tu negocio con Saint',
    ctaSubtitle: 'Descubre cómo Saint puede ayudarte a optimizar tus procesos empresariales.'
  },
  'Soporte': {
    ctaTitle: 'Soporte integral para tu empresa',
    ctaSubtitle: 'Nuestro equipo de expertos está listo para ayudarte en cualquier momento.'
  },
  'Equipos': {
    ctaTitle: 'Equipos y máquinas fiscales de última generación',
    ctaSubtitle: 'Asegura la eficiencia y cumplimiento fiscal con nuestros equipos especializados.'
  },
  'Asesoría': {
    ctaTitle: 'Asesoría integral para tu negocio',
    ctaSubtitle: 'Recibe orientación experta para tomar decisiones estratégicas y crecer.'
  },
  'default': {
    ctaTitle: 'Contáctanos',
    ctaSubtitle: 'Descubre cómo nuestras soluciones pueden transformar tu negocio.'
  }
}

/**
 * This function returns the default CTA based on the first matching tag.
 * Tags is an ordered array that contains products and categories. 
 **/
const getDefaultCTAbyTags= (tags) => {
  for (const tag of tags) {
    if (defaultCTAs[tag]) {
      return defaultCTAs[tag];
    }
  }
  return defaultCTAs['default']; // Fallback to default if no matching tag is found
}

/**
 * Format a Sanity post for display in PostCard component
 */
export const formatPost = (post) => ({
  id: post._id,
  slug: post.slug,
  image: post.coverImage?.asset?.url || (post.coverImage ? urlFor(post.coverImage).url() : '/assets/images/article-placeholder.jpg'),
  categories: post.tags,
  title: post.title,
  excerpt: post.excerpt,
  date: new Date(post.publishedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }),
  readTime: `${post.readtime || calculateReadTime(post.content)} minutos de lectura`
});

/**
 * 
 * Format a Sanity post for full page display
 */
export const formatFullPost = (post) => ({
  id: post._id,
  slug: post.slug,
  image: post.coverImage?.asset?.url || (post.coverImage ? urlFor(post.coverImage).url() : '/assets/images/article-placeholder.jpg'),
  categories: post.tags,
  title: post.title,
  excerpt: post.excerpt,
  date: new Date(post.publishedAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }),
  readtime: post.readtime || calculateReadTime(post.content),
  content: post.content,
  ctaTitle: post.ctaTitle || getDefaultCTAbyTags(post.tags).ctaTitle,
  ctaSubtitle: post.ctaSubtitle || getDefaultCTAbyTags(post.tags).ctaSubtitle,
  ctaButton: post.ctaButton || 'Solicita una demo'
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
  return formatFullPost(await getPostBySlug(slug));
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

/**
 * Get posts for home page
 */
export const getPostsForHome = async (limit = 3) => {
  const posts = await getAllPosts(0, limit);
  return posts.map(formatPost);
};
