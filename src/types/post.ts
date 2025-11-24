export interface SanityPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  publishedAt: string;
  readtime: number;
  content?: any[]; // Portable Text content
}

export interface FormattedPost {
  id: string;
  slug: string;
  image: string;
  categories: string[];
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
}
