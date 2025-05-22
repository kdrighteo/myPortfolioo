import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-secondary-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Gilbert Danso</h3>
            <p className="text-secondary-300 mb-4">
              Web developer from Ghana with experience at Tastebuddy and
              Polymorph Labs.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#projects"
                  className="text-secondary-300 hover:text-white transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-secondary-300 hover:text-white transition"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-secondary-300 hover:text-white transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/kdrighteo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/gilbert-danso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary-300 hover:text-white transition"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:kdrighteo@gmail.com"
                  className="text-secondary-300 hover:text-white transition"
                >
                  kdrighteo@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+233558644950"
                  className="text-secondary-300 hover:text-white transition"
                >
                  +233 558 644 950
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-secondary-700 mt-8 pt-8 text-center text-secondary-400">
          <p>
            © {new Date().getFullYear()} Gilbert Danso. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
