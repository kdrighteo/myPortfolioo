'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';
import SearchBar from './SearchBar';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm py-4 border-b border-secondary-100 shadow-sm">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-2xl font-display font-bold text-primary-600">
          Portfolio
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <SearchBar />
          <ThemeToggle />
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/projects"
                  className={`${pathname.startsWith('/projects') ? 'text-primary-600 font-medium' : 'text-secondary-600'} hover:text-primary-600 transition`}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog"
                  className={`${pathname.startsWith('/blog') ? 'text-primary-600 font-medium' : 'text-secondary-600'} hover:text-primary-600 transition`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className={`${pathname.startsWith('/about') ? 'text-primary-600 font-medium' : 'text-secondary-600'} hover:text-primary-600 transition`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contact"
                  className="text-secondary-600 hover:text-primary-600 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100 transition"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {/* Mobile Menu */}
        <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
