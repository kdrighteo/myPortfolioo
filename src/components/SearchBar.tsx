'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types';
import { projects } from '@/data/projects';

type SearchResult = {
  type: 'project';
  item: Project;
  highlight: 'title' | 'description' | 'tags' | 'technologies';
};

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const router = useRouter();
  
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Focus the input when opening
      setTimeout(() => {
        const input = document.getElementById('search-input');
        if (input) input.focus();
      }, 100);
    }
  };
  
  // Handle search query changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];
    
    // Search in projects
    projects.forEach(project => {
      // Search in title
      if (project.title.toLowerCase().includes(query)) {
        results.push({
          type: 'project',
          item: project,
          highlight: 'title'
        });
      } 
      // Search in description
      else if (project.description.toLowerCase().includes(query)) {
        results.push({
          type: 'project',
          item: project,
          highlight: 'description'
        });
      }
      // Search in tags
      else if (project.tags.some(tag => tag.toLowerCase().includes(query))) {
        results.push({
          type: 'project',
          item: project,
          highlight: 'tags'
        });
      }
      // Search in technologies
      else if (project.technologies.some(tech => tech.toLowerCase().includes(query))) {
        results.push({
          type: 'project',
          item: project,
          highlight: 'technologies'
        });
      }
    });
    
    // Limit results
    setSearchResults(results.slice(0, 6));
  }, [searchQuery]);
  
  // Handle clicking a search result
  const handleResultClick = (result: SearchResult) => {
    if (result.type === 'project') {
      router.push(`/projects/${result.item.slug}`);
      setIsOpen(false);
      setSearchQuery('');
    }
  };
  
  // Close search on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);
  
  return (
    <div className="relative z-50">
      {/* Search Button */}
      <button
        onClick={toggleSearch}
        className="p-2 rounded-full text-secondary-600 hover:text-primary-600 hover:bg-secondary-100 dark:text-secondary-300 dark:hover:text-white dark:hover:bg-secondary-700 transition-colors"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      
      {/* Search Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 500 }}
              className="w-full max-w-2xl mx-auto mt-20 p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white dark:bg-secondary-800 rounded-xl shadow-xl overflow-hidden">
                {/* Search Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    id="search-input"
                    type="text"
                    className="block w-full pl-10 pr-10 py-4 border-0 text-lg focus:ring-0 bg-white dark:bg-secondary-800 dark:text-white"
                    placeholder="Search projects, technologies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Search Results */}
                <div className="max-h-96 overflow-y-auto">
                  {searchResults.length > 0 ? (
                    <ul className="divide-y divide-secondary-100 dark:divide-secondary-700">
                      {searchResults.map((result, index) => (
                        <li key={index}>
                          <button
                            className="w-full text-left px-4 py-3 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors"
                            onClick={() => handleResultClick(result)}
                          >
                            {result.type === 'project' && (
                              <div>
                                <p className="font-medium text-secondary-900 dark:text-white">
                                  {result.item.title}
                                </p>
                                <p className="text-sm text-secondary-500 dark:text-secondary-400 line-clamp-1">
                                  {result.item.description}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {result.item.tags.slice(0, 3).map((tag, idx) => (
                                    <span 
                                      key={idx}
                                      className="text-xs px-1.5 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    searchQuery && (
                      <div className="px-4 py-6 text-center text-secondary-500 dark:text-secondary-400">
                        <p>No results found for "{searchQuery}"</p>
                        <p className="text-sm mt-1">Try a different search term or browse all projects</p>
                      </div>
                    )
                  )}
                </div>
                
                {/* Footer */}
                <div className="px-4 py-3 bg-secondary-50 dark:bg-secondary-900/50 text-xs text-secondary-500 dark:text-secondary-400 flex justify-between">
                  <p>Press ESC to close</p>
                  <p>⏎ to select</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
