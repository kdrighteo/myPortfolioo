import Image from 'next/image';
import SkillsChart from '@/components/SkillsChart';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ProjectAnalytics from '@/components/ProjectAnalytics';
import ResumeDownloadButton from '@/components/ResumePDF';

export const metadata = {
  title: 'About Me | Portfolio',
  description: 'Learn more about my skills, experience, and background as a web developer.',
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="mb-4">About Me</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Learn more about my skills, experience, and journey as a web developer.
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Bio Column */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">My Journey</h2>
              
              <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
                <p>
                  I'm a passionate web developer with a keen eye for design and a love for creating
                  seamless user experiences. With expertise in frontend technologies like React,
                  Next.js, and TypeScript, I build modern, responsive, and accessible web applications.
                </p>
                
                <p>
                  My journey began 5 years ago when I built my first website. Since then, I've worked
                  on numerous projects ranging from small business websites to complex enterprise applications.
                  I've collaborated with talented teams and learned valuable lessons along the way.
                </p>
                
                <p>
                  What drives me is the constant evolution of web technologies and the endless
                  opportunities to learn and grow. I enjoy solving complex problems and turning ideas
                  into reality through clean, efficient code.
                </p>
                
                <p>
                  When I'm not coding, you can find me exploring photography, hiking in the mountains,
                  or contributing to open-source projects. I believe in continuous learning and sharing
                  knowledge with the community.
                </p>
              </div>
              
              <div className="mb-8">
                <ResumeDownloadButton />
              </div>
            </div>
            
            {/* Image Column */}
            <div className="lg:col-span-1 order-1 lg:order-2">
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-4 mb-6">
                <div className="relative h-80 w-full rounded-lg overflow-hidden">
                  <Image
                    src="https://via.placeholder.com/400x600?text=Profile"
                    alt="John Doe"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4 dark:text-white">Details</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-10 shrink-0 text-primary-600 dark:text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="dark:text-white">New York, NY</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 shrink-0 text-primary-600 dark:text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                      </svg>
                    </div>
                    <div className="dark:text-white">contact@example.com</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 shrink-0 text-primary-600 dark:text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="dark:text-white">(123) 456-7890</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 shrink-0 text-primary-600 dark:text-primary-400">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
                      </svg>
                    </div>
                    <div className="dark:text-white">Available for Freelance</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Skills Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">My Skills</h2>
            <SkillsChart />
          </div>
          
          {/* Testimonials Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Testimonials</h2>
            <TestimonialsCarousel />
          </div>
          
          {/* Analytics Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Project Analytics</h2>
            <ProjectAnalytics />
          </div>
        </div>
      </section>
    </>
  );
}
