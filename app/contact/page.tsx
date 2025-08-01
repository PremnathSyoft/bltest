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

export default function Contact() {
  const contactMethods = [
    {
      icon: 'ri-phone-line',
      title: 'Phone Support',
      description: '24/7 customer service',
      contact: '+1 (555) 123-4567',
      available: 'Available 24/7'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@blissdrive.com',
      available: 'Response within 2 hours'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Chat',
      description: 'Instant messaging support',
      contact: 'Chat with us now',
      available: 'Available 24/7'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Visit Us',
      description: 'Our headquarters',
      contact: '123 Business Ave, Suite 100',
      available: 'Mon-Fri 9AM-6PM'
    }
  ];

  const faqItems = [
    {
      question: 'How do I book a ride?',
      answer: 'You can book a ride through our mobile app or website. Simply enter your pickup and destination locations, choose your preferred service type, and confirm your booking.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, digital wallets like Apple Pay and Google Pay, and cash payments for select services.'
    },
    {
      question: 'How do I become a driver?',
      answer: 'To become a driver, you need to meet our requirements, complete the online application, pass a background check, and have your vehicle inspected. Visit our "Drive With Us" page for more details.'
    },
    {
      question: 'What if I need to cancel my ride?',
      answer: 'You can cancel your ride through the app or by calling our support line. Cancellation policies vary depending on timing and service type. Please check our terms for detailed information.'
    },
    {
      question: 'Is BlissDrive available in my area?',
      answer: 'BlissDrive operates in over 100 cities. You can check availability by entering your location in our app or website. We are constantly expanding to new areas.'
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
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed animate-fade-in-up delay-300">
              We&apos;re here to help. Reach out to us anytime for 
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> support, questions, or feedback</span>
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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the best way to reach us. We&apos;re available around the clock to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                    <i className={`${method.icon} text-3xl text-white group-hover:scale-110 transition-transform duration-300`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">{method.description}</p>
                  <p className="text-blue-600 font-bold mb-2 text-lg">{method.contact}</p>
                  <p className="text-sm text-gray-500 font-medium">{method.available}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Have a specific question or feedback? Fill out the form below and 
                we&apos;ll get back to you as soon as possible.
              </p>

              <form id="contact-form" className="space-y-6">
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
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
                  >
                    <option value="">Select a subject</option>
                    <option value="ride-support">Ride Support</option>
                    <option value="driver-support">Driver Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    maxLength={500}
                    required
                    placeholder="Please describe your question or concern in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                  <p className="text-sm text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Location
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Visit our headquarters or find us on the map. We&apos;re located in the heart 
                of the business district with easy access and parking available.
              </p>
              
              <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                <h3 className="text-xl font-semibold mb-4">BlissDrive Headquarters</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 flex items-center justify-center mt-0.5 mr-3">
                      <i className="ri-map-pin-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium">123 Business Avenue</p>
                      <p>Suite 100</p>
                      <p>New York, NY 10001</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center mr-3">
                      <i className="ri-time-line text-blue-600"></i>
                    </div>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 flex items-center justify-center mr-3">
                      <i className="ri-phone-line text-blue-600"></i>
                    </div>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-200 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.697670063714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1687789123456!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions about BlissDrive.
            </p>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}