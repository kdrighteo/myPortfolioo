import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import BlogContent from '@/components/BlogContent';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
  
  return {
    title: `${post.title} | Portfolio Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  // Find related posts (posts with at least one matching tag)
  const relatedPosts = blogPosts
    .filter(
      (relatedPost) => 
        relatedPost.id !== post.id && 
        relatedPost.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, 2);
  
  return (
    <>
      <section className="bg-secondary-100 dark:bg-secondary-900 py-8">
        <div className="container">
          <nav className="text-sm mb-4">
            <Link href="/" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-300">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-secondary-600 dark:text-secondary-400">{post.title}</span>
          </nav>
        </div>
      </section>
      
      <section className="section">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/50 text-primary-800 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">{post.title}</h1>
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium dark:text-white">{post.author.name}</div>
                    <div className="text-sm text-secondary-600 dark:text-secondary-400">
                      {post.author.bio}
                    </div>
                  </div>
                </div>
                
                <div className="text-secondary-600 dark:text-secondary-400 text-sm">
                  Published on {post.publishDate} · {post.readingTime} min read
                </div>
              </div>
            </div>
            
            {/* Featured Image */}
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-xl mb-10">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
            </div>
            
            {/* Post Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <BlogContent content={post.content} />
            </div>
            
            {/* Author Bio */}
            <div className="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-6 mb-12">
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1 dark:text-white">About {post.author.name}</h3>
                  <p className="text-secondary-600 dark:text-secondary-300">{post.author.bio}</p>
                </div>
              </div>
            </div>
            
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 dark:text-white">Related Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="card group">
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={relatedPost.coverImage}
                          alt={relatedPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-2 dark:text-white">{relatedPost.title}</h3>
                        <p className="text-sm text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <Link 
                          href={`/blog/${relatedPost.slug}`}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium"
                        >
                          Read Article →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
