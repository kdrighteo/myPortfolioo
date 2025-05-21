import { createClient } from "contentful";
import { Project } from "./types";

// Check if we have real Contentful credentials
const hasValidCredentials = 
  process.env.CONTENTFUL_SPACE_ID && 
  process.env.CONTENTFUL_SPACE_ID !== "demo-space-id" && 
  process.env.CONTENTFUL_ACCESS_TOKEN && 
  process.env.CONTENTFUL_ACCESS_TOKEN !== "demo-access-token";

// Initialize Contentful client if we have valid credentials
export const contentfulClient = hasValidCredentials 
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID || "",
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || "",
      // Use preview tokens for draft content when in development
      host: process.env.NODE_ENV === "development"
        ? "preview.contentful.com"
        : "cdn.contentful.com",
    })
  : null; // Return null when no valid credentials

// Function to fetch all projects from Contentful
export async function fetchProjects(): Promise<Project[]> {
  // If we don't have valid Contentful credentials, return local data immediately
  if (!contentfulClient) {
    console.log("Using local project data (no Contentful credentials)");
    const { projects } = await import("@/data/projects");
    return projects;
  }
  
  try {
    // This is a mock implementation - in a real app, you would transform
    // Contentful entries to match your Project type
    const response = await contentfulClient.getEntries({
      content_type: "project",
      order: "-sys.createdAt", // Order by created date, newest first
      include: 2, // Include 2 levels of linked references
    });

    // Example transformation of Contentful data to your Project type
    // This would need to be adjusted based on your actual Contentful content model
    /*
    const projects = response.items.map(item => {
      const fields = item.fields as any;
      
      return {
        id: item.sys.id,
        title: fields.title || '',
        slug: fields.slug || '',
        description: fields.description || '',
        longDescription: fields.longDescription || '',
        coverImage: fields.coverImage?.fields?.file?.url 
          ? `https:${fields.coverImage.fields.file.url}` 
          : '',
        images: fields.images?.map((img: any) => 
          `https:${img.fields.file.url}`
        ) || [],
        tags: fields.tags || [],
        technologies: fields.technologies || [],
        demoUrl: fields.demoUrl || undefined,
        githubUrl: fields.githubUrl || undefined,
        videoUrl: fields.videoUrl || undefined,
        year: fields.year || new Date().getFullYear(),
        category: fields.category || '',
        featured: fields.featured || false,
        inProgress: fields.inProgress || false,
      };
    });
    
    return projects;
    */

    // For demo purposes, returning mock data from local file
    // In a real implementation, you would return transformed Contentful data
    const { projects } = await import("@/data/projects");
    return projects;
  } catch (error) {
    console.error("Error fetching projects from Contentful:", error);
    // Fallback to local data if Contentful fetch fails
    const { projects } = await import("@/data/projects");
    return projects;
  }
}

// Function to fetch a single project by slug
export async function fetchProjectBySlug(
  slug: string
): Promise<Project | null> {
  // If we don't have valid Contentful credentials, return local data immediately
  if (!contentfulClient) {
    console.log(`Using local project data for slug ${slug} (no Contentful credentials)`);
    const { projects } = await import("@/data/projects");
    const project = projects.find((p) => p.slug === slug);
    return project || null;
  }
  
  try {
    const response = await contentfulClient.getEntries({
      content_type: "project",
      "fields.slug": slug,
      include: 2,
    });

    if (response.items.length === 0) {
      return null;
    }

    // For demo purposes, using mock data
    const { projects } = await import("@/data/projects");
    const project = projects.find((p) => p.slug === slug);
    return project || null;
  } catch (error) {
    console.error(`Error fetching project with slug ${slug}:`, error);
    // Fallback to local data
    const { projects } = await import("@/data/projects");
    const project = projects.find((p) => p.slug === slug);
    return project || null;
  }
}
