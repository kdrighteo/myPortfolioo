'use client';

import { useState, useEffect } from 'react';
import ProjectFilter from '@/components/ProjectFilter';
import AnimatedProjectCard from '@/components/AnimatedProjectCard';
import { Project } from '@/lib/types';
import { filterProjects, sortProjects } from '@/lib/utils';

type ClientProjectsProps = {
  initialProjects: Project[];
};

export default function ClientProjects({ initialProjects }: ClientProjectsProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(initialProjects);
  
  // Update filtered projects when initial projects change
  useEffect(() => {
    setFilteredProjects(initialProjects);
  }, [initialProjects]);
  
  // Handle filter changes from the ProjectFilter component
  const handleFilterChange = ({
    category,
    technology,
    sortBy = 'recent',
  }: {
    category?: string;
    technology?: string;
    sortBy?: 'recent' | 'oldest' | 'name';
  }) => {
    // First apply filters
    const filtered = filterProjects(initialProjects, {
      category,
      technology,
    });
    
    // Then sort the filtered results
    const sorted = sortProjects(filtered, sortBy);
    
    setFilteredProjects(sorted);
  };
  
  return (
    <>
      {/* Project Filters */}
      <ProjectFilter 
        projects={initialProjects}
        onFilterChange={handleFilterChange}
      />
      
      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-secondary-700 dark:text-secondary-300 mb-2">No projects found</h3>
          <p className="text-secondary-600 dark:text-secondary-400">
            Try adjusting your filters to find what you're looking for.
          </p>
        </div>
      )}
    </>
  );
}
