import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import { fetchProjectBySlug, fetchProjects } from '@/lib/contentful';
import { Project } from '@/lib/types';

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await fetchProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
  
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await fetchProjectBySlug(params.slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <>
      <section className="bg-secondary-100 py-8">
        <div className="container">
          <nav className="text-sm mb-4">
            <Link href="/" className="text-primary-600 hover:text-primary-800">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="text-primary-600 hover:text-primary-800">Projects</Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-600">{project.title}</span>
          </nav>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="mb-4">{project.title}</h1>
              <div className="flex items-center gap-4 mb-6">
                {project.inProgress && (
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-800 rounded-full">
                    In Progress
                  </span>
                )}
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                  {project.category}
                </span>
                <span className="text-secondary-500">
                  {project.year}
                </span>
              </div>
              <p className="text-xl text-secondary-700 mb-6">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {project.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary"
                  >
                    GitHub Repository
                  </a>
                )}
              </div>
            </div>
            
            {/* Main Project Image */}
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl mb-12">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
            
            {/* Project Description */}
            <div className="prose max-w-none mb-12">
              <h2>About the Project</h2>
              <p className="text-lg">{project.longDescription}</p>
            </div>
            
            {/* Project Gallery */}
            {project.images.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <ImageGallery images={project.images} altPrefix={project.title} />
              </div>
            )}
            
            {/* Project Video */}
            {project.videoUrl && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Project Demo</h2>
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-lg">
                  <iframe
                    src={project.videoUrl.replace('watch?v=', 'embed/')}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              </div>
            )}
            
            {/* Related Projects */}
            <RelatedProjects currentProject={project} />
          </div>
        </div>
      </section>
    </>
  );
}

// Separate component for related projects to handle data fetching
async function RelatedProjects({ currentProject }: { currentProject: Project }) {
  // Fetch all projects to find related ones
  const allProjects = await fetchProjects();
  
  // Filter related projects by category
  const relatedProjects = allProjects
    .filter(p => p.id !== currentProject.id && p.category === currentProject.category)
    .slice(0, 2);
  
  if (relatedProjects.length === 0) {
    return null;
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedProjects.map((relatedProject) => (
          <div key={relatedProject.id} className="card group">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={relatedProject.coverImage}
                alt={relatedProject.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold mb-2">{relatedProject.title}</h3>
              <p className="text-sm text-secondary-600 mb-4 line-clamp-2">
                {relatedProject.description}
              </p>
              <Link 
                href={`/projects/${relatedProject.slug}`}
                className="text-primary-600 hover:text-primary-800 font-medium"
              >
                View Project →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
