'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function About() {
  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Active Drivers' },
    { number: '100+', label: 'Cities Served' },
    { number: '99.9%', label: 'Uptime' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20woman%20CEO%20in%20modern%20office%20setting%2C%20confident%20female%20executive%20in%20business%20attire%2C%20corporate%20leadership%20portrait%20with%20clean%20background%2C%20contemporary%20professional%20headshot&width=300&height=400&seq=team-001&orientation=portrait'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://readdy.ai/api/search-image?query=Professional%20technology%20executive%20male%20CTO%20in%20modern%20office%2C%20confident%20tech%20leader%20in%20business%20casual%20attire%2C%20corporate%20technology%20portrait%20with%20clean%20background%2C%20contemporary%20professional%20headshot&width=300&height=400&seq=team-002&orientation=portrait'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://readdy.ai/api/search-image?query=Professional%20business%20woman%20operations%20manager%20in%20modern%20office%2C%20confident%20female%20executive%20in%20professional%20attire%2C%20corporate%20operations%20portrait%20with%20clean%20background%2C%20contemporary%20professional%20headshot&width=300&height=400&seq=team-003&orientation=portrait'
    },
    {
      name: 'David Kim',
      role: 'Head of Safety',
      image: 'https://readdy.ai/api/search-image?query=Professional%20safety%20manager%20male%20executive%20in%20modern%20office%20setting%2C%20confident%20business%20leader%20in%20professional%20attire%2C%20corporate%20safety%20portrait%20with%20clean%20background%2C%20contemporary%20professional%20headshot&width=300&height=400&seq=team-004&orientation=portrait'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Modern%20corporate%20office%20building%20with%20glass%20facade%20and%20professional%20business%20environment%2C%20contemporary%20architecture%20with%20clean%20lines%20and%20urban%20setting%2C%20bright%20daylight%20corporate%20headquarters%20exterior&width=1920&height=800&seq=about-hero-001&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About BlissDrive
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Revolutionizing transportation with innovative technology and 
            exceptional service since 2020.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At BlissDrive, we believe transportation should be accessible, reliable, and safe for everyone. 
                Our mission is to connect communities through innovative mobility solutions that enhance daily life.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We are committed to providing exceptional service while building a sustainable future for transportation. 
                Through cutting-edge technology and dedicated team members, we create experiences that exceed expectations.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mx-auto mb-3">
                    <i className="ri-leaf-line text-2xl text-blue-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900">Eco-Friendly</h3>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mx-auto mb-3">
                    <i className="ri-shield-check-line text-2xl text-green-600"></i>
                  </div>
                  <h3 className="font-semibold text-gray-900">Safety First</h3>
                </div>
              </div>
            </div>
            <div className="h-96 bg-cover bg-center bg-no-repeat rounded-xl shadow-lg"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20rideshare%20team%20working%20together%20in%20bright%20office%20space%2C%20diverse%20group%20of%20professionals%20collaborating%20on%20transportation%20technology%2C%20contemporary%20workplace%20with%20laptops%20and%20modern%20furniture%2C%20teamwork%20and%20innovation&width=600&height=400&seq=mission-001&orientation=landscape')`
              }}>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Numbers that showcase our commitment to excellence and growth.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals driving innovation in transportation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div 
                  className="h-64 bg-cover bg-center bg-no-repeat rounded-xl mb-4 shadow-lg"
                  style={{backgroundImage: `url('${member.image}')`}}
                >
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Our Journey
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Be part of the transportation revolution. Whether as a rider or driver, 
            help us build a better future for mobility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/services" 
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Start Riding
            </a>
            <a 
              href="/drive-with-us" 
              className="bg-transparent hover:bg-blue-700 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
            >
              Become a Driver
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}