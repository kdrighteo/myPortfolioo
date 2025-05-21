import { Suspense } from 'react';
import { fetchProjects } from '@/lib/contentful';
import ClientProjects from './client-projects';
import SkeletonCard from '@/components/SkeletonCard';

export default async function Projects() {
  return (
    <>
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="mb-4">My Projects</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            A comprehensive collection of my work, including web apps, mobile apps, and other digital experiences.
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <Suspense fallback={<ProjectsLoadingSkeleton />}>
            <ProjectsList />
          </Suspense>
        </div>
      </section>
    </>
  );
}

// Loading state skeleton
function ProjectsLoadingSkeleton() {
  return (
    <>
      {/* Filter skeleton */}
      <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow-md mb-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          ))}
        </div>
      </div>
      
      {/* Projects grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </>
  );
}

// Projects list with async data fetching
async function ProjectsList() {
  // Fetch projects from Contentful
  const projects = await fetchProjects();
  
  return <ClientProjects initialProjects={projects} />;
}
