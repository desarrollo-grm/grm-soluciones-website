import { client } from './sanity';

// Query to get all posts with pagination
export const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[$start...$end]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset.url,
  tags,
  publishedAt,
  readtime,
  content
}`;

// Query to get a single post by slug
export const POST_BY_SLUG_QUERY = `*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset.url,
  tags,
  publishedAt,
  readtime,
  content
}`;

// Query to get related posts by tags
export const RELATED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && _id != $postId
  && count((tags[])[@ in $tags]) > 0
]|order(publishedAt desc)[0...$limit]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset.url,
  tags,
  publishedAt,
  readtime
}`;

// Filter posts by search, categories, and products
export const FILTERED_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && (
    $searchTerm == "" 
    || title match $searchTerm + "*" 
    || excerpt match $searchTerm + "*"
  )
  && (
    count($categories) == 0 
    || count((tags[])[@ in $categories]) > 0
  )
  && (
    count($products) == 0 
    || count((tags[])[@ in $products]) > 0
  )
]|order(publishedAt desc)[$start...$end]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "coverImage": coverImage.asset.url,
  tags,
  publishedAt,
  readtime
}`;

// Get total count for pagination
export const POSTS_COUNT_QUERY = `count(*[
  _type == "post"
  && defined(slug.current)
  && (
    $searchTerm == "" 
    || title match $searchTerm + "*" 
    || excerpt match $searchTerm + "*"
  )
  && (
    count($categories) == 0 
    || count((tags[])[@ in $categories]) > 0
  )
  && (
    count($products) == 0 
    || count((tags[])[@ in $products]) > 0
  )
])`;

// Fetch all posts with pagination
export async function getAllPosts(start = 0, end = 12) {
  return await client.fetch(POSTS_QUERY, { start, end });
}

// Fetch a single post by slug
export async function getPostBySlug(slug: string) {
  return await client.fetch(POST_BY_SLUG_QUERY, { slug });
}

// Fetch related posts
export async function getRelatedPosts(postId: string, tags: string[], limit = 3) {
  return await client.fetch(RELATED_POSTS_QUERY, { postId, tags, limit });
}

// Filter posts by search, categories, and products
export async function getFilteredPosts(
  searchTerm = '',
  categories: string[] = [],
  products: string[] = [],
  page = 1,
  postsPerPage = 6,
  skipFirst = false
) {
  const start = (page - 1) * postsPerPage + (skipFirst ? 1 : 0);
  const end = start + postsPerPage;
  
  return await client.fetch(FILTERED_POSTS_QUERY, {
    searchTerm,
    categories,
    products,
    start,
    end
  });
}

// Get total count for pagination
export async function getPostsCount(
  searchTerm = '',
  categories: string[] = [],
  products: string[] = []
) {
  return await client.fetch(POSTS_COUNT_QUERY, {
    searchTerm,
    categories,
    products
  });
}
