import { Project } from './types';
import { ClassValue, clsx } from 'clsx';

/**
 * Utility function for combining Tailwind CSS classes conditionally
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Filter projects based on category, technology, and search query
 */
export function filterProjects(
  projects: Project[],
  filters: {
    category?: string;
    technology?: string;
    query?: string;
  }
) {
  return projects.filter((project) => {
    // Filter by category
    if (filters.category && project.category !== filters.category) {
      return false;
    }

    // Filter by technology
    if (
      filters.technology &&
      !project.technologies.includes(filters.technology)
    ) {
      return false;
    }

    // Filter by search query (in title or description)
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDescription = project.description.toLowerCase().includes(query);
      if (!matchesTitle && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sort projects by different criteria
 */
export function sortProjects(
  projects: Project[],
  sortBy: 'recent' | 'oldest' | 'name' = 'recent'
) {
  const sortedProjects = [...projects];

  switch (sortBy) {
    case 'recent':
      return sortedProjects.sort((a, b) => b.year - a.year);
    case 'oldest':
      return sortedProjects.sort((a, b) => a.year - b.year);
    case 'name':
      return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return sortedProjects;
  }
}

/**
 * Get unique values from project attributes
 */
export function getUniqueProjectValues<T extends keyof Project>(
  projects: Project[],
  key: T
): Project[T][] {
  if (Array.isArray(projects[0]?.[key])) {
    // Handle array properties like tags, technologies
    const allValues = projects.flatMap((project) => project[key]);
    return Array.from(new Set(allValues)) as Project[T][];
  } else {
    // Handle single value properties like category, year
    const values = projects.map((project) => project[key]);
    return Array.from(new Set(values)) as Project[T][];
  }
}
