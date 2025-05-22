"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Font,
  Image,
} from "@react-pdf/renderer";
import { skills } from "@/data/skills";

// Register custom fonts
Font.register({
  family: "Inter",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
      fontWeight: 400,
    },
    {
      src: "https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2",
      fontWeight: 700,
    },
  ],
});

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Inter",
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: "#666",
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    padding: 5,
    backgroundColor: "#f0f0f0",
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: "#666",
    marginBottom: 6,
  },
  description: {
    fontSize: 10,
    marginBottom: 3,
    lineHeight: 1.5,
  },
  skills: {
    marginBottom: 20,
  },
  skillCategory: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  skillList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#e0e0e0",
    padding: "3 8",
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
});

// Resume document component
const ResumePDF = () => (
  <Document
    title="Gilbert Danso - Resume"
    author="Gilbert Danso"
    subject="Resume"
    keywords="resume, web developer, frontend, react, ghana"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>Gilbert Danso</Text>
        <Text style={styles.title}>Web Developer</Text>
        <Text style={styles.contact}>
          kdrighteo@gmail.com | +233 558 644 950 | Ghana
        </Text>
        <Text style={styles.contact}>
          github.com/kdrighteo | linkedin.com/in/gilbert-danso
        </Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>
          Web Developer from Ghana with expertise in building responsive,
          accessible, and modern web applications. Specialized in React.js and
          Next.js development with a strong background in JavaScript,
          TypeScript, and TailwindCSS. Graduate from the University of Ghana
          with professional experience at Tastebuddy and Polymorph Labs.
          Passionate about creating technology solutions that address challenges
          in the African context.
        </Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>

        <View style={styles.skills}>
          <Text style={styles.skillCategory}>Frontend:</Text>
          <View style={styles.skillsRow}>
            {skills
              .filter((skill) => skill.category === "frontend")
              .slice(0, 8)
              .map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.skills}>
          <Text style={styles.skillCategory}>Backend:</Text>
          <View style={styles.skillsRow}>
            {skills
              .filter((skill) => skill.category === "backend")
              .slice(0, 5)
              .map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name}
                </Text>
              ))}
          </View>
        </View>

        <View style={styles.skills}>
          <Text style={styles.skillCategory}>DevOps & Tools:</Text>
          <View style={styles.skillsRow}>
            {skills
              .filter((skill) => skill.category === "devops")
              .slice(0, 5)
              .map((skill, index) => (
                <Text key={index} style={styles.skill}>
                  {skill.name}
                </Text>
              ))}
          </View>
        </View>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.jobTitle}>Web Developer</Text>
          <Text style={styles.company}>Polymorph Labs</Text>
          <Text style={styles.date}>January 2023 - Present</Text>
          <Text style={styles.description}>
            • Developed responsive web applications using React and Next.js
          </Text>
          <Text style={styles.description}>
            • Implemented modern UI components with TailwindCSS and Material UI
          </Text>
          <Text style={styles.description}>
            • Collaborated with design and backend teams to deliver seamless
            user experiences
          </Text>
        </View>

        <View style={{ marginBottom: 15 }}>
          <Text style={styles.jobTitle}>Web Developer</Text>
          <Text style={styles.company}>Tastebuddy</Text>
          <Text style={styles.date}>June 2021 - December 2022</Text>
          <Text style={styles.description}>
            • Developed front-end features for the Tastebuddy platform
          </Text>
          <Text style={styles.description}>
            • Integrated REST APIs for product data and user authentication
          </Text>
          <Text style={styles.description}>
            • Contributed to responsive design implementation for mobile and
            desktop users
          </Text>
        </View>

        <View>
          <Text style={styles.jobTitle}>Freelance Web Developer</Text>
          <Text style={styles.company}>Self-employed</Text>
          <Text style={styles.date}>January 2020 - May 2021</Text>
          <Text style={styles.description}>
            • Built custom websites for local businesses and organizations in
            Ghana
          </Text>
          <Text style={styles.description}>
            • Implemented responsive designs using HTML, CSS, and JavaScript
          </Text>
          <Text style={styles.description}>
            • Provided maintenance and support for client websites
          </Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>

        <View>
          <Text style={styles.jobTitle}>Bachelor's Degree</Text>
          <Text style={styles.company}>University of Ghana</Text>
          <Text style={styles.date}>2016 - 2020</Text>
          <Text style={styles.description}>
            Relevant Coursework: Computer Science, Web Development, Software
            Engineering
          </Text>
          <Text style={styles.description}>
            Activities: Participated in technology clubs and hackathons
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

// PDF Download Button component
const ResumeDownloadButton = () => {
  // Use state to track client-side rendering
  const [isClient, setIsClient] = React.useState(false);

  // Effect to set client-side rendering flag
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render the PDFDownloadLink on the client side
  if (!isClient) {
    return (
      <button className="btn btn-primary flex items-center gap-2">
        Download Resume PDF
      </button>
    );
  }

  // Render actual PDFDownloadLink on client
  return (
    <PDFDownloadLink
      document={<ResumePDF />}
      fileName="Gilbert_Danso_Resume.pdf"
      className="btn btn-primary flex items-center gap-2"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Generating PDF..." : "Download Resume PDF"
      }
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
