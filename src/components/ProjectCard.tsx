import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/lib/types';

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="card group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {project.tags.map((tag) => (
            <span 
              key={tag} 
              className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 text-primary-800 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-secondary-600 mb-4 line-clamp-2">{project.description}</p>
        <Link 
          href={`/projects/${project.slug}`}
          className="btn btn-primary"
        >
          View Project
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
