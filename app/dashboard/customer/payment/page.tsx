
'use client';

import DashboardLayout from '../../../../components/DashboardLayout';
import React, { useState, useEffect } from 'react';

export default function Payment() {

  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  type Session = {
    id: string;
    instructor: string;
    type: string;
    startTime: Date;
    hourlyRate: number;
  };
  


  const transactions = [
    {
      id: 'TXN001',
      date: 'Today, 2:30 PM',
      description: 'Practice Session - 1h 45m',
      amount: '$105.00',
      status: 'Completed',
      instructor: 'John Smith',
      bookingId: 'BK001'
    },
    {
      id: 'TXN002',
      date: 'Dec 20, 4:30 PM',
      description: 'Road Test Prep - 2h 20m',
      amount: '$228.67',
      status: 'Completed',
      instructor: 'Sarah Johnson',
      bookingId: 'BK002'
    },
    {
      id: 'TXN003',
      date: 'Dec 18, 11:00 AM',
      description: 'Practice Session - 55m',
      amount: '$55.00',
      status: 'Completed',
      instructor: 'Mike Wilson',
      bookingId: 'BK003'
    }
  ];

  const startSession = () => {
    setActiveSession({
      id: 'BK004',
      instructor: 'John Smith',
      type: 'Practice Session',
      startTime: new Date(),
      hourlyRate: 60
    });
    setIsTimerRunning(true);
    setSessionTime(0);
  };

  const stopSession = () => {
    setIsTimerRunning(false);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    // const duration = sessionTime / 3600; // Convert to hours
    // const amount = (duration * (activeSession?.hourlyRate || 60)).toFixed(2);

    setShowPaymentModal(false);
    setTimeout(() => {
      setActiveSession(null);
      setSessionTime(0);
      setShowReviewModal(true);
    }, 1000);
  };

  const submitReview = () => {
    alert(`Review submitted! Rating: ${review.rating} stars`);
    setShowReviewModal(false);
    setReview({ rating: 5, comment: '' });
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateAmount = () => {
    if (!activeSession) return '0.00';
    const duration = sessionTime / 3600;
    return (duration * activeSession.hourlyRate).toFixed(2);
  };

  // Timer effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && activeSession) {
      interval = setInterval(() => {
        setSessionTime(prevTime => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, activeSession]);

  return (
    <DashboardLayout userType="customer" userName="John">
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Payment & Sessions</h1>
          <p className="text-gray-600">Manage your payment methods and track active sessions</p>
        </div>

        <div className="space-y-6">
          {/* Active Session Timer */}
          {activeSession ? (
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Active Session</h2>
                <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full">
                  <i className="ri-timer-line text-xl"></i>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-green-100 text-sm mb-1">Session Type: {activeSession.type}</p>
                <p className="text-green-100 text-sm mb-1">Instructor: {activeSession.instructor}</p>
                <p className="text-green-100 text-sm mb-3">Rate: ${activeSession.hourlyRate}/hour</p>

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <p className="text-4xl font-bold font-mono mb-2">{formatTime(sessionTime)}</p>
                  <p className="text-green-100 text-sm">
                    Current Amount: <span className="font-bold text-white">${calculateAmount()}</span>
                  </p>
                </div>
              </div>

              <button
                onClick={stopSession}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors"
              >
                <i className="ri-stop-circle-line mr-2"></i>
                Stop Session & Pay
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-xl p-6 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-200 rounded-full mx-auto mb-4">
                <i className="ri-timer-line text-2xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Session</h3>
              <p className="text-gray-500 mb-4">Start your lesson timer when your approved session begins</p>
              <button
                onClick={startSession}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <i className="ri-play-circle-line mr-2"></i>
                Start Session
              </button>
            </div>
          )}

          {/* Payment History */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment History</h2>

            <div className="space-y-4">
              {transactions.map((transaction, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{transaction.description}</p>
                      <p className="text-xs text-gray-500">Instructor: {transaction.instructor}</p>
                      <p className="text-xs text-gray-500">ID: {transaction.bookingId}</p>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">{transaction.amount}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{transaction.date}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                      {transaction.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
              View All Payments
            </button>
          </div>
        </div>

        {/* Payment Modal */}
        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-money-dollar-circle-line text-3xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Session Completed</h3>
                <p className="text-gray-600">Process payment for your lesson</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{formatTime(sessionTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rate:</span>
                    <span className="text-sm font-medium">${activeSession?.hourlyRate}/hour</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium text-gray-900">Total Amount:</span>
                    <span className="font-bold text-lg text-green-600">${calculateAmount()}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={processPayment}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-3xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Rate Your Lesson</h3>
                <p className="text-gray-600">How was your experience?</p>
              </div>

              <div className="mb-6">
                <div className="flex justify-center space-x-2 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setReview(prev => ({ ...prev, rating: star }))}
                      className={`text-3xl transition-colors ${
                        star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      <i className="ri-star-fill"></i>
                    </button>
                  ))}
                </div>

                <textarea
                  placeholder="Share your experience (optional)"
                  value={review.comment}
                  onChange={(e) => setReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  rows={3}
                  maxLength={500}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Skip
                </button>
                <button
                  onClick={submitReview}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
