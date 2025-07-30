
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import Link from 'next/link';

export default function Home() {
  const services = [
    {
      title: 'Practice Sessions',
      description: 'Book practice driving sessions with experienced instructors to improve your skills',
      icon: 'ri-car-line',
      features: ['Experienced Instructors', 'Flexible Timing', 'Your Own Vehicle', 'Pick-up Service']
    },
    {
      title: 'Road Test Preparation',
      description: 'Get ready for your driving test with specialized preparation sessions',
      icon: 'ri-road-map-line', 
      features: ['Test Route Practice', 'Expert Guidance', 'Confidence Building', 'Mock Tests']
    },
    {
      title: 'Companion Learning',
      description: 'Learn with a friend or family member in a supportive environment',
      icon: 'ri-group-line',
      features: ['Bring a Friend', 'Shared Experience', 'Cost Effective', 'Social Learning']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      
      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Driving Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive driving lesson packages designed to meet your learning needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Driving Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Book your first slot today and take the first step towards becoming a confident driver
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signin"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap"
            >
              Book Your Slott
            </Link>
            <Link
              href="/about"
              className="border-2 border-white hover:bg-white hover:text-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Students Taught</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Pass Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Expert Instructors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
