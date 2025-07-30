'use client';

import DashboardLayout from '../../../../components/DashboardLayout';
import { useState } from 'react';

export default function Support() {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const supportCategories = [
    { id: 'general', name: 'General', icon: 'ri-question-line' },
    { id: 'booking', name: 'Booking Issues', icon: 'ri-car-line' },
    { id: 'payment', name: 'Payment', icon: 'ri-wallet-line' },
    { id: 'technical', name: 'Technical', icon: 'ri-settings-line' }
  ];

  const faqs = [
    {
      question: 'How do I book a ride?',
      answer: 'You can book a ride through our app by entering your pickup location and destination. Choose your preferred service type and confirm your booking.'
    },
    {
      question: 'How do I cancel a ride?',
      answer: 'You can cancel your ride through the app up to 5 minutes after booking without any charges. After that, cancellation fees may apply.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept credit cards, debit cards, digital wallets, and cash payments depending on your location.'
    },
    {
      question: 'How do I track my driver?',
      answer: 'Once your ride is confirmed, you can track your driver in real-time through the app. You\'ll see their location and estimated arrival time.'
    },
    {
      question: 'How do I add a payment method?',
      answer: 'Go to the Payment section in your dashboard and click "Add Card" to add a new payment method to your account.'
    }
  ];

  const supportTickets = [
    {
      id: 'TKT001',
      subject: 'Payment not processed',
      status: 'Open',
      priority: 'High',
      date: '2 hours ago'
    },
    {
      id: 'TKT002',
      subject: 'Driver was late',
      status: 'Resolved',
      priority: 'Medium',
      date: '1 day ago'
    },
    {
      id: 'TKT003',
      subject: 'App not loading',
      status: 'In Progress',
      priority: 'Low',
      date: '3 days ago'
    }
  ];

  return (
    <DashboardLayout userType="customer" userName="John">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Support & Help</h1>
          <p className="text-gray-600">Get help with your account, bookings, and technical issues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Support Form & FAQ */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Support */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Support</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {supportCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setSelectedCategory(category.id)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                          selectedCategory === category.id
                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <div className="flex flex-col items-center space-y-1">
                          <i className={`${category.icon} text-lg`}></i>
                          <span className="text-xs">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your issue"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={6}
                    placeholder="Please describe your issue in detail..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                    maxLength={500}
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">Maximum 500 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer"
                >
                  Submit Support Request
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="group">
                    <summary className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <i className="ri-arrow-down-s-line text-gray-500 transform group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div className="p-4 text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Help & Support Tickets */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Help</h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg mr-3">
                      <i className="ri-phone-line text-blue-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Call Support</p>
                      <p className="text-sm text-gray-500">1-800-BLISS-DR</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg mr-3">
                      <i className="ri-message-line text-green-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg mr-3">
                      <i className="ri-mail-line text-purple-600"></i>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email Support</p>
                      <p className="text-sm text-gray-500">support@blissdrive.com</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Support Tickets</h3>
              
              <div className="space-y-3">
                {supportTickets.map((ticket, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">#{ticket.id}</p>
                        <p className="text-sm text-gray-600">{ticket.subject}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                        ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Priority: {ticket.priority}</span>
                      <span>{ticket.date}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                View All Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}