import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Portfolio</h3>
            <p className="text-secondary-300 mb-4">
              A showcase of my projects, skills, and experience as a developer.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#projects" className="text-secondary-300 hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-secondary-300 hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-secondary-300 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-secondary-300 hover:text-white transition">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hello@example.com" className="text-secondary-300 hover:text-white transition">
                  hello@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
          <p>© {new Date().getFullYear()} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
