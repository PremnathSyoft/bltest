'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
            <Image
  src="/bliss_drive.png"
  alt="BlissDrive Logo"
  className="h-10 w-auto"
  width={0}
  height={0}
  sizes="(max-width: 768px) 120px, 140px"
  priority
/>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
            Drive Confidently with BLISS DRIVE and prepare yourself for future opportunities while ensuring safe driving skills.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-facebook-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-twitter-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-instagram-fill"></i>
                </div>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors cursor-pointer">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-linkedin-fill"></i>
                </div>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/drive-with-us" className="text-gray-400 hover:text-white transition-colors">
                  Drive With Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-phone-line"></i>
                </div>
                +1 (555) 123-4567
              </li>
              <li className="text-gray-400 flex items-center">
                <div className="w-5 h-5 flex items-center justify-center mr-2">
                  <i className="ri-mail-line"></i>
                </div>
                rtcblissdrive@gmail.com
              </li>
              <li className="text-gray-400 flex items-start">
                <div className="w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                  <i className="ri-map-pin-line"></i>
                </div>
                123 Business Ave<br />
                Suite 100<br />
                Tempa, FL 33617
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 BlissDrive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}