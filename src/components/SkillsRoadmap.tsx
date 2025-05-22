import React from "react";

export default function SkillsRoadmap() {
  const skillCategories = [
    {
      category: "Frontend",
      current: ["React", "Next.js", "TypeScript", "TailwindCSS"],
      learning: ["Vue.js", "Framer Motion", "Three.js"],
    },
    {
      category: "Backend",
      current: ["Node.js", "Express", "MongoDB"],
      learning: ["GraphQL", "PostgreSQL", "Microservices"],
    },
    {
      category: "Tools & Practices",
      current: ["Git", "GitHub Actions", "Jest", "Responsive Design"],
      learning: ["AWS", "Docker", "Kubernetes"],
    },
  ];

  return (
    <section className="section bg-secondary-50">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">
          My Skills Roadmap
        </h2>

        <div className="space-y-8">
          {skillCategories.map((cat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-secondary-800 rounded-lg shadow-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-primary-600">
                {cat.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 text-secondary-700 dark:text-secondary-300">
                    Current Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.current.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3 text-secondary-700 dark:text-secondary-300">
                    Learning Next
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {cat.learning.map((skill, j) => (
                      <span
                        key={j}
                        className="px-3 py-1 bg-secondary-100 text-secondary-800 border border-dashed border-secondary-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
