'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      <Header />
      
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://readdy.ai/api/search-image?query=Happy%20professional%20rideshare%20driver%20in%20car%20holding%20smartphone%20with%20driver%20app%2C%20smiling%20person%20behind%20steering%20wheel%20of%20clean%20modern%20vehicle%2C%20successful%20transportation%20entrepreneur%20earning%20money&width=1920&height=800&seq=drive-hero-001&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Drive With BlissDrive
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Turn your car into a money-making opportunity. Join thousands of drivers 
            earning flexible income on their own terms.
          </p>
          <a 
            href="#apply" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer inline-block"
          >
            Start Your Application
          </a>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                  <i className={`${benefit.icon} text-3xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
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
                backgroundImage: `url('https://readdy.ai/api/search-image?query=Professional%20rideshare%20driver%20checking%20vehicle%20documents%20and%20smartphone%20app%2C%20person%20reviewing%20driver%20requirements%20and%20safety%20checklist%2C%20modern%20car%20interior%20with%20paperwork%20and%20mobile%20technology&width=600&height=400&seq=requirements-001&orientation=landscape')`
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