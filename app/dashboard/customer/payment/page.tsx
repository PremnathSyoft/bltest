
'use client';

import DashboardLayout from '../../../../components/DashboardLayout';
import React, { useState, useEffect } from 'react';

export default function Payment() {

  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [sessionTime, setSessionTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  type Session = {
    id: string;
    instructor: string;
    type: string;
    startTime: Date;
    hourlyRate: number;
  };

  type Coupon = {
    id: string;
    code: string;
    title: string;
    description: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    minAmount: number;
    expiryDate: string;
    isActive: boolean;
  };



  const availableCoupons: Coupon[] = [
    {
      id: 'COUP001',
      code: 'FIRST10',
      title: '10% Off First Session',
      description: 'Get 10% discount on your first driving lesson',
      discountType: 'percentage',
      discountValue: 10,
      minAmount: 0,
      expiryDate: '2025-02-28',
      isActive: true
    },
    {
      id: 'COUP002',
      code: 'SAVE20',
      title: '$20 Off',
      description: 'Save $20 on sessions over $100',
      discountType: 'fixed',
      discountValue: 20,
      minAmount: 100,
      expiryDate: '2025-01-31',
      isActive: true
    },
    {
      id: 'COUP003',
      code: 'STUDENT15',
      title: '15% Student Discount',
      description: 'Special discount for students',
      discountType: 'percentage',
      discountValue: 15,
      minAmount: 50,
      expiryDate: '2025-03-15',
      isActive: true
    },
    {
      id: 'COUP004',
      code: 'WEEKEND25',
      title: '$25 Weekend Special',
      description: 'Weekend sessions discount',
      discountType: 'fixed',
      discountValue: 25,
      minAmount: 150,
      expiryDate: '2025-02-15',
      isActive: false
    }
  ];

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
    const baseAmount = duration * activeSession.hourlyRate;

    if (appliedCoupon) {
      if (baseAmount >= appliedCoupon.minAmount) {
        if (appliedCoupon.discountType === 'percentage') {
          const discount = (baseAmount * appliedCoupon.discountValue) / 100;
          return (baseAmount - discount).toFixed(2);
        } else {
          return (baseAmount - appliedCoupon.discountValue).toFixed(2);
        }
      }
    }

    return baseAmount.toFixed(2);
  };

  const calculateDiscount = () => {
    if (!activeSession || !appliedCoupon) return '0.00';
    const duration = sessionTime / 3600;
    const baseAmount = duration * activeSession.hourlyRate;

    if (baseAmount >= appliedCoupon.minAmount) {
      if (appliedCoupon.discountType === 'percentage') {
        const discount = (baseAmount * appliedCoupon.discountValue) / 100;
        return discount.toFixed(2);
      } else {
        return appliedCoupon.discountValue.toFixed(2);
      }
    }
    return '0.00';
  };

  const getBaseAmount = () => {
    if (!activeSession) return '0.00';
    const duration = sessionTime / 3600;
    return (duration * activeSession.hourlyRate).toFixed(2);
  };

  const applyCoupon = (coupon: Coupon) => {
    const baseAmount = parseFloat(getBaseAmount());
    if (baseAmount >= coupon.minAmount) {
      setAppliedCoupon(coupon);
      setShowCouponModal(false);
    } else {
      alert(`Minimum amount of $${coupon.minAmount} required for this coupon`);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
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
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal:</span>
                    <span className="text-sm font-medium">${getBaseAmount()}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-sm">Discount ({appliedCoupon.code}):</span>
                      <span className="text-sm font-medium">-${calculateDiscount()}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t pt-2">
                    <span className="font-medium text-gray-900">Total Amount:</span>
                    <span className="font-bold text-lg text-green-600">${calculateAmount()}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="mb-6">
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <i className="ri-coupon-line text-green-600 mr-2"></i>
                        <div>
                          <p className="text-sm font-medium text-green-800">{appliedCoupon.title}</p>
                          <p className="text-xs text-green-600">Code: {appliedCoupon.code}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCouponModal(true)}
                    className="w-full bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <i className="ri-coupon-line mr-2"></i>
                    Apply Coupon
                  </button>
                )}
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

        {/* Coupon Modal */}
        {showCouponModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Available Coupons</h3>
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <div className="space-y-4">
                {availableCoupons
                  .filter(coupon => coupon.isActive)
                  .map((coupon) => {
                    const baseAmount = parseFloat(getBaseAmount());
                    const isEligible = baseAmount >= coupon.minAmount;

                    return (
                      <div
                        key={coupon.id}
                        className={`border rounded-lg p-4 ${isEligible
                            ? 'border-green-200 bg-green-50'
                            : 'border-gray-200 bg-gray-50'
                          }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <i className="ri-coupon-line text-lg text-blue-600 mr-2"></i>
                              <h4 className="font-semibold text-gray-900">{coupon.title}</h4>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{coupon.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <span>Code: <span className="font-mono font-medium">{coupon.code}</span></span>
                              <span>Min: ${coupon.minAmount}</span>
                              <span>Expires: {coupon.expiryDate}</span>
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-lg font-bold text-green-600 mb-1">
                              {coupon.discountType === 'percentage'
                                ? `${coupon.discountValue}% OFF`
                                : `$${coupon.discountValue} OFF`
                              }
                            </div>
                            {isEligible ? (
                              <button
                                onClick={() => applyCoupon(coupon)}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                              >
                                Apply
                              </button>
                            ) : (
                              <div className="text-xs text-gray-500">
                                Need ${(coupon.minAmount - baseAmount).toFixed(2)} more
                              </div>
                            )}
                          </div>
                        </div>

                        {isEligible && (
                          <div className="bg-white rounded p-2 text-xs">
                            <div className="flex justify-between">
                              <span>You&apos;ll save:</span>
                              <span className="font-medium text-green-600">
                                ${coupon.discountType === 'percentage'
                                  ? ((baseAmount * coupon.discountValue) / 100).toFixed(2)
                                  : coupon.discountValue.toFixed(2)
                                }
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>

              {availableCoupons.filter(coupon => coupon.isActive).length === 0 && (
                <div className="text-center py-8">
                  <i className="ri-coupon-line text-4xl text-gray-300 mb-4"></i>
                  <p className="text-gray-500">No coupons available at the moment</p>
                </div>
              )}
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
                      className={`text-3xl transition-colors ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
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
