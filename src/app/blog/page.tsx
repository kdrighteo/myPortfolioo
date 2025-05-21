import Link from 'next/link';
import Image from 'next/image';
import { blogPosts } from '@/data/blog';

export const metadata = {
  title: 'Blog | Portfolio',
  description: 'Read my latest articles about web development, design, and technology.',
};

export default function BlogPage() {
  return (
    <>
      <section className="bg-primary-700 text-white py-16">
        <div className="container">
          <h1 className="mb-4">My Blog</h1>
          <p className="text-xl text-primary-100 max-w-2xl">
            Thoughts, ideas, and insights about web development, design, and technology.
          </p>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {blogPosts.map((post) => (
                <article 
                  key={post.id} 
                  className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-800 dark:text-primary-300 rounded mr-2 mb-2"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h2 className="text-xl font-bold mb-2 dark:text-white">
                      {post.title}
                    </h2>
                    
                    <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-sm text-secondary-600 dark:text-secondary-400">
                          {post.author.name}
                        </span>
                      </div>
                      
                      <div className="text-sm text-secondary-500 dark:text-secondary-400">
                        {post.publishDate} · {post.readingTime} min read
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
