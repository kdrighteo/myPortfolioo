import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Portfolio | Full-Stack Developer',
  description: 'A showcase of my projects, skills, and experience as a developer.',
};

export default function Home() {
  // Filter featured projects for the homepage
  const featuredProjects = projects.filter(project => project.featured);
  
  // Get unique categories for the filter
  const categories = Array.from(new Set(projects.map(project => project.category)));
  
  return (
    <>
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-bold text-5xl md:text-6xl">
              Building Digital Experiences That Matter
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Full-Stack Developer specializing in creating innovative web and mobile applications.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#projects" className="btn btn-secondary bg-white text-primary-800 hover:bg-gray-100">
                View Projects
              </Link>
              <Link href="#contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-800">
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="section bg-secondary-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">My Projects</h2>
            <p className="max-w-2xl mx-auto text-secondary-600">
              A collection of my recent work, including web applications, mobile apps, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/projects" className="btn btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="section bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="relative h-[500px] w-full rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/images/profile.jpg"
                  alt="Developer Profile"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
            <div>
              <h2 className="mb-6">About Me</h2>
              <p className="mb-4 text-lg">
                I'm a passionate full-stack developer with expertise in building modern web and mobile applications.
                With over 5 years of experience, I've worked on a diverse range of projects from e-commerce platforms
                to AI-powered applications.
              </p>
              <p className="mb-6 text-lg">
                My focus is on creating intuitive, performant, and accessible digital experiences that solve real-world problems.
              </p>
              
              <h3 className="text-xl font-bold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              
              <Link href="/about" className="btn btn-primary">
                Learn More About Me
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="section bg-secondary-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">Get In Touch</h2>
              <p className="text-secondary-600">
                Interested in working together? Feel free to reach out to discuss your project.
              </p>
            </div>
            
            <ContactForm />
          </div>
        </div>
      </section>
      
    </>
  );
}
