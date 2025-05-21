'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import { getUniqueProjectValues } from '@/lib/utils';

type ProjectFilterProps = {
  projects: Project[];
  onFilterChange: (filters: {
    category?: string;
    technology?: string;
    sortBy?: 'recent' | 'oldest' | 'name';
  }) => void;
};

export default function ProjectFilter({ projects, onFilterChange }: ProjectFilterProps) {
  const [category, setCategory] = useState('');
  const [technology, setTechnology] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'oldest' | 'name'>('recent');
  
  // Get unique categories and technologies for filter options
  const categories = getUniqueProjectValues(projects, 'category');
  const technologies = getUniqueProjectValues(projects, 'technologies');
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange({
      category: category || undefined,
      technology: technology || undefined,
      sortBy,
    });
  }, [category, technology, sortBy, onFilterChange]);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => {
              // Ensure category is treated as a string
              const catString = String(cat);
              return (
                <option key={catString} value={catString}>
                  {catString}
                </option>
              );
            })}
          </select>
        </div>
        
        <div>
          <label htmlFor="technology" className="block text-sm font-medium text-secondary-700 mb-1">
            Technology
          </label>
          <select
            id="technology"
            name="technology"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            className="w-full px-4 py-2 border border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">All Technologies</option>
            {technologies.map((tech) => {
              // Ensure tech is treated as a string
              const techString = String(tech);
              return (
                <option key={techString} value={techString}>
                  {techString}
                </option>
              );
            })}
          </select>
        </div>
        
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-secondary-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            name="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest' | 'name')}
            className="w-full px-4 py-2 border border-secondary-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
