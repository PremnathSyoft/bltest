'use client'

import { useState } from 'react'
import { useBookings, useCreateBooking, useSafetyCompanions, useLocations } from '@/lib/hooks'
import { useToast } from '@/components/Toast'
import { useAuth } from '@/lib/auth-context'

export default function BookingExample() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [selectedCompanion, setSelectedCompanion] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // React Query hooks
  const { data: bookingsData, isLoading: bookingsLoading } = useBookings()
  const { data: companionsData, isLoading: companionsLoading } = useSafetyCompanions()
  const { data: locationsData } = useLocations()
  const createBooking = useCreateBooking()

  const bookings = bookingsData?.data || []
  const companions = companionsData?.data || []
  const locations = locationsData?.data || []

  const handleCreateBooking = async () => {
    if (!user || !selectedCompanion || !selectedDate || !selectedTime) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    try {
      await createBooking.mutateAsync({
        customer_id: user.id,
        companion_id: selectedCompanion,
        slot_id: `${selectedDate}-${selectedTime}`,
        date: selectedDate,
        time: selectedTime,
        total_price: 60,
        paid_amount: 60,
        payment_status: 'pending'
      })
      
      showToast('Booking created successfully!', 'success')
      
      // Reset form
      setSelectedCompanion('')
      setSelectedDate('')
      setSelectedTime('')
    } catch (error) {
      showToast('Failed to create booking', 'error')
      console.error('Booking error:', error)
    }
  }

  if (bookingsLoading || companionsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading...</span>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Book a Safety Companion</h2>
      
      {/* Create Booking Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">New Booking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Safety Companion
            </label>
            <select
              value={selectedCompanion}
              onChange={(e) => setSelectedCompanion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a companion</option>
              {companions.map((companion) => (
                <option key={companion.id} value={companion.id}>
                  {companion.first_name} {companion.last_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time
            </label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleCreateBooking}
          disabled={createBooking.isPending || !selectedCompanion || !selectedDate || !selectedTime}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          {createBooking.isPending ? 'Creating...' : 'Create Booking'}
        </button>
      </div>

      {/* Existing Bookings */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Your Bookings</h3>
        
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No bookings found</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">Booking #{booking.id}</p>
                    <p className="text-sm text-gray-600">
                      Date: {booking.date} at {booking.time}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{booking.payment_status}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${booking.total_price}</p>
                    <p className="text-sm text-gray-600">
                      Paid: ${booking.paid_amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Locations */}
      {locations.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Available Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locations.map((location) => (
              <div key={location.id} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium">{location.name}</h4>
                {location.address && (
                  <p className="text-sm text-gray-600 mt-1">{location.address}</p>
                )}
                {location.city && location.state && (
                  <p className="text-sm text-gray-600">
                    {location.city}, {location.state}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}