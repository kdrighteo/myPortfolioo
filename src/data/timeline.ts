import { TimelineEvent } from "@/lib/types";

export const timelineEvents: TimelineEvent[] = [
  // Work Experience
  {
    id: "job-1",
    title: "Junior Frontend Developer",
    type: "work",
    organization: "TechCorp Inc.",
    location: "New York, NY",
    startDate: "2022-01",
    endDate: "present",
    description: "Leading frontend development for enterprise SaaS products",
    details:
      "Led a team of 5 developers to build and maintain a complex enterprise SaaS platform. Implemented modern frontend architecture using React and TypeScript. Improved performance by 40% and reduced build times by 60%.",
    skills: ["React", "TypeScript", "Next.js", "Redux", "Design Systems"],
    image: "/images/timeline/techcorp.jpg",
    isMilestone: true,
  },
  {
    id: "job-2",
    title: "Frontend Developer",
    type: "work",
    organization: "WebSolutions Ltd.",
    location: "Abuja, Nigeria",
    startDate: "2019-05",
    endDate: "2021-12",
    description: "Developed responsive web applications for various clients",
    details:
      "Built and maintained multiple client websites and web applications. Worked closely with designers to implement pixel-perfect interfaces. Introduced automated testing which improved code quality and reduced bugs by 30%.",
    skills: ["JavaScript", "React", "CSS", "Webpack", "Jest"],
    image: "/images/timeline/websolutions.jpg",
  },
  {
    id: "job-3",
    title: "Junior Web Developer",
    type: "work",
    organization: "DigitalCraft Agency",
    location: "Kumasi, Ghana",
    startDate: "2017-06",
    endDate: "2019-04",
    description: "Built and maintained websites for small to medium businesses",
    details:
      "Developed custom WordPress themes and plugins. Implemented responsive designs for various client websites. Assisted senior developers in larger projects and migrations.",
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "PHP"],
    image: "/images/timeline/digitalcraft.jpg",
  },

  // Education
  {
    id: "edu-1",
    title: "Bachelor of Science in Computer Science",
    type: "education",
    organization: "university of Ghana, Legon",
    location: "Accra, Ghana, Gh",
    startDate: "2018-09",
    endDate: "2022-05",
    description: "Graduated with honors (GPA: 3.0/4.0)",
    details:
      'Specialized in Web Development and UI/UX Design. Completed thesis on "Modern Frontend Architecture Patterns". Active member of the Computer Science Club and participated in multiple hackathons.',
    skills: [
      "Algorithms",
      "Data Structures",
      "Database Design",
      "UI/UX",
      "Web Development",
    ],
    image: "/images/timeline/ug1.jpg",
  },

  // Projects
  {
    id: "project-1",
    title: "E-commerce Platform Redesign",
    type: "project",
    organization: "TechCorp Inc.",
    startDate: "2022-06",
    endDate: "2022-11",
    description: "Complete redesign and rebuild of a major e-commerce platform",
    details:
      "Led the frontend team in a complete redesign of the company's flagship e-commerce platform. Implemented a new design system, improved accessibility, and optimized for mobile. Resulted in a 25% increase in conversion rate and 30% decrease in bounce rate.",
    skills: [
      "React",
      "TypeScript",
      "Redux",
      "Styled Components",
      "Performance Optimization",
    ],
    image: "/images/timeline/ecommerce.jpg",
    url: "https://example.com/ecommerce",
    isMilestone: true,
  },
  {
    id: "project-2",
    title: "Healthcare Dashboard",
    type: "project",
    organization: "WebSolutions Ltd.",
    startDate: "2020-03",
    endDate: "2020-08",
    description: "Real-time analytics dashboard for healthcare providers",
    details:
      "Designed and developed a real-time dashboard for healthcare professionals to monitor patient data and trends. Implemented complex data visualizations and real-time updates with WebSockets.",
    skills: ["React", "D3.js", "WebSockets", "Chart.js", "Firebase"],
    image: "/images/timeline/healthcare.jpg",
    url: "https://example.com/healthcare-dashboard",
  },

  // Awards & Certifications
  {
    id: "award-1",
    title: "Outstanding Technical Achievement Award",
    type: "award",
    organization: "TechCorp Inc.",
    startDate: "2023-06",
    description:
      "Recognized for exceptional contributions to the engineering team",
    details:
      "Awarded for developing an innovative solution that reduced application load time by 60% and improved user engagement significantly.",
    image: "/images/timeline/award.jpg",
    isMilestone: true,
  },
  {
    id: "cert-1",
    title: "AWS Certified Solutions Architect",
    type: "certification",
    organization: "Amazon Web Services",
    startDate: "2021-03",
    description:
      "Professional certification for AWS architecture best practices",
    details:
      "Demonstrated expertise in designing distributed systems and applications on AWS. Mastered concepts in high availability, fault tolerance, and scalable systems.",
    image: "/images/timeline/aws.jpg",
    url: "https://aws.amazon.com/certification/",
  },

  // Milestones
  {
    id: "milestone-1",
    title: "First Open Source Contribution",
    type: "milestone",
    startDate: "2018-05",
    description: "First major contribution to a popular open-source project",
    details:
      "Contributed a significant feature to React Router, which was merged and released in version 4.3. This led to increased visibility in the development community and opportunities to speak at local meetups.",
    skills: ["React", "Open Source", "JavaScript"],
    image: "/images/timeline/opensource.jpg",
    url: "https://github.com/reactjs/react-router",
    isMilestone: true,
  },
  {
    id: "milestone-2",
    title: "Started Tech Blog",
    type: "milestone",
    startDate: "2019-11",
    description:
      "Launched a personal tech blog focusing on frontend development",
    details:
      "Created a technical blog sharing insights and tutorials on modern frontend development. Grew to over 10,000 monthly readers within the first year. Featured on several web development newsletters.",
    skills: ["Technical Writing", "React", "JavaScript", "Web Development"],
    image: "/images/timeline/blog.jpg",
    url: "https://example.com/blog",
    isMilestone: true,
  },
];
