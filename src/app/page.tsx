import { Metadata } from "next";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import ContactForm from "@/components/ContactForm";
import ProfileImage from "@/components/ProfileImage";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Gilbert Danso | Web Developer",
  description:
    "A showcase of projects, skills, and experience by Gilbert Danso, a web developer from Ghana.",
};

export default function Home() {
  // Filter featured projects for the homepage
  const featuredProjects = projects.filter((project) => project.featured);

  // Get unique categories for the filter
  const categories = Array.from(
    new Set(projects.map((project) => project.category)),
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="mb-6 font-bold text-5xl md:text-6xl">
              Gilbert Danso
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Web Developer from Ghana specializing in creating innovative web
              applications with React and Next.js.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="#projects"
                className="btn btn-secondary bg-white text-primary-800 hover:bg-gray-100"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-800"
              >
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
              A collection of my recent work, including web applications, mobile
              apps, and more.
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
              <div className="rounded-lg shadow-xl">
                <ProfileImage
                  containerClassName="h-[500px] w-full rounded-lg"
                  priority={true}
                />
              </div>
            </div>
            <div>
              <h2 className="mb-6">About Me</h2>
              <p className="mb-4 text-lg">
                I'm a passionate web developer from Ghana with expertise in
                building modern web applications. As a graduate from the
                University of Ghana, I've developed strong problem-solving
                skills and have worked with companies like Tastebuddy and
                Polymorph Labs.
              </p>

              <p className="mb-6 text-lg">
                My focus is on creating intuitive, performant, and accessible
                digital experiences that address real-world challenges,
                particularly in the African context.
              </p>

              <h3 className="text-xl font-bold mb-4">Skills & Technologies</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Node.js",
                  "TailwindCSS",
                  "MongoDB",
                  "REST APIs",
                  "Git",
                  "UI/UX",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm"
                  >
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
                Interested in working together? Feel free to reach out to
                discuss your project.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
