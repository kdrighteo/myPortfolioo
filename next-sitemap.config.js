/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://gilbertdanso.com", // Replace with your actual domain when deployed
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://gilbertdanso.com/server-sitemap.xml", // Replace with your actual domain
    ],
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  exclude: ["/404", "/500"],
  changefreq: "weekly",
  priority: 0.7,
};
