// This script will help search engines like Google understand your content better
// and potentially display rich results in search.
// Include this in your build process.

export const richResults = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://gilbertdanso.com/#website",
      url: "https://gilbertdanso.com/",
      name: "Gilbert Danso",
      description: "Web Developer from Ghana",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: "https://gilbertdanso.com/?s={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      ],
    },
    {
      "@type": "ProfilePage",
      "@id": "https://gilbertdanso.com/#profilepage",
      url: "https://gilbertdanso.com/",
      inLanguage: "en-US",
      name: "Gilbert Danso - Web Developer from Ghana",
      isPartOf: {
        "@id": "https://gilbertdanso.com/#website",
      },
      about: {
        "@id": "https://gilbertdanso.com/#person",
      },
      breadcrumb: {
        "@id": "https://gilbertdanso.com/#breadcrumblist",
      },
      primaryImageOfPage: {
        "@id": "https://gilbertdanso.com/#primaryimage",
      },
      description:
        "Professional portfolio of Gilbert Danso, a web developer from Ghana specializing in React and Next.js",
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://gilbertdanso.com/#breadcrumblist",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": "https://gilbertdanso.com/",
            name: "Home",
          },
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://gilbertdanso.com/#person",
      name: "Gilbert Danso",
      image: "https://gilbertdanso.com/images/profile.jpg",
      url: "https://gilbertdanso.com/",
      jobTitle: "Web Developer",
      worksFor: [
        {
          "@type": "Organization",
          name: "Tastebuddy",
        },
        {
          "@type": "Organization",
          name: "Polymorph Labs",
        },
      ],
      email: "kdrighteo@gmail.com",
      telephone: "+233558644950",
      sameAs: [
        "https://github.com/kdrighteo",
        "https://linkedin.com/in/gilbert-danso",
      ],
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Web Development",
        "Frontend Development",
      ],
    },
    {
      "@type": "ImageObject",
      "@id": "https://gilbertdanso.com/#primaryimage",
      url: "https://gilbertdanso.com/images/profile.jpg",
      width: 1200,
      height: 630,
      caption: "Gilbert Danso - Web Developer",
    },
  ],
};
