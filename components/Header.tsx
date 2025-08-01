'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const getLinkClasses = (path: string, isMobile = false) => {
    const baseClasses = isMobile
      ? "block px-3 py-2 text-base font-medium transition-colors"
      : "px-3 py-2 text-sm font-medium transition-colors";

    const activeClasses = "text-blue-600 font-extrabold border-b-2 border-blue-600";
    const inactiveClasses = "text-gray-700 hover:text-blue-600";

    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <nav className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/bliss_drive.png"
                alt="BlissDrive Logo"
                className="h-10 w-auto"
                width={0}
                height={0}
                sizes="(max-width: 768px) 120px, 140px"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/" className={getLinkClasses('/')}>
                Home
              </Link>
              <Link href="/about" className={getLinkClasses('/about')}>
                About
              </Link>
              <Link href="/services" className={getLinkClasses('/services')}>
                Services
              </Link>
              {/* <Link href="/drive-with-us" className={getLinkClasses('/drive-with-us')}>
                Drive With Us
              </Link> */}
              <Link href="/contact" className={getLinkClasses('/contact')}>
                Contact
              </Link>
              <Link href="/signin" className={`${isActive('/signin') ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer`}>
                Sign In
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
              </div>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link href="/" className={getLinkClasses('/', true)}>
                Home
              </Link>
              <Link href="/about" className={getLinkClasses('/about', true)}>
                About
              </Link>
              <Link href="/services" className={getLinkClasses('/services', true)}>
                Services
              </Link>
              <Link href="/drive-with-us" className={getLinkClasses('/drive-with-us', true)}>
                Drive With Us
              </Link>
              <Link href="/contact" className={getLinkClasses('/contact', true)}>
                Contact
              </Link>
              <Link href="/signin" className={`${isActive('/signin') ? 'bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} text-white block px-3 py-2 rounded-lg text-base font-medium whitespace-nowrap cursor-pointer transition-colors`}>
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}