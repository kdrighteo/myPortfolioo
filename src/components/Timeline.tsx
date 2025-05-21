'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TimelineEvent, TimelineEventType } from '@/lib/types';
import { useRouter, useSearchParams } from 'next/navigation';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get filter from URL or default to 'all'
  const initialFilter = searchParams.get('filter') as TimelineEventType | 'all' || 'all';
  const initialYear = searchParams.get('year') || undefined;
  
  const [filter, setFilter] = useState<TimelineEventType | 'all'>(initialFilter);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  
  const containerRef = useRef(null);
  const timelineRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  // Create a parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start start', 'end end']
  });
  
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.2, 1, 1, 0.2]);
  const lineScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  
  // Sort events by date (most recent first)
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });
  
  // Filter events based on selected type
  const filteredEvents = filter === 'all' 
    ? sortedEvents 
    : sortedEvents.filter(event => event.type === filter);
  
  // Get unique years from events for timeline navigation (converting the Set to an Array)
  const yearsArray = sortedEvents
    .map(event => event.startDate.substring(0, 4))
    .filter((year, index, self) => self.indexOf(year) === index);
  
  // Update URL when filter changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === 'all') {
      params.delete('filter');
    } else {
      params.set('filter', filter);
    }
    router.replace(`/career?${params.toString()}`);
  }, [filter, router, searchParams]);
  
  // Scroll to year from URL param when component mounts
  useEffect(() => {
    if (initialYear) {
      setTimeout(() => {
        scrollToYear(initialYear);
      }, 500); // Delay to ensure DOM is ready
    }
  }, [initialYear]);
  
  // Print mode
  useEffect(() => {
    if (isPrinting) {
      window.print();
      // Reset printing state after a delay
      setTimeout(() => setIsPrinting(false), 1000);
    }
  }, [isPrinting]);
  
  // Scroll to a specific year section
  const scrollToYear = useCallback((year: string) => {
    const element = document.getElementById(`year-${year}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update URL with the year
      const params = new URLSearchParams(searchParams.toString());
      params.set('year', year);
      router.replace(`/career?${params.toString()}`, { scroll: false });
    }
  }, [router, searchParams]);
  
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
      
      {/* Year Navigation with Professional Styling */}
      <div className="mb-8 overflow-x-auto pb-2 hide-scrollbar">
        <div className="flex justify-center space-x-1 min-w-max mx-auto max-w-3xl">
          {yearsArray.map((year) => (
            <button
              key={year}
              onClick={() => scrollToYear(year)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all transform hover:scale-105 ${initialYear === year || searchParams.get('year') === year
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-secondary-100 dark:bg-secondary-800 text-secondary-700 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      
      {/* Print Resume Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsPrinting(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print Timeline
        </button>
      </div>
      
      {/* Timeline with Enhanced Animations */}
      <div 
        ref={timelineRef}
        className="relative flex flex-col space-y-8 print:space-y-4 print:my-8 print:py-0"
      >
        {/* Timeline vertical line with parallax effect */}
        <motion.div 
          className="absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 h-full w-0.5 print:hidden"
          style={{ 
            opacity: lineOpacity,
            scaleY: lineScale,
            background: 'linear-gradient(to bottom, transparent, var(--primary-500) 10%, var(--primary-500) 90%, transparent)'
          }}
        />
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
                transition={{ 
                  type: "spring", 
                  damping: 12, 
                  stiffness: 100, 
                  delay: index * 0.08 
                }}
                whileHover={{ scale: 1.01 }}
                className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group print:flex-row print:mb-8 ${
                  event.isMilestone ? 'z-10' : ''
                }`}
              >
                {/* Year marker - only show for the first event of a year */}
                {isFirstOfYear && (
                  <div className="absolute -top-8 left-0 md:left-1/2 md:-translate-x-1/2 bg-secondary-100 dark:bg-secondary-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    {year}
                  </div>
                )}
                
                {/* Timeline bullet point with enhanced styling */}
                <motion.div 
                  className={`flex items-center justify-center w-12 h-12 print:w-10 print:h-10 rounded-full border-2 shadow-md shrink-0 md:mx-auto z-10 
                  bg-white dark:bg-secondary-800 border-secondary-300 dark:border-secondary-700
                  group-hover:border-primary-500 dark:group-hover:border-primary-400 transition-all
                  ${event.isMilestone ? 'ring-4 ring-yellow-300/50 dark:ring-yellow-500/30' : ''}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <span className={`text-secondary-600 dark:text-secondary-400 group-hover:text-primary-600 dark:group-hover:text-primary-400`}>
                    {getEventIcon(event.type)}
                  </span>
                </motion.div>
                
                {/* Event content with enhanced styling */}
                <motion.div 
                  className={`w-[calc(100%-5rem)] md:w-[calc(50%-2.5rem)] p-5 rounded-xl border print:border-secondary-200 print:shadow-none ${
                    getEventBgColor(event.type, event.isMilestone)
                  } ${
                    event.isMilestone 
                      ? 'shadow-xl scale-105 md:scale-110 z-10 border-l-4 border-r-4 border-l-yellow-400 border-r-yellow-400' 
                      : 'shadow-md hover:shadow-xl backdrop-blur-sm'
                  } transition-all cursor-pointer print:w-[calc(100%-5rem)]`}
                  onClick={() => setSelectedEvent(event)}
                  whileHover={{ scale: event.isMilestone ? 1.05 : 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
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
      
      {/* Enhanced Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div 
                className="bg-white dark:bg-secondary-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden" 
                onClick={(e) => e.stopPropagation()}
              >
                {/* Custom scrollbar for modal content */}
                <div className="custom-scrollbar overflow-y-auto max-h-[90vh]">
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
                
                <div className="p-6 pt-0">
                  <div className="sticky top-0 z-10 pt-6 pb-4 bg-white dark:bg-secondary-800 border-b border-secondary-100 dark:border-secondary-700 mb-4 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <div className={`px-3 py-1 text-sm font-medium text-white rounded-full ${getEventColor(selectedEvent.type)}`}>
                        {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                      </div>
                      {selectedEvent.isMilestone && (
                        <div className="px-3 py-1 text-sm font-medium text-white rounded-full bg-yellow-500">
                          Milestone
                        </div>
                      )}
                      
                      <div className="ml-auto text-secondary-600 dark:text-secondary-400 px-3 py-1 text-sm border border-secondary-200 dark:border-secondary-700 rounded-full">
                        {formatDate(selectedEvent.startDate)} - {selectedEvent.endDate ? (selectedEvent.endDate === 'present' ? 'Present' : formatDate(selectedEvent.endDate)) : ''}
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-2 dark:text-white">
                      {selectedEvent.title}
                    </h2>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 mt-2">
                    {selectedEvent.organization && (
                      <div className="font-medium text-primary-600 dark:text-primary-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {selectedEvent.organization}
                      </div>
                    )}
                    
                    {selectedEvent.location && (
                      <div className="text-secondary-600 dark:text-secondary-400 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {selectedEvent.location}
                      </div>
                    )}
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none mb-8 bg-secondary-50 dark:bg-secondary-800/50 p-5 rounded-lg border border-secondary-100 dark:border-secondary-700">
                    <p className="text-lg font-medium mb-2">{selectedEvent.description}</p>
                    {selectedEvent.details && (
                      <div className="mt-3 text-secondary-700 dark:text-secondary-300">
                        <p>{selectedEvent.details}</p>
                      </div>
                    )}
                  </div>
                  
                  {selectedEvent.skills && selectedEvent.skills.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-medium mb-3 dark:text-white flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        Skills &amp; Technologies
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedEvent.skills.map((skill) => (
                          <span 
                            key={skill} 
                            className="px-3 py-1 text-sm bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex justify-between items-center">
                    {selectedEvent.url && (
                      <a 
                        href={selectedEvent.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors shadow-sm"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        View Project Details
                      </a>
                    )}
                    
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="px-4 py-2 border border-secondary-300 dark:border-secondary-600 text-secondary-700 dark:text-secondary-300 rounded-md hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
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
