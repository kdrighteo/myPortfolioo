import React from "react";
import Image from "next/image";
import Link from "next/link";
import { calculateReadingTime, getReadingTimeClass } from "@/utils/readingTime";

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string; // Full content for reading time calculation
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  date,
  slug,
  author,
  content,
}: BlogCardProps) {
  const readingTime = calculateReadingTime(content);
  const readingTimeClass = getReadingTimeClass(readingTime);

  // Format date
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white dark:bg-secondary-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative h-48 w-full">
          <Image src={coverImage} alt={title} fill className="object-cover" />
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
              <Image
                src={author.avatar}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm text-secondary-600 dark:text-secondary-400">
              {author.name}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <span className="text-secondary-500 dark:text-secondary-400">
              {formattedDate}
            </span>
            <span className={`${readingTimeClass} font-medium`}>
              {readingTime}
            </span>
          </div>
        </div>

        <Link href={`/blog/${slug}`} className="block">
          <h3 className="text-xl font-bold mb-2 text-secondary-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            {title}
          </h3>
        </Link>

        <p className="text-secondary-600 dark:text-secondary-300 mb-4 line-clamp-3">
          {excerpt}
        </p>

        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium transition-colors"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
