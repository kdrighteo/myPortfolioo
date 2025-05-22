import React from "react";

export default function PortfolioImpact() {
  const impacts = [
    {
      metric: "Web Performance",
      value: "40%",
      project: "E-commerce Dashboard",
      description:
        "Improved loading times through code optimization and lazy loading",
    },
    {
      metric: "User Engagement",
      value: "2x",
      project: "Task Management App",
      description: "Doubled user interaction through improved UI/UX design",
    },
    {
      metric: "Development Speed",
      value: "30%",
      project: "Learning Platform",
      description:
        "Reduced development time with reusable component architecture",
    },
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8 text-center dark:text-white">
          Impact & Results
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impacts.map((impact, index) => (
            <div
              key={index}
              className="bg-white dark:bg-secondary-800 shadow-md rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-4xl font-bold text-primary-600 mb-2">
                {impact.value}
              </h3>
              <p className="text-lg font-medium mt-2 mb-1">{impact.metric}</p>
              <p className="text-secondary-600 font-medium mb-2">
                {impact.project}
              </p>
              <p className="text-secondary-500 text-sm">{impact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
