export default function ProjectLoading() {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb skeleton */}
      <section className="bg-secondary-100 py-8">
        <div className="container">
          <div className="h-5 w-64 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              {/* Title placeholder */}
              <div className="h-10 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded mb-4"></div>
              
              {/* Tag placeholders */}
              <div className="flex gap-3 mb-6">
                <div className="h-7 w-24 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
                <div className="h-7 w-28 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
              </div>
              
              {/* Description placeholder */}
              <div className="h-6 w-full bg-secondary-200 dark:bg-secondary-700 rounded mb-2"></div>
              <div className="h-6 w-5/6 bg-secondary-200 dark:bg-secondary-700 rounded mb-6"></div>
              
              {/* Technology tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-secondary-200 dark:bg-secondary-700 rounded-full"></div>
                ))}
              </div>
              
              {/* Buttons placeholder */}
              <div className="flex gap-4 mb-8">
                <div className="h-10 w-32 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-10 w-48 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
              </div>
            </div>
            
            {/* Main image placeholder */}
            <div className="h-96 w-full bg-secondary-200 dark:bg-secondary-700 rounded-lg mb-12"></div>
            
            {/* Content placeholders */}
            <div className="mb-12">
              <div className="h-8 w-48 bg-secondary-200 dark:bg-secondary-700 rounded mb-6"></div>
              <div className="space-y-3">
                <div className="h-5 w-full bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-5 w-full bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-5 w-4/5 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-5 w-full bg-secondary-200 dark:bg-secondary-700 rounded"></div>
                <div className="h-5 w-3/4 bg-secondary-200 dark:bg-secondary-700 rounded"></div>
              </div>
            </div>
            
            {/* Gallery placeholders */}
            <div className="mb-12">
              <div className="h-8 w-40 bg-secondary-200 dark:bg-secondary-700 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-64 bg-secondary-200 dark:bg-secondary-700 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
