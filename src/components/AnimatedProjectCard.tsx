'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';

type AnimatedProjectCardProps = {
  project: Project;
  index: number;
};

const AnimatedProjectCard = ({ project, index }: AnimatedProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {project.inProgress && (
          <div className="absolute top-2 right-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
              In Progress
            </span>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {project.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-white">{project.title}</h3>
        <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          <Link 
            href={`/projects/${project.slug}`}
            className="btn btn-primary"
          >
            View Project
          </Link>
          {project.demoUrl && (
            <a 
              href={project.demoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedProjectCard;
