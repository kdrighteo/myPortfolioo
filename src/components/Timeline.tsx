'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TimelineEvent, TimelineEventType } from '@/lib/types';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const [filter, setFilter] = useState<TimelineEventType | 'all'>('all');
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
  
  // Filter events based on selected type
  const filteredEvents = filter === 'all' 
    ? sortedEvents 
    : sortedEvents.filter(event => event.type === filter);
  
  // Get unique years from events for timeline navigation
  const years = [...new Set(sortedEvents.map(event => event.startDate.substring(0, 4)))];
  
  // Scroll to a specific year section
  const scrollToYear = (year: string) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Helper function to format date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString + '-01'); // Add day for proper parsing
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };
  
  // Get icon for event type
  const getEventIcon = (type: TimelineEventType): JSX.Element => {
    switch (type) {
      case 'work':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'education':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 14l9-5-9-5-9 5 9 5z" />
            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        );
      case 'project':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'award':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      case 'certification':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'milestone':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };
  
  // Get color for event type
  const getEventColor = (type: TimelineEventType, isMilestone: boolean = false): string => {
    if (isMilestone) return 'bg-yellow-500';
    
    switch (type) {
      case 'work':
        return 'bg-primary-600';
      case 'education':
        return 'bg-purple-600';
      case 'project':
        return 'bg-blue-600';
      case 'award':
        return 'bg-yellow-600';
      case 'certification':
        return 'bg-green-600';
      case 'milestone':
        return 'bg-yellow-500';
      default:
        return 'bg-secondary-600';
    }
  };
  
  // Get background color for event type (lighter version)
  const getEventBgColor = (type: TimelineEventType, isMilestone: boolean = false): string => {
    if (isMilestone) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
    
    switch (type) {
      case 'work':
        return 'bg-primary-50 dark:bg-primary-900/20 border-primary-500';
      case 'education':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-500';
      case 'project':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-500';
      case 'award':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
      case 'certification':
        return 'bg-green-50 dark:bg-green-900/20 border-green-500';
      case 'milestone':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500';
      default:
        return 'bg-secondary-50 dark:bg-secondary-900/20 border-secondary-500';
    }
  };
  
  return (
    <div className="relative" ref={containerRef}>
      {/* Filter Controls */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('work')}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === 'work'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
          }`}
        >
          Work
        </button>
        <button
          onClick={() => setFilter('education')}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === 'education'
              ? 'bg-purple-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
          }`}
        >
          Education
        </button>
        <button
          onClick={() => setFilter('project')}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === 'project'
              ? 'bg-blue-600 text-white'
              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
          }`}
        >
          Projects
        </button>
        <button
          onClick={() => setFilter('milestone')}
          className={`px-4 py-2 rounded-full text-sm ${
            filter === 'milestone'
              ? 'bg-yellow-500 text-white'
              : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300'
          }`}
        >
          Milestones
        </button>
      </div>
      
      {/* Year Navigation */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => scrollToYear(year)}
            className="px-3 py-1 text-sm bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded hover:bg-secondary-300 dark:hover:bg-secondary-600 transition-colors"
          >
            {year}
          </button>
        ))}
      </div>
      
      {/* Timeline */}
      <div className="relative flex flex-col space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-secondary-300 dark:before:via-secondary-700 before:to-transparent">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => {
            // Get the year and check if it's the first event of that year
            const year = event.startDate.substring(0, 4);
            const isFirstOfYear = index === 0 || filteredEvents[index - 1].startDate.substring(0, 4) !== year;
            
            return (
              <motion.div 
                key={event.id}
                id={isFirstOfYear ? `year-${year}` : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group ${
                  event.isMilestone ? 'z-10' : ''
                }`}
              >
                {/* Year marker - only show for the first event of a year */}
                {isFirstOfYear && (
                  <div className="absolute -top-8 left-0 md:left-1/2 md:-translate-x-1/2 bg-secondary-100 dark:bg-secondary-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    {year}
                  </div>
                )}
                
                {/* Timeline bullet point */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 shadow shrink-0 md:mx-auto z-10 
                  bg-white dark:bg-secondary-800 border-secondary-300 dark:border-secondary-700
                  group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-colors
                  ${event.isMilestone ? 'ring-2 ring-yellow-300 dark:ring-yellow-500/30' : ''}">
                  <span className={`text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400`}>
                    {getEventIcon(event.type)}
                  </span>
                </div>
                
                {/* Event content */}
                <motion.div 
                  className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-lg border ${
                    getEventBgColor(event.type, event.isMilestone)
                  } ${
                    event.isMilestone 
                      ? 'shadow-lg scale-105 md:scale-110 z-10' 
                      : 'shadow-md hover:shadow-lg'
                  } transition-all cursor-pointer`}
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ scale: event.isMilestone ? 1.05 : 1.03 }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className={`px-2 py-0.5 text-xs font-medium text-white rounded-full ${getEventColor(event.type)}`}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                      {formatDate(event.startDate)} - {event.endDate ? (event.endDate === 'present' ? 'Present' : formatDate(event.endDate)) : ''}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-1 dark:text-white">
                    {event.title}
                  </h3>
                  
                  {event.organization && (
                    <div className="font-medium text-primary-600 dark:text-primary-400 mb-1">
                      {event.organization} {event.location && `· ${event.location}`}
                    </div>
                  )}
                  
                  <p className="text-secondary-700 dark:text-secondary-300 text-sm">
                    {event.description}
                  </p>
                  
                  {event.skills && event.skills.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1">
                      {event.skills.slice(0, 3).map((skill) => (
                        <span 
                          key={skill} 
                          className="px-2 py-0.5 text-xs bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {event.skills.length > 3 && (
                        <span className="px-2 py-0.5 text-xs bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded">
                          +{event.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-secondary-700 dark:text-secondary-300 mb-2">No events found</h3>
            <p className="text-secondary-600 dark:text-secondary-400">
              Try selecting a different filter.
            </p>
          </div>
        )}
      </div>
      
      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" 
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  {selectedEvent.image && (
                    <div className="h-48 md:h-64 relative">
                      <Image
                        src={selectedEvent.image}
                        alt={selectedEvent.title}
                        fill
                        className="object-cover rounded-t-xl"
                        sizes="(max-width: 768px) 100vw, 768px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>
                  )}
                  
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-white dark:bg-secondary-700 rounded-full p-1 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-700 dark:text-secondary-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <div className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getEventColor(selectedEvent.type)}`}>
                      {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                    </div>
                    {selectedEvent.isMilestone && (
                      <div className="px-3 py-1 text-sm font-medium text-white rounded-full bg-yellow-500">
                        Milestone
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-2 dark:text-white">
                    {selectedEvent.title}
                  </h2>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
                    {selectedEvent.organization && (
                      <div className="font-medium text-primary-600 dark:text-primary-400">
                        {selectedEvent.organization}
                      </div>
                    )}
                    
                    {selectedEvent.location && (
                      <div className="text-secondary-600 dark:text-secondary-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selectedEvent.location}
                      </div>
                    )}
                    
                    <div className="text-secondary-600 dark:text-secondary-400">
                      {formatDate(selectedEvent.startDate)} - {selectedEvent.endDate ? (selectedEvent.endDate === 'present' ? 'Present' : formatDate(selectedEvent.endDate)) : ''}
                    </div>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none mb-6">
                    <p className="text-lg">{selectedEvent.description}</p>
                    {selectedEvent.details && (
                      <div className="mt-4">
                        <p>{selectedEvent.details}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedEvent.skills && selectedEvent.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2 dark:text-white">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-3 py-1 text-sm bg-secondary-200 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.url && (
                    <div className="mt-6">
                      <Link 
                        href={selectedEvent.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        View More Details
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
