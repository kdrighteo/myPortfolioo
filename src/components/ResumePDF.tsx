'use client';

import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font, Image } from '@react-pdf/renderer';
import { skills } from '@/data/skills';

// Register custom fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa25L7SUc.woff2', fontWeight: 700 },
  ]
});

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    padding: 30,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  contact: {
    fontSize: 10,
    color: '#666',
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#f0f0f0',
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  company: {
    fontSize: 11,
    marginBottom: 3,
  },
  date: {
    fontSize: 10,
    color: '#666',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  skillList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e0e0e0',
    padding: '3 8',
    borderRadius: 4,
    marginRight: 5,
    marginBottom: 5,
  },
  skillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

// Resume document component
const ResumePDF = () => (
  <Document
    title="John Doe - Resume"
    author="John Doe"
    subject="Resume"
    keywords="resume, web developer, frontend, react"
  >
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.title}>Senior Frontend Developer</Text>
        <Text style={styles.contact}>johndoe@example.com | (123) 456-7890 | New York, NY</Text>
        <Text style={styles.contact}>github.com/johndoe | linkedin.com/in/johndoe</Text>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.description}>
          Experienced Frontend Developer with 5+ years of expertise in building responsive, accessible, and performant web applications.
          Specialized in React.js and Next.js development with a strong background in TypeScript, modern CSS, and state management.
          Passionate about creating intuitive user experiences and implementing best practices for web development.
        </Text>
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technical Skills</Text>
        
        <View style={styles.skills}>
          <Text style={styles.skillCategory}>Frontend:</Text>
          <View style={styles.skillsRow}>
            {skills.filter(skill => skill.category === 'frontend').slice(0, 8).map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill.name}</Text>
            ))}
          </View>
        </View>
        
        <View style={styles.skills}>
          <Text style={styles.skillCategory}>Backend:</Text>
          <View style={styles.skillsRow}>
            {skills.filter(skill => skill.category === 'backend').slice(0, 5).map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill.name}</Text>
            ))}
          </View>
        </View>
        
        <View style={styles.skills}>
          <Text style={styles.skillCategory}>DevOps & Tools:</Text>
          <View style={styles.skillsRow}>
            {skills.filter(skill => skill.category === 'devops').slice(0, 5).map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill.name}</Text>
            ))}
          </View>
        </View>
      </View>

      {/* Work Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Work Experience</Text>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.jobTitle}>Senior Frontend Developer</Text>
          <Text style={styles.company}>TechCorp Inc.</Text>
          <Text style={styles.date}>January 2022 - Present</Text>
          <Text style={styles.description}>• Led the frontend development team for a SaaS product serving over 10,000 users</Text>
          <Text style={styles.description}>• Implemented performance optimizations resulting in 40% improvement in load times</Text>
          <Text style={styles.description}>• Developed reusable component library reducing development time by 25%</Text>
        </View>
        
        <View style={{ marginBottom: 15 }}>
          <Text style={styles.jobTitle}>Frontend Developer</Text>
          <Text style={styles.company}>WebSolutions Ltd.</Text>
          <Text style={styles.date}>May 2019 - December 2021</Text>
          <Text style={styles.description}>• Developed responsive web applications for various clients using React and Next.js</Text>
          <Text style={styles.description}>• Collaborated with UX designers to implement pixel-perfect interfaces</Text>
          <Text style={styles.description}>• Implemented automated testing, improving code coverage to 80%</Text>
        </View>
        
        <View>
          <Text style={styles.jobTitle}>Junior Web Developer</Text>
          <Text style={styles.company}>DigitalCraft Agency</Text>
          <Text style={styles.date}>June 2017 - April 2019</Text>
          <Text style={styles.description}>• Built and maintained websites for small to medium-sized businesses</Text>
          <Text style={styles.description}>• Implemented responsive designs using modern CSS techniques</Text>
          <Text style={styles.description}>• Assisted in migration of legacy applications to modern frameworks</Text>
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        
        <View>
          <Text style={styles.jobTitle}>Bachelor of Science in Computer Science</Text>
          <Text style={styles.company}>New York University</Text>
          <Text style={styles.date}>2013 - 2017</Text>
          <Text style={styles.description}>GPA: 3.8/4.0</Text>
          <Text style={styles.description}>Relevant Coursework: Web Development, Algorithms, Data Structures, UI/UX Design</Text>
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
      fileName="John_Doe_Resume.pdf"
      className="btn btn-primary flex items-center gap-2"
    >
      {({ blob, url, loading, error }) =>
        loading ? 'Generating PDF...' : 'Download Resume PDF'
      }
    </PDFDownloadLink>
  );
};

export default ResumeDownloadButton;
