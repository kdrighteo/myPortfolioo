import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Accessibility Statement | Gilbert Danso",
  description: "Accessibility statement for Gilbert Danso's portfolio website",
};

export default function AccessibilityPage() {
  return (
    <div className="section bg-white dark:bg-secondary-900">
      <div className="container max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Accessibility Statement
        </h1>

        <div className="prose dark:prose-invert max-w-none">
          <p>
            I am committed to ensuring digital accessibility for people with
            disabilities. I am continually improving the user experience for
            everyone and applying the relevant accessibility standards.
          </p>

          <h2>Measures Taken</h2>
          <p>
            This website strives to conform to level AA of the World Wide Web
            Consortium (W3C) Web Content Accessibility Guidelines 2.1. These
            guidelines explain how to make web content more accessible for
            people with disabilities.
          </p>
          <p>
            Conformance with these guidelines helps make the web more
            user-friendly for everyone.
          </p>

          <h2>Features</h2>
          <ul>
            <li>
              Semantic HTML: Using appropriate HTML elements for their intended
              purpose
            </li>
            <li>
              Color contrast: Ensuring sufficient contrast between text and
              background colors
            </li>
            <li>
              Keyboard navigation: All functionality is available using a
              keyboard
            </li>
            <li>
              Screen reader support: Content is structured to work well with
              screen readers
            </li>
            <li>
              Responsive design: Content adapts to different screen sizes and
              zoom levels
            </li>
            <li>Dark mode: Reduces eye strain in low-light environments</li>
            <li>Text alternatives: Images have appropriate alternative text</li>
            <li>Aria attributes: Used where needed to improve accessibility</li>
          </ul>

          <h2>Compatibility</h2>
          <p>This website is designed to be compatible with:</p>
          <ul>
            <li>Recent versions of Chrome, Firefox, Safari, and Edge</li>
            <li>Screen readers including NVDA, VoiceOver, and JAWS</li>
            <li>Mobile and desktop devices with various screen sizes</li>
          </ul>

          <h2>Limitations</h2>
          <p>
            While I strive for the highest level of accessibility possible,
            there may be some areas of the website that are not yet fully
            accessible. I am continuously working to improve these areas.
          </p>

          <h2>Feedback</h2>
          <p>
            I welcome your feedback on the accessibility of this website. If you
            encounter accessibility barriers, please contact me at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:kdrighteo@gmail.com">kdrighteo@gmail.com</a>
            </li>
            <li>
              Phone: <a href="tel:+233558644950">+233558644950</a>
            </li>
          </ul>

          <div className="mt-8">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-800 transition-colors dark:text-primary-400 dark:hover:text-primary-300"
            >
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
