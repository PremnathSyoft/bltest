'use client'

import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/lib/auth-context'
import { useCompanionAvailability, useSetCompanionAvailability } from '@/lib/hooks/useSafetyCompanions'
import { useState, useEffect } from 'react'

const DAYS = [
  { key: 'Monday', label: 'Monday' },
  { key: 'Tuesday', label: 'Tuesday' },
  { key: 'Wednesday', label: 'Wednesday' },
  { key: 'Thursday', label: 'Thursday' },
  { key: 'Friday', label: 'Friday' },
  { key: 'Saturday', label: 'Saturday' },
  { key: 'Sunday', label: 'Sunday' }
]

interface DayAvailability {
  day_of_week: string
  is_available: boolean
  slots: Array<{ start: string; end: string }>
}

// Modal Component
function AvailabilityModal({ 
  isOpen, 
  onClose, 
  availability, 
  onSave, 
  isSaving 
}: {
  isOpen: boolean
  onClose: () => void
  availability: DayAvailability[]
  onSave: (data: DayAvailability[]) => void
  isSaving: boolean
}) {
  const [localAvail, setLocalAvail] = useState<DayAvailability[]>(availability)

  useEffect(() => {
    setLocalAvail(availability)
  }, [availability])

  const toggleDayAvailability = (day: string) => {
    setLocalAvail(prev => prev.map(d => 
      d.day_of_week === day 
        ? { ...d, is_available: !d.is_available, slots: d.is_available ? [] : d.slots }
        : d
    ))
  }

  const addSlot = (day: string) => {
    setLocalAvail(prev => prev.map(d => {
      if (d.day_of_week === day) {
        return {
          ...d,
          is_available: true,
          slots: [...d.slots, { start: '09:00', end: '10:00' }]
        }
      }
      return d
    }))
  }

  const updateSlot = (day: string, idx: number, field: 'start' | 'end', value: string) => {
    setLocalAvail(prev => prev.map(d => 
      d.day_of_week === day 
        ? { 
            ...d, 
            slots: d.slots.map((s, i) => 
              i === idx ? { ...s, [field]: value } : s
            ) 
          }
        : d
    ))
  }

  const removeSlot = (day: string, idx: number) => {
    setLocalAvail(prev => prev.map(d => 
      d.day_of_week === day 
        ? { ...d, slots: d.slots.filter((_, i) => i !== idx) }
        : d
    ))
  }

  const handleSave = () => {
    onSave(localAvail)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Manage Availability Schedule</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">Set weekly availability and time slots for this companion</p>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {DAYS.map(day => {
              const dayData = localAvail.find(d => d.day_of_week === day.key)
              const isAvailable = dayData?.is_available ?? true
              
              return (
                <div key={day.key} className={`border rounded-xl p-4 transition-all duration-200 ${
                  isAvailable 
                    ? 'border-blue-200 bg-blue-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <h3 className={`font-semibold text-lg ${
                        isAvailable ? 'text-blue-900' : 'text-gray-500'
                      }`}>
                        {day.label}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`modal-available-${day.key}`}
                          checked={isAvailable}
                          onChange={() => toggleDayAvailability(day.key)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label 
                          htmlFor={`modal-available-${day.key}`}
                          className={`text-sm font-medium ${
                            isAvailable ? 'text-blue-700' : 'text-gray-500'
                          }`}
                        >
                          Available
                        </label>
                      </div>
                    </div>
                    {isAvailable && (
                      <button 
                        onClick={() => addSlot(day.key)} 
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        + Add Slot
                      </button>
                    )}
                  </div>
                  
                  {isAvailable ? (
                    <div className="space-y-3">
                      {(dayData?.slots || []).map((slot, idx) => (
                        <div key={idx} className="flex items-center space-x-2 p-3 bg-white rounded-lg border border-blue-200">
                          <input 
                            type="time" 
                            value={slot.start} 
                            onChange={(e) => updateSlot(day.key, idx, 'start', e.target.value)} 
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          />
                          <span className="text-gray-500 text-sm">to</span>
                          <input 
                            type="time" 
                            value={slot.end} 
                            onChange={(e) => updateSlot(day.key, idx, 'end', e.target.value)} 
                            className="border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                          />
                          <button 
                            onClick={() => removeSlot(day.key, idx)} 
                            className="px-2 py-1 text-sm text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {(!dayData || dayData.slots.length === 0) && (
                        <div className="text-center py-4 text-gray-500 bg-white rounded-lg border-2 border-dashed border-gray-300">
                          <p className="text-sm">No time slots</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">Day unavailable</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {localAvail.filter(d => d.is_available).length} of 7 days available
            </div>
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Schedule'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CompanionAvailabilityPage() {
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const companionId = params?.id
  const { data, isLoading, error } = useCompanionAvailability(companionId || '')
  const setAvailMutation = useSetCompanionAvailability()

  const [localAvail, setLocalAvail] = useState<DayAvailability[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Initialize local state when data loads or component mounts
  useEffect(() => {
    if (!isLoading && data) {
      if (Array.isArray((data as any)?.data) && (data as any).data.length > 0) {
        setLocalAvail((data as any).data.map((item: any) => ({
          day_of_week: item.day_of_week,
          is_available: item.is_available !== false,
          slots: item.slots || []
        })))
      } else {
        setLocalAvail(DAYS.map(day => ({
          day_of_week: day.key,
          is_available: true,
          slots: []
        })))
      }
    } else if (!isLoading) {
      setLocalAvail(DAYS.map(day => ({
        day_of_week: day.key,
        is_available: true,
        slots: []
      })))
    }
  }, [isLoading, data])

  const handleSave = (availabilityData: DayAvailability[]) => {
    const payload = availabilityData.map(d => ({
      companion_id: companionId,
      day_of_week: d.day_of_week,
      is_available: d.is_available,
      slots: d.is_available ? d.slots : []
    }))
    
    setAvailMutation.mutate(
      { companionId: companionId as string, availabilities: payload as any },
      {
        onSuccess: () => {
          setLocalAvail(availabilityData)
          setIsModalOpen(false)
        }
      }
    )
  }

  const getAvailabilitySummary = () => {
    const availableDays = localAvail.filter(d => d.is_available).length
    const totalSlots = localAvail.reduce((sum, day) => sum + day.slots.length, 0)
    return { availableDays, totalSlots }
  }

  const { availableDays, totalSlots } = getAvailabilitySummary()

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Companion Availability</h1>
          <p className="text-gray-600">Manage weekly availability and time slots for this companion.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">Error loading availability</div>
        ) : (
          <div className="space-y-6">
            {/* Current Availability Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{availableDays}</div>
                  <div className="text-sm text-gray-600">Available Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{totalSlots}</div>
                  <div className="text-sm text-gray-600">Total Time Slots</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">{7 - availableDays}</div>
                  <div className="text-sm text-gray-600">Unavailable Days</div>
                </div>
              </div>
            </div>

            {/* Quick Day Overview */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule Overview</h3>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Availability</span>
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map(day => {
                  const dayData = localAvail.find(d => d.day_of_week === day.key)
                  const isAvailable = dayData?.is_available ?? true
                  const slotCount = dayData?.slots?.length || 0
                  
                  return (
                    <div key={day.key} className={`text-center p-3 rounded-lg border ${
                      isAvailable 
                        ? 'bg-blue-50 border-blue-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className={`text-xs font-medium mb-1 ${
                        isAvailable ? 'text-blue-700' : 'text-gray-500'
                      }`}>
                        {day.label.slice(0, 3)}
                      </div>
                      <div className={`text-lg font-bold ${
                        isAvailable ? 'text-blue-900' : 'text-gray-400'
                      }`}>
                        {isAvailable ? slotCount : '—'}
                      </div>
                      <div className={`text-xs ${
                        isAvailable ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {isAvailable ? 'slots' : 'unavailable'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Recent Changes or Notes */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-medium text-yellow-800">Quick Actions</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Click &quot;Edit Availability&quot; above to open the detailed schedule editor. You can toggle day availability, add multiple time slots, and manage the complete weekly schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Modal */}
        <AvailabilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          availability={localAvail}
          onSave={handleSave}
          isSaving={setAvailMutation.isPending}
        />
      </div>
    </DashboardLayout>
  )
}


