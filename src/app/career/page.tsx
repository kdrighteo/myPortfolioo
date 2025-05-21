import { Suspense } from 'react';
import Timeline from '@/components/Timeline';
import { timelineEvents } from '@/data/timeline';

export const metadata = {
  title: 'Career Timeline | Portfolio',
  description: 'Explore my professional journey, key projects, and achievements over the years.',
};

export default function CareerPage() {
  return (
    <>
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="mb-4">Career Timeline</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Explore my professional journey, key projects, and achievements over the years.
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">My Professional Journey</h2>
              <p className="text-secondary-700 dark:text-secondary-300 mb-4">
                This interactive timeline showcases my professional experience, education, key projects, and career milestones. 
                Use the filters to focus on specific aspects of my journey or navigate by year to explore different periods.
              </p>
              <p className="text-secondary-700 dark:text-secondary-300">
                Click on any event to view more details about that experience, including skills used, detailed descriptions, and related links.
              </p>
            </div>
            
            <Suspense fallback={<div className="p-8 text-center">Loading timeline...</div>}>
              <Timeline events={timelineEvents} />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
