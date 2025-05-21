export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  coverImage: string;
  images: string[];
  tags: string[];
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  year: number;
  category: string;
  featured: boolean;
  inProgress?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishDate: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  readingTime: number; // in minutes
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number; // 1-5
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'design' | 'other';
  icon?: string;
}
