"use client";

export default function PersonSchema() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gilbert Danso",
    url: "https://gilbertdanso.com", // Replace with your actual domain when deployed
    email: "kdrighteo@gmail.com",
    telephone: "+233558644950",
    jobTitle: "Web Developer",
    worksFor: [
      {
        "@type": "Organization",
        name: "Polymorph Labs",
      },
      {
        "@type": "Organization",
        name: "Tastebuddy",
      },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Ghana",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "Ghana",
    },
    sameAs: [
      "https://github.com/kdrighteo",
      "https://linkedin.com/in/gilbert-danso", // Update with your actual LinkedIn URL when available
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
