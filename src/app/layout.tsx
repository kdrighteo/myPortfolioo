import type { Metadata } from "next";
import "../styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "@/components/ScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
// Uncomment the following line when deploying with Plausible
// import PlausibleAnalytics from '@/components/PlausibleAnalytics';
import PersonSchema from "@/components/StructuredData";
import PerformanceMonitor from "@/components/PerformanceMonitor";

export const metadata: Metadata = {
  title: "Gilbert Danso | Web Developer",
  description:
    "A showcase of projects, skills, and experience by Gilbert Danso, a web developer from Ghana with experience at Tastebuddy and Polymorph Labs.",
  authors: [{ name: "Gilbert Danso" }],
  keywords: [
    "web developer",
    "frontend",
    "Ghana",
    "React",
    "Next.js",
    "TypeScript",
    "Tastebuddy",
    "Polymorph Labs",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gilbertdanso.com", // Replace with your actual domain when deployed
    title: "Gilbert Danso | Web Developer from Ghana",
    description:
      "Web developer from Ghana with experience at Tastebuddy and Polymorph Labs. University of Ghana graduate specializing in React and Next.js.",
    siteName: "Gilbert Danso Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // This will need to be created
        width: 1200,
        height: 630,
        alt: "Gilbert Danso - Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gilbert Danso | Web Developer",
    description:
      "Web developer from Ghana with experience at Tastebuddy and Polymorph Labs.",
    images: ["/images/og-image.jpg"], // This will need to be created
    creator: "@gilbertdanso", // Replace with your Twitter handle if you have one
  },
  verification: {
    google: "google-site-verification-code", // Replace with your verification code when you have one
  },
  alternates: {
    canonical: "https://gilbertdanso.com", // Replace with your actual domain when deployed
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics />
        {/* Uncomment when deploying with Plausible */}
        {/* <PlausibleAnalytics /> */}
        <PersonSchema />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <ScrollToTop />
        {process.env.NODE_ENV === "development" && <PerformanceMonitor />}
      </body>
    </html>
  );
}
