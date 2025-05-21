'use client';

const SkeletonCard = () => {
  return (
    <div className="card animate-pulse">
      {/* Image placeholder */}
      <div className="h-48 w-full bg-secondary-200 dark:bg-secondary-700"></div>
      
      <div className="p-6">
        {/* Tag placeholders */}
        <div className="flex gap-2 mb-3">
          <div className="h-6 w-16 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
          <div className="h-6 w-20 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        </div>
        
        {/* Title placeholder */}
        <div className="h-7 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded mb-2"></div>
        
        {/* Description placeholder */}
        <div className="h-4 bg-secondary-200 dark:bg-secondary-700 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-secondary-200 dark:bg-secondary-700 rounded mb-4"></div>
        
        {/* Button placeholder */}
        <div className="h-10 w-32 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
