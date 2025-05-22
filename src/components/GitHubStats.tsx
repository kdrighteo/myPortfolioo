"use client";

import React from "react";
import Image from "next/image";

export default function GitHubStats() {
  // Using your GitHub username from the stored memory
  const githubUsername = "kdrighteo";

  return (
    <section className="section bg-white dark:bg-secondary-900">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">
          GitHub Activity
        </h2>

        <div className="flex flex-col items-center justify-center space-y-6">
          {/* GitHub Stats Card */}
          <div className="bg-white dark:bg-secondary-800 shadow-md rounded-lg p-4 w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4 text-center">
              My GitHub Stats
            </h3>
            <div className="relative w-full h-[160px]">
              <Image
                src={`https://github-readme-stats.vercel.app/api?username=${githubUsername}&show_icons=true&theme=dracula&hide_border=true&count_private=true`}
                alt="GitHub Stats"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Languages Card */}
          <div className="bg-white dark:bg-secondary-800 shadow-md rounded-lg p-4 w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4 text-center">
              Most Used Languages
            </h3>
            <div className="relative w-full h-[160px]">
              <Image
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${githubUsername}&layout=compact&theme=dracula&hide_border=true`}
                alt="Top Languages"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* GitHub Contribution Graph */}
          <div className="bg-white dark:bg-secondary-800 shadow-md rounded-lg p-4 w-full max-w-2xl">
            <h3 className="text-lg font-medium mb-4 text-center">
              Contribution Activity
            </h3>
            <a
              href={`https://github.com/${githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-primary-600 hover:text-primary-800 dark:text-primary-400 transition-colors"
            >
              View my GitHub profile for more details &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
