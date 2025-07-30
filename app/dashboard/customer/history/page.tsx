
'use client';

import DashboardLayout from '../../../../components/DashboardLayout';
import { useState } from 'react';

export default function BookingHistory() {
  const [filter, setFilter] = useState('all');
  type Booking = {
    id: string;
    date: string;
    time: string;
    type: string;
    instructor: string;
    duration: string;
    price: string;
    status: string;
    actualDuration: string | null;
    actualAmount: string | null;
    rating: number | null;
    feedback: string | null;
    pickupLocation: string;
    paymentStatus: string;
  };
  
  const bookingHistory = [
    {
      id: 'BK001',
      date: '2024-01-22',
      time: '09:00 AM - 11:00 AM',
      type: 'Practice Session',
      instructor: 'John Smith',
      duration: '2 hours',
      price: '$120.00',
      status: 'Approved',
      actualDuration: '1h 45m',
      actualAmount: '$105.00',
      rating: 5,
      feedback: 'Great progress on parallel parking and highway merging.',
      pickupLocation: '123 Main St, Downtown',
      paymentStatus: 'Paid'
    },
    {
      id: 'BK002',
      date: '2024-01-20',
      time: '02:00 PM - 04:30 PM',
      type: 'Road Test Prep',
      instructor: 'Sarah Johnson',
      duration: '2.5 hours',
      price: '$245.00',
      status: 'Approved',
      actualDuration: '2h 20m',
      actualAmount: '$228.67',
      rating: 5,
      feedback: 'Ready for road test! Excellent improvement in confidence.',
      pickupLocation: '456 Oak Ave, Suburbs',
      paymentStatus: 'Paid'
    },
    {
      id: 'BK003',
      date: '2024-01-18',
      time: '10:00 AM - 11:00 AM',
      type: 'Practice Session',
      instructor: 'Mike Wilson',
      duration: '1 hour',
      price: '$60.00',
      status: 'Approved',
      actualDuration: '55m',
      actualAmount: '$55.00',
      rating: 4,
      feedback: 'Good work on basic maneuvers. Need more practice with reversing.',
      pickupLocation: '789 Pine Rd, Uptown',
      paymentStatus: 'Paid'
    },
    {
      id: 'BK004',
      date: '2024-01-25',
      time: '03:00 PM - 05:00 PM',
      type: 'Practice Session',
      instructor: 'Lisa Brown',
      duration: '2 hours',
      price: '$120.00',
      status: 'Approved',
      actualDuration: null,
      actualAmount: null,
      rating: null,
      feedback: null,
      pickupLocation: '321 Elm St, Midtown',
      paymentStatus: 'Pending'
    },
    {
      id: 'BK005',
      date: '2024-01-26',
      time: '11:00 AM - 01:00 PM',
      type: 'Road Test Prep',
      instructor: 'Tom Davis',
      duration: '2 hours',
      price: '$196.00',
      status: 'Pending Approval',
      actualDuration: null,
      actualAmount: null,
      rating: null,
      feedback: null,
      pickupLocation: '654 Maple Ave, Eastside',
      paymentStatus: 'Not Started'
    }
  ];

  const filteredHistory = bookingHistory.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'approved') return booking.status === 'Approved';
    if (filter === 'pending') return booking.status === 'Pending Approval';
    if (filter === 'completed') return booking.paymentStatus === 'Paid';
    if (filter === 'practice') return booking.type === 'Practice Session';
    if (filter === 'roadtest') return booking.type === 'Road Test Prep';
    return true;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <i
        key={i}
        className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400`}
      />
    ));
  };

  const startSession = (booking: Booking) => {
    alert(`Starting session for booking ${booking.id}`);
    // Here you would redirect to the session timer page
  };

  const makePayment = (booking: Booking) => {
    alert(`Processing payment for booking ${booking.id}: ${booking.actualAmount || booking.price}`);
    // Here you would redirect to payment page
  };

  return (
    <DashboardLayout userType="customer" userName="John">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Booking History</h1>
          <p className="text-gray-600">View your past and upcoming driving lesson bookings</p>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Bookings' },
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' },
              { value: 'practice', label: 'Practice' },
              { value: 'roadtest', label: 'Road Test Prep' }
            ].map((filterOption) => (
              <button
                key={filterOption.value}
                onClick={() => setFilter(filterOption.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  filter === filterOption.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Cards */}
        <div className="space-y-6">
          {filteredHistory.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                    booking.type === 'Practice Session' ? 'bg-green-100' : 'bg-purple-100'
                  }`}>
                    <i className={`${
                      booking.type === 'Practice Session' ? 'ri-car-line text-green-600' : 'ri-road-map-line text-purple-600'
                    } text-xl`}></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{booking.type}</h3>
                    <p className="text-sm text-gray-500">Booking ID: {booking.id}</p>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'Approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    booking.paymentStatus === 'Paid'
                      ? 'bg-blue-100 text-blue-800'
                      : booking.paymentStatus === 'Pending'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.paymentStatus}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Scheduled Time</p>
                  <p className="text-gray-900">{booking.date}</p>
                  <p className="text-sm text-gray-600">{booking.time}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Instructor</p>
                  <p className="text-gray-900">{booking.instructor}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Duration & Price</p>
                  <p className="text-gray-900">
                    Booked: {booking.duration} 
                    <span className="text-sm font-semibold text-blue-600 ml-2">{booking.price}</span>
                  </p>
                  {booking.actualDuration && (
                    <p className="text-sm text-gray-600">
                      Actual: {booking.actualDuration}
                      <span className="text-sm font-semibold text-green-600 ml-2">{booking.actualAmount}</span>
                    </p>
                  )}
                </div>
                
                <div className="md:col-span-2 lg:col-span-3">
                  <p className="text-sm font-medium text-gray-500 mb-1">Pickup Location</p>
                  <p className="text-gray-900">{booking.pickupLocation}</p>
                </div>
              </div>

              {/* Session Actions */}
              {booking.status === 'Approved' && booking.paymentStatus === 'Pending' && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
                        <i className="ri-timer-line text-blue-600"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-blue-800">Ready to Start Session</p>
                        <p className="text-xs text-blue-600">Click to begin your lesson timer</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => startSession(booking)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Start Session
                    </button>
                  </div>
                </div>
              )}

              {/* Payment Pending */}
              {booking.actualAmount && booking.paymentStatus === 'Pending' && (
                <div className="bg-orange-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-orange-100 rounded-lg">
                        <i className="ri-money-dollar-circle-line text-orange-600"></i>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-orange-800">Payment Required</p>
                        <p className="text-xs text-orange-600">Session completed - {booking.actualAmount}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => makePayment(booking)}
                      className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              )}

              {/* Completed Session Feedback */}
              {booking.paymentStatus === 'Paid' && booking.rating && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Your Rating:</span>
                      <div className="flex space-x-1">
                        {renderStars(booking.rating)}
                      </div>
                    </div>
                  </div>
                  {booking.feedback && (
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Instructor Feedback:</p>
                      <p className="text-sm text-gray-600 italic">&quot;{booking.feedback}&quot;</p>
                    </div>
                  )}
                </div>
              )}

              {/* Pending Approval */}
              {booking.status === 'Pending Approval' && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-time-line text-yellow-600"></i>
                    </div>
                    <span className="text-sm font-medium text-yellow-800">
                      Awaiting admin approval - You&apos;ll be notified once confirmed
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {booking.paymentStatus === 'Paid' && (
                <div className="flex justify-end space-x-3 mt-4">
                  <button className="text-gray-600 hover:text-gray-800 text-sm font-medium cursor-pointer">
                    Download Receipt
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                    Book Again
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-calendar-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters or book your first lesson</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap cursor-pointer">
              Book a Slot
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
