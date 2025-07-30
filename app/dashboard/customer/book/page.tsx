
'use client';

import DashboardLayout from '../../../../components/DashboardLayout';
import { useState } from 'react';

export default function BookLesson() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [hasCompanion, setHasCompanion] = useState(false);
  const [step, setStep] = useState(1);
  const [isWaitingApproval, setIsWaitingApproval] = useState(false);
  const [bookingData, setBookingData] = useState({
    companionName: '',
    companionPhone: '',
    termsAccepted: false
  });

  // Duration options (minimum 1 hour to 3 hours)
  const durationOptions = [
    { value: '60', label: '1 hour', minutes: 60 },
    { value: '90', label: '1.5 hours', minutes: 90 },
    { value: '120', label: '2 hours', minutes: 120 },
    { value: '150', label: '2.5 hours', minutes: 150 },
    { value: '180', label: '3 hours', minutes: 180 }
  ];

  // Generate next 3 weeks (21 days)
  const getNext3Weeks = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 21; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        isToday: i === 0
      });
    }
    return days;
  };

  // Generate time slots in grid format based on duration
  const generateTimeSlots = (date: string, duration: string) => {
    if (!duration) return [];

    const slots = [];
    const startHour = 8;
    const endHour = 18;
    const durationMinutes = parseInt(duration);
    const slotInterval = 30; // 30-minute intervals

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotInterval) {
        // Check if slot fits within working hours
        const endTime = new Date(`2024-01-01T${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
        endTime.setMinutes(endTime.getMinutes() + durationMinutes);

        if (endTime.getHours() <= endHour) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          const timeDisplay = new Date(`2024-01-01T${time}`).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          const endTimeDisplay = endTime.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          });

          slots.push({
            id: `${date}-${time}`,
            startTime: timeDisplay,
            endTime: endTimeDisplay,
            available: Math.random() > 0.3 // Random availability for demo
          });
        }
      }
    }
    return slots;
  };

  const savedAddresses = [
    {
      id: '1',
      label: 'Home',
      address: '123 Main Street, Downtown, NY 10001',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      id: '2',
      label: 'Work',
      address: '456 Business Ave, Midtown, NY 10018',
      coordinates: { lat: 40.7589, lng: -73.9851 }
    }
  ];

  const pricePerHour = selectedType === 'practice' ? 60 : 98;
  const selectedDurationObj = durationOptions.find(d => d.value === selectedDuration);
  const estimatedPrice = selectedDurationObj ? ((pricePerHour * selectedDurationObj.minutes) / 60).toFixed(2) : '0';

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setBookingData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1 && selectedSlot && bookingData.termsAccepted) {
      setStep(2);
    } else if (step === 2 && (selectedAddress || newAddress)) {
      setStep(3);
    }
  };

  const handleConfirmBooking = () => {
    setIsWaitingApproval(true);
    setTimeout(() => {
      alert('Booking submitted successfully! Waiting for admin approval.');
      setIsWaitingApproval(false);
    }, 2000);
  };

  const deleteAddress = (addressId: string) => {
    alert(`Address ${addressId} deleted!`);
  };

  return (
    <DashboardLayout userType="customer" userName="John">
      <div className="p-4 md:p-6 min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Book a Slot
              </h1>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
            </div>
            <p className="text-lg text-gray-600 mt-4">Choose your lesson type and schedule your perfect session</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-10">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[
                { num: 1, label: 'Select Type & Slot', icon: 'ri-car-line' },
                { num: 2, label: 'Pickup Location', icon: 'ri-map-pin-line' },
                { num: 3, label: 'Confirm Booking', icon: 'ri-check-line' }
              ].map((stepItem, index) => (
                <div key={stepItem.num} className="flex items-center">
                  <div className={`relative w-14 h-14 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 ${step >= stepItem.num
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-110 animate-pulse'
                      : 'bg-white border-2 border-gray-200 text-gray-400 shadow-md'
                    }`}>
                    {step > stepItem.num ? (
                      <i className="ri-check-line text-xl"></i>
                    ) : (
                      <i className={`${stepItem.icon} text-xl`}></i>
                    )}
                    {step === stepItem.num && (
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full animate-ping opacity-75"></div>
                    )}
                  </div>
                  <div className={`ml-3 transition-all duration-300 ${step >= stepItem.num ? 'text-gray-900' : 'text-gray-400'}`}>
                    <div className="text-xs font-medium">Step {stepItem.num}</div>
                    <div className="text-sm font-bold">{stepItem.label}</div>
                  </div>
                  {index < 2 && (
                    <div className={`w-16 md:w-24 h-1 mx-4 rounded-full transition-all duration-700 ${step > stepItem.num
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-600'
                        : 'bg-gray-200'
                      }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="animate-slide-in-right">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
                {/* Lesson Type Selection */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                    <i className="ri-palette-line mr-3 text-blue-600"></i>
                    Select the Type
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div
                      onClick={() => setSelectedType('practice')}
                      className={`group relative p-8 border-3 rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${selectedType === 'practice'
                          ? 'border-blue-400 bg-gradient-to-br from-blue-50 via-white to-blue-100 shadow-2xl scale-105'
                          : 'border-gray-200 hover:border-blue-300 bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-white'
                        }`}
                    >
                      <div className="absolute top-4 right-4">
                        {selectedType === 'practice' && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        )}
                      </div>

                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${selectedType === 'practice'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white group-hover:from-blue-400 group-hover:to-indigo-500'
                          }`}>
                          <i className="ri-car-line text-3xl"></i>
                        </div>
                        <h4 className="font-bold text-xl text-gray-900 mb-2">Practice Sessions</h4>
                        <p className="text-gray-600 text-sm">Master your driving skills with expert guidance</p>
                      </div>

                      <div className="text-center border-t border-gray-100 pt-4">
                        <div className="text-4xl font-bold text-green-600 mb-1">$60</div>
                        <div className="text-sm text-gray-500 font-medium">per hour</div>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedType('roadtest')}
                      className={`group relative p-8 border-3 rounded-2xl cursor-pointer transition-all duration-500 hover:shadow-2xl transform hover:-translate-y-2 ${selectedType === 'roadtest'
                          ? 'border-purple-400 bg-gradient-to-br from-purple-50 via-white to-purple-100 shadow-2xl scale-105'
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-white'
                        }`}
                    >
                      <div className="absolute top-4 right-4">
                        {selectedType === 'roadtest' && (
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center animate-bounce">
                            <i className="ri-check-line text-white text-sm"></i>
                          </div>
                        )}
                      </div>

                      <div className="text-center mb-6">
                        <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${selectedType === 'roadtest'
                            ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                            : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white group-hover:from-purple-500 group-hover:to-pink-600'
                          }`}>
                          <i className="ri-road-map-line text-3xl"></i>
                        </div>
                        <h4 className="font-bold text-xl text-gray-900 mb-2">Road Test Prep</h4>
                        <p className="text-gray-600 text-sm">Get ready for your driving test with confidence</p>
                      </div>

                      <div className="text-center border-t border-gray-100 pt-4">
                        <div className="text-4xl font-bold text-purple-600 mb-1">$98</div>
                        <div className="text-sm text-gray-500 font-medium">per hour</div>
                      </div>
                    </div>
                  </div>
                </div>

                {selectedType && (
                  <div className="animate-fade-in space-y-10">
                    {/* Date Selection */}
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                        <i className="ri-calendar-line mr-3 text-blue-600"></i>
                        Select Date
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 max-h-96 overflow-y-auto">
                        {getNext3Weeks().map((day) => (
                          <button
                            key={day.date}
                            onClick={() => setSelectedDate(day.date)}
                            className={`relative p-3 md:p-4 border-2 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-105 ${selectedDate === day.date
                                ? 'border-blue-500 bg-gradient-to-b from-blue-50 to-blue-100 text-blue-700 shadow-xl scale-110'
                                : 'border-gray-200 hover:border-blue-300 text-gray-700 hover:shadow-lg bg-white hover:bg-gradient-to-b hover:from-blue-50 hover:to-white'
                              }`}
                          >
                            {day.isToday && (
                              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">Today</span>
                              </div>
                            )}
                            <div className="text-sm text-gray-500 mb-2 font-medium">
                              {day.display.split(' ')[0]}
                            </div>
                            <div className="text-2xl font-bold mb-1">
                              {day.display.split(' ')[2]}
                            </div>
                            <div className="text-sm text-gray-500">
                              {day.display.split(' ')[1]}
                            </div>
                            {selectedDate === day.date && (
                              <div className="absolute inset-0 rounded-2xl bg-blue-400 opacity-10 animate-pulse"></div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Duration Selection */}
                    {selectedDate && (
                      <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                          <i className="ri-time-line mr-3 text-blue-600"></i>
                          Choose Duration
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                          {durationOptions.map((duration) => (
                            <button
                              key={duration.value}
                              onClick={() => setSelectedDuration(duration.value)}
                              className={`relative p-4 border-2 rounded-xl text-center font-medium transition-all duration-300 transform hover:scale-105 ${selectedDuration === duration.value
                                  ? 'border-indigo-500 bg-gradient-to-b from-indigo-50 to-indigo-100 text-indigo-700 shadow-xl scale-105'
                                  : 'border-gray-200 hover:border-indigo-300 text-gray-700 hover:shadow-md bg-white'
                                }`}
                            >
                              <div className="text-lg font-bold">{duration.label}</div>
                              <div className="text-sm text-gray-500 mt-1">
                                ${((pricePerHour * duration.minutes) / 60).toFixed(2)}
                              </div>
                              {selectedDuration === duration.value && (
                                <div className="absolute -top-1 -right-1">
                                  <div className="w-4 h-4 bg-indigo-500 rounded-full flex items-center justify-center">
                                    <i className="ri-check-line text-white text-xs"></i>
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>

                        {selectedDuration && (
                          <div className="mt-4 text-center animate-fade-in">
                            <div className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-xl border border-green-200">
                              <i className="ri-money-dollar-circle-line text-green-600 mr-2"></i>
                              <span className="text-green-800 font-semibold">
                                Estimated Cost: <span className="text-xl">${estimatedPrice}</span>
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Time Slots Grid */}
                    {selectedDate && selectedDuration && (
                      <div className="animate-fade-in">
                        <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">
                          <i className="ri-timer-line mr-3 text-blue-600"></i>
                          Available Time Slots
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {generateTimeSlots(selectedDate, selectedDuration).map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => slot.available && handleSlotSelect(slot.id)}
                              disabled={!slot.available}
                              className={`relative p-4 border-2 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedSlot === slot.id
                                  ? 'border-blue-500 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-xl scale-105'
                                  : slot.available
                                    ? 'border-gray-200 hover:border-blue-300 text-gray-700 bg-white hover:shadow-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
                                    : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                            >
                              <div className="font-bold text-base mb-1">{slot.startTime}</div>
                              <div className="text-xs opacity-80">to {slot.endTime}</div>
                              {selectedDuration && (
                                <div className="text-xs mt-1 opacity-90">
                                  ({selectedDurationObj?.label})
                                </div>
                              )}

                              {!slot.available && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <i className="ri-lock-line text-gray-400"></i>
                                </div>
                              )}

                              {selectedSlot === slot.id && (
                                <div className="absolute -top-1 -right-1">
                                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-bounce">
                                    <i className="ri-check-line text-blue-600 text-sm"></i>
                                  </div>
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Terms & Conditions */}
                    {selectedSlot && (
                      <div className="animate-fade-in">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
                          <label className="flex items-start space-x-4 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={bookingData.termsAccepted}
                              onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                              className="mt-2 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                            />
                            <div className="text-gray-700">
                              <div className="font-semibold mb-2">Terms & Conditions</div>
                              <p className="text-sm leading-relaxed">
                                I agree to the <a href="#" className="text-blue-600 hover:underline font-medium">Terms & Conditions</a> and understand the cancellation policy.
                                I acknowledge that payment will be processed after the lesson based on actual duration.
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNext}
                      disabled={!selectedSlot || !bookingData.termsAccepted}
                      className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-6 px-8 rounded-2xl font-bold text-lg transition-all duration-500 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-2xl"
                    >
                      <div className="flex items-center justify-center">
                        {!selectedSlot || !bookingData.termsAccepted ? (
                          <>
                            <i className="ri-lock-line mr-3"></i>
                            Complete Selection to Continue
                          </>
                        ) : (
                          <>
                            <i className="ri-map-pin-line mr-3"></i>
                            Continue to Pickup Location
                            <i className="ri-arrow-right-line ml-3"></i>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-slide-in-right">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  <i className="ri-map-pin-line mr-3 text-blue-600"></i>
                  Pickup Location
                </h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Address Selection */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Choose Address</h4>

                    {/* Saved Addresses */}
                    <div className="space-y-4 mb-6">
                      {savedAddresses.map((address) => (
                        <div
                          key={address.id}
                          onClick={() => setSelectedAddress(address.id)}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${selectedAddress === address.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300'
                            }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              <div className="w-5 h-5 flex items-center justify-center mt-1">
                                <i className="ri-map-pin-line text-blue-600"></i>
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{address.label}</p>
                                <p className="text-sm text-gray-600">{address.address}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={(e) => { e.stopPropagation(); alert('Edit address'); }}
                                className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              >
                                <i className="ri-edit-line"></i>
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteAddress(address.id); }}
                                className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add New Address */}
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
                      <div className="text-center mb-4">
                        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-2">
                          <i className="ri-add-line text-xl text-gray-500"></i>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Add New Address</p>
                      </div>

                      <textarea
                        rows={3}
                        placeholder="Enter your pickup address..."
                        value={newAddress}
                        onChange={(e) => setNewAddress(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                        maxLength={500}
                      />

                      <button className="mt-3 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                        <i className="ri-map-pin-add-line mr-2"></i>
                        Pin Location on Map
                      </button>
                    </div>

                    {/* Companion Option */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={hasCompanion}
                          onChange={(e) => setHasCompanion(e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-semibold text-gray-800">
                          <i className="ri-user-add-line mr-2 text-blue-600"></i>
                          Add companion during practice
                        </span>
                      </label>

                      {hasCompanion && (
                        <div className="mt-4 space-y-3 animate-fade-in">
                          <input
                            type="text"
                            placeholder="Companion name"
                            value={bookingData.companionName}
                            onChange={(e) => handleInputChange('companionName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                          <input
                            type="tel"
                            placeholder="Companion phone"
                            value={bookingData.companionPhone}
                            onChange={(e) => handleInputChange('companionPhone', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Map Display */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Location Map</h4>
                    <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1642678000000!5m2!1sen!2s"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    {(selectedAddress || newAddress) && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center">
                          <i className="ri-check-circle-line text-green-600 mr-2"></i>
                          <span className="text-sm font-medium text-green-800">
                            Location confirmed on map
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold transition-all duration-200"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!selectedAddress && !newAddress}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300"
                  >
                    Review Booking
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-slide-in-right">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-10 border border-white/50">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                  <i className="ri-check-line mr-3 text-blue-600"></i>
                  Confirm Your Booking
                </h3>

                {/* Booking Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl mb-6 border border-blue-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Lesson Type:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedType === 'practice' ? 'Practice Session' : 'Road Test Prep'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Date & Time:</span>
                        <span className="font-semibold text-gray-900">
                          {selectedDate} at {selectedSlot ? selectedSlot.split('-')[2] : ''}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Duration:</span>
                        <span className="font-semibold text-gray-900">{selectedDurationObj?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Rate:</span>
                        <span className="font-semibold text-blue-600">${pricePerHour}/hour</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-bold text-gray-900">Estimated Cost:</span>
                        <span className="font-bold text-green-600 text-lg">${estimatedPrice}</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Pickup:</span>
                        <span className="font-semibold text-gray-900 text-right max-w-xs">
                          {selectedAddress ? savedAddresses.find(a => a.id === selectedAddress)?.address : newAddress}
                        </span>
                      </div>
                      {hasCompanion && (
                        <div className="flex justify-between">
                          <span className="font-medium text-gray-700">Companion:</span>
                          <span className="font-semibold text-gray-900">{bookingData.companionName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl mb-6 border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <i className="ri-information-line text-yellow-600 mt-1"></i>
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Next Steps:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Your booking will be submitted for admin approval</li>
                        <li>Once approved, you can start the session timer on the scheduled day</li>
                        <li>Payment will be processed based on actual lesson duration</li>
                        <li>You&apos;ll be asked for a review after payment completion</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-4 px-6 rounded-xl font-semibold"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Back
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={isWaitingApproval}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg"
                  >
                    {isWaitingApproval ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <>
                        <i className="ri-check-line mr-2"></i>
                        Confirm Booking
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.7s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
}
