'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

// Add custom styles for animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-1000 { animation-delay: 1000ms; }
`;

export default function About() {
  const stats = [
    { number: '10M+', label: 'Happy Customers' },
    { number: '50K+', label: 'Active Drivers' },
    { number: '100+', label: 'Cities Served' },
    { number: '99.9%', label: 'Uptime' }
  ];

  const team = [
    {
      name: 'Ravi Teja Chopparapu',
      role: 'CEO & Founder',
      image: '/images/DummyHuman.jpg'
    },
    {
      name: 'Sai Bhuvana Kurada',
      role: 'Co-Founder & CTO',
      image: '/images/DummyHuman.jpg'
    },
    {
      name: 'Deepika Ramya Sri Tenela',
      role: 'Software Engineer Intern',
      image: '/images/DummyHuman.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{customStyles}</style>
      <Header />
      
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              About BlissDrive
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed animate-fade-in-up delay-300">
              Revolutionizing transportation with 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> innovative technology</span> and 
              exceptional service since 2020.
            </p>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
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
                backgroundImage: `url('/images/AboutUs.jpg')`
              }}>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-semibold text-purple-800 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Our Impact
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in-up delay-200">
              Driving <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Numbers that showcase our commitment to excellence and continuous growth in the transportation industry.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-4">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Our Leadership
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in-up delay-200">
              Meet Our <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              The passionate individuals driving innovation in transportation and shaping the future of mobility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div 
                    className="h-64 bg-cover bg-center bg-no-repeat rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                    style={{backgroundImage: `url('${member.image}')`}}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl group-hover:from-black/30 transition-all duration-300"></div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-float"></div>
            </div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 animate-fade-in-up">
                Join Our <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">Journey</span>
              </h2>
              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed animate-fade-in-up delay-200">
                Be part of the transportation revolution. Whether as a rider or driver, 
                help us build a better future for mobility.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
                <a
                  href="/services"
                  className="group bg-white hover:bg-gray-50 text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Start Riding
                    <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </a>
                <a
                  href="/drive-with-us"
                  className="group bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer backdrop-blur-sm hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center">
                    Become a Driver
                    <i className="ri-steering-line ml-2 group-hover:scale-110 transition-transform duration-300"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}