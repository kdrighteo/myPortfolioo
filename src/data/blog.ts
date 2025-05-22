import { BlogPost } from "@/lib/types";

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js and TypeScript",
    slug: "getting-started-with-nextjs-typescript",
    excerpt:
      "Learn how to set up a new Next.js project with TypeScript and start building modern web applications.",
    content: `
# Getting Started with Next.js and TypeScript

Next.js is a powerful React framework that enables features such as server-side rendering, static site generation, and more. When combined with TypeScript, it provides a robust development experience with type safety.

## Setting Up Your Project

First, create a new Next.js project with TypeScript:

\`\`\`bash
npx create-next-app@latest my-app --typescript
\`\`\`

This command creates a new Next.js project with TypeScript configuration.

## Project Structure

The generated project structure looks like this:

\`\`\`
my-app/
  ├── pages/
  │   ├── _app.tsx
  │   ├── _document.tsx
  │   ├── index.tsx
  │   └── api/
  ├── public/
  ├── styles/
  ├── next.config.js
  ├── tsconfig.json
  ├── package.json
  └── node_modules/
\`\`\`

## Creating Your First Component

Let's create a simple component in TypeScript:

\`\`\`tsx
// components/Button.tsx
import React from 'react';

interface ButtonProps {
  text: string;
  onClick: () => void;
  color?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, color = 'primary' }) => {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${color}\`}
    >
      {text}
    </button>
  );
};

export default Button;
\`\`\`

## Routing in Next.js

Next.js uses a file-based routing system. To create a new page, simply add a new file to the \`pages\` directory:

\`\`\`tsx
// pages/about.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div>
      <h1>About Us</h1>
      <p>Welcome to our website!</p>
    </div>
  );
};

export default AboutPage;
\`\`\`

## Conclusion

Next.js with TypeScript provides a powerful foundation for building type-safe React applications. The combination offers excellent developer experience and helps catch errors early in the development process.
`,
    coverImage: "/images/blog/nextjs-typescript.jpg",
    publishDate: "2025-03-15",
    tags: ["Next.js", "TypeScript", "React", "Web Development"],
    author: {
      name: "John Doe",
      avatar: "/images/blog/author-john.jpg",
      bio: "Full-stack developer with a passion for React and TypeScript",
    },
    readingTime: 6,
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS for Rapid UI Development",
    slug: "mastering-tailwind-css-rapid-ui-development",
    excerpt:
      "Discover how Tailwind CSS can accelerate your UI development workflow and create beautiful designs without leaving your HTML.",
    content: `
# Mastering Tailwind CSS for Rapid UI Development

Tailwind CSS has revolutionized the way developers approach UI styling. Unlike traditional CSS frameworks like Bootstrap, Tailwind uses a utility-first approach that provides low-level utility classes to build designs directly in your markup.

## Getting Started with Tailwind

To add Tailwind to your project:

\`\`\`bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init
\`\`\`

## Configure Your Tailwind CSS

Create a \`tailwind.config.js\` file:

\`\`\`js
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          // ... other shades
          900: '#0c4a6e',
        },
      },
    },
  },
  plugins: [],
}
\`\`\`

## Utility-First Approach

Instead of writing custom CSS classes, you use utility classes directly in your HTML:

\`\`\`html
<!-- Traditional CSS -->
<div class="card">
  <h2 class="card-title">Title</h2>
  <p class="card-text">Content</p>
</div>

<!-- Tailwind CSS -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h2 class="text-xl font-bold text-gray-800 mb-2">Title</h2>
  <p class="text-gray-600">Content</p>
</div>
\`\`\`

## Responsive Design

Tailwind makes responsive design simple with breakpoint prefixes:

\`\`\`html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- Full width on mobile, half width on medium screens, third width on large screens -->
</div>
\`\`\`

## Dark Mode

Implementing dark mode is straightforward:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-black dark:text-white">
  <!-- Content that works in both light and dark modes -->
</div>
\`\`\`

## Conclusion

Tailwind CSS allows for rapid UI development by providing a comprehensive set of utility classes. While the HTML might initially look more verbose, the development speed and consistency achieved make it a powerful tool in any developer's arsenal.
`,
    coverImage: "/images/blog/tailwind-css.jpg",
    publishDate: "2025-04-02",
    tags: ["CSS", "Tailwind", "UI Design", "Web Development"],
    author: {
      name: "Jane Smith",
      avatar: "/images/blog/author-jane.jpg",
      bio: "UI/UX designer and frontend developer specializing in modern CSS frameworks",
    },
    readingTime: 5,
  },
  {
    id: "3",
    title: "Introduction to Framer Motion for React Animations",
    slug: "introduction-to-framer-motion-react-animations",
    excerpt:
      "Learn how to create stunning animations in your React applications using Framer Motion.",
    content: `
# Introduction to Framer Motion for React Animations

Framer Motion is a powerful animation library for React that makes creating complex animations and interactions simple and declarative.

## Installation

First, add Framer Motion to your project:

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Animation

The simplest way to animate an element is using the \`motion\` component:

\`\`\`tsx
import { motion } from 'framer-motion';

function FadeIn() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      Hello, I'm fading in!
    </motion.div>
  );
}
\`\`\`

## Animation Variants

For more complex animations, use variants:

\`\`\`tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

function StaggeredList() {
  return (
    <motion.ul
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[1, 2, 3, 4, 5].map(index => (
        <motion.li key={index} variants={itemVariants}>
          Item {index}
        </motion.li>
      ))}
    </motion.ul>
  );
}
\`\`\`

## Gesture Animations

Framer Motion also supports gesture animations:

\`\`\`tsx
import { motion } from 'framer-motion';

function DraggableCard() {
  return (
    <motion.div
      drag
      dragConstraints={{
        top: -50,
        left: -50,
        right: 50,
        bottom: 50,
      }}
      whileDrag={{ scale: 1.1 }}
      whileHover={{ scale: 1.05 }}
      className="card"
    >
      Drag me!
    </motion.div>
  );
}
\`\`\`

## Page Transitions

You can create smooth page transitions in Next.js:

\`\`\`tsx
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    x: -200,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 200,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

function Page() {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Page Content</h1>
    </motion.div>
  );
}
\`\`\`

## Conclusion

Framer Motion provides a simple yet powerful API for creating animations in React applications. By using the declarative approach, you can create complex animations with minimal code while maintaining readability and maintainability.
`,
    coverImage: "/images/blog/framer-motion.jpg",
    publishDate: "2025-04-18",
    tags: ["React", "Animation", "Framer Motion", "UI"],
    author: {
      name: "Mark Johnson",
      avatar: "/images/blog/author-mark.jpg",
      bio: "Animation specialist and React developer",
    },
    readingTime: 7,
  },
];
