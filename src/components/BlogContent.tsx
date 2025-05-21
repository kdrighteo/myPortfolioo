'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogContentProps {
  content: string;
}

const BlogContent: React.FC<BlogContentProps> = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
        h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
        h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-5 mb-2" {...props} />,
        p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4" {...props} />,
        ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4" {...props} />,
        li: ({ node, ...props }) => <li className="mb-1" {...props} />,
        a: ({ node, ...props }) => (
          <a className="text-primary-600 hover:text-primary-800 underline" {...props} />
        ),
        blockquote: ({ node, ...props }) => (
          <blockquote className="border-l-4 border-secondary-300 pl-4 py-1 italic" {...props} />
        ),
        code: ({ node, inline, ...props }) => 
          inline ? (
            <code className="bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded font-mono text-sm" {...props} />
          ) : (
            <code className="block bg-secondary-100 dark:bg-secondary-800 p-4 rounded font-mono text-sm overflow-x-auto my-4" {...props} />
          ),
        pre: ({ node, ...props }) => <pre className="bg-transparent p-0 overflow-x-auto" {...props} />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default BlogContent;
