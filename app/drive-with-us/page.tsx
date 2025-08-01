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

export default function DriveWithUs() {
  const benefits = [
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Flexible Earnings',
      description: 'Earn money on your own schedule. Drive when you want, where you want.'
    },
    {
      icon: 'ri-time-line',
      title: 'Set Your Hours',
      description: 'Complete control over your work schedule. Perfect for full-time or part-time income.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Safety Support',
      description: 'Comprehensive insurance coverage and 24/7 safety support for all drivers.'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Easy to Use App',
      description: 'User-friendly driver app with navigation, trip tracking, and earnings dashboard.'
    }
  ];

  const requirements = [
    'Valid driver\'s license for at least 1 year',
    'Vehicle registration and insurance',
    'Clean driving record',
    'Pass background check',
    'Vehicle inspection (we can help arrange this)',
    'Smartphone with GPS capability'
  ];

  const steps = [
    {
      number: '01',
      title: 'Apply Online',
      description: 'Fill out our simple online application form with your basic information.'
    },
    {
      number: '02',
      title: 'Upload Documents',
      description: 'Submit your license, insurance, and vehicle registration documents.'
    },
    {
      number: '03',
      title: 'Background Check',
      description: 'We\'ll run a comprehensive background check for safety verification.'
    },
    {
      number: '04',
      title: 'Vehicle Inspection',
      description: 'Schedule a quick vehicle inspection at one of our partner locations.'
    },
    {
      number: '05',
      title: 'Get Approved',
      description: 'Once approved, download the driver app and start earning immediately.'
    }
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{customStyles}</style>
      <Header />
      
      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
              Drive With BlissDrive
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed mb-10 animate-fade-in-up delay-300">
              Turn your car into a 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> money-making opportunity</span>. 
              Join thousands of drivers earning flexible income on their own terms.
            </p>
            <a 
              href="#apply" 
              className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer inline-block shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105 animate-fade-in-up delay-500"
            >
              <span className="flex items-center justify-center">
                Start Your Application
                <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
              </span>
            </a>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Drive With Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enjoy the benefits of being your own boss while helping your community get around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                    <i className={`${benefit.icon} text-3xl text-white group-hover:scale-110 transition-transform duration-300`}></i>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Driver Requirements
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We want to ensure the safety and quality of our service. Here are the basic 
                requirements to become a BlissDrive driver:
              </p>
              <ul className="space-y-3">
                {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full mt-0.5 mr-3 flex-shrink-0">
                      <i className="ri-check-line text-green-600"></i>
                    </div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div 
              className="h-96 bg-cover bg-center bg-no-repeat rounded-xl shadow-lg"
              style={{
                backgroundImage: `url('/images/DriveWithUs.jpg')`
              }}
            >
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these simple steps to become a BlissDrive driver and start earning.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-600 text-white rounded-full text-xl font-bold flex-shrink-0">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Driving?
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join our community of drivers and start earning on your own schedule today.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8">
            <form id="driver-application" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Make/Model *
                  </label>
                  <input
                    type="text"
                    id="vehicle"
                    name="vehicle"
                    required
                    placeholder="e.g., Toyota Camry 2020"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                  Driving Experience
                </label>
                <textarea
                  id="experience"
                  name="experience"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about your driving experience and why you want to drive with BlissDrive..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="mt-1 mr-3"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the BlissDrive Driver Terms of Service and Privacy Policy, 
                  and consent to background check and vehicle inspection.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}