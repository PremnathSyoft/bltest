
'use client';

import Link from 'next/link';
import TypewriterText from './TypewriterText';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/hero-bg.jpg')`
      }}
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Content container with enhanced text highlighting */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Enhanced text container with background and shadow */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
              <span className="block animate-slide-up">Master the Road with Confidence</span>
              <br />
              <span className="text-yellow-400 drop-shadow-2xl bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent block mt-4">
                <TypewriterText 
                  texts={[
                    "Drive Confidently with BLISS",
                    "Learn from Expert Instructors", 
                    "Build Your Driving Skills",
                    "Start Your Journey Today"
                  ]}
                  speed={120}
                  deleteSpeed={80}
                  pauseTime={2500}
                  className="min-h-[1.2em] inline-block"
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/95 drop-shadow-lg font-medium animate-slide-up-delay">
              Gear up for new opportunities with safe driving skills. Professional instruction tailored for international students and individuals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Link
                href="/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-1 animate-bounce-subtle"
              >
                Book Your Slot
              </Link>
              <Link
                href="/services"
                className="border-2 border-white/80 hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 whitespace-nowrap backdrop-blur-sm hover:backdrop-blur-none shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-1 animate-bounce-subtle-delay"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
