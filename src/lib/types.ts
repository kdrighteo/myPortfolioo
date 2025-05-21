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
