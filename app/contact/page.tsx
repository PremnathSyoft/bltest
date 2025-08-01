'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
      <Header />
      
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/ContactUs.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            We&apos;re here to help. Reach out to us anytime for support, 
            questions, or feedback.
          </p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                  <i className={`${method.icon} text-3xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-3">{method.description}</p>
                <p className="text-blue-600 font-semibold mb-2">{method.contact}</p>
                <p className="text-sm text-gray-500">{method.available}</p>
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