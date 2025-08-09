'use client'

import { useParams } from 'next/navigation'
import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/lib/auth-context'
import { useCompanionAvailability, useSetCompanionAvailability, CompanionAvailability } from '@/lib/hooks/useSafetyCompanions'
import { useState } from 'react'

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

export default function CompanionAvailabilityPage() {
  const { user } = useAuth()
  const params = useParams<{ id: string }>()
  const companionId = params?.id
  const { data, isLoading, error } = useCompanionAvailability(companionId || '')
  const setAvailMutation = useSetCompanionAvailability()

  const [localAvail, setLocalAvail] = useState<CompanionAvailability[]>([])

  // Initialize local state when data loads
  if (!isLoading && localAvail.length === 0 && Array.isArray((data as any)?.data)) {
    setLocalAvail((data as any).data as CompanionAvailability[])
  }

  const addSlot = (day: string) => {
    setLocalAvail(prev => {
      const copy = [...prev]
      const dayIdx = copy.findIndex(d => d.day_of_week === day)
      if (dayIdx === -1) {
        copy.push({ companion_id: companionId as string, day_of_week: day, slots: [{ start: '09:00', end: '10:00' }] })
      } else {
        copy[dayIdx] = { ...copy[dayIdx], slots: [...copy[dayIdx].slots, { start: '09:00', end: '10:00' }] }
      }
      return copy
    })
  }

  const updateSlot = (day: string, idx: number, field: 'start' | 'end', value: string) => {
    setLocalAvail(prev => prev.map(d => d.day_of_week !== day ? d : { ...d, slots: d.slots.map((s, i) => i === idx ? { ...s, [field]: value } : s) }))
  }

  const removeSlot = (day: string, idx: number) => {
    setLocalAvail(prev => prev.map(d => d.day_of_week !== day ? d : { ...d, slots: d.slots.filter((_, i) => i !== idx) }))
  }

  const onSave = () => {
    const payload = localAvail.map(d => ({
      companion_id: companionId,
      day_of_week: d.day_of_week,
      slots: d.slots,
    }))
    setAvailMutation.mutate({ companionId: companionId as string, availabilities: payload as any })
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Companion Availability</h1>
          <p className="text-gray-600">Manage weekly time slots for this companion.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">Error loading availability</div>
        ) : (
          <div className="space-y-6">
            {DAYS.map(day => {
              const dayData = localAvail.find(d => d.day_of_week === day)
              return (
                <div key={day} className="border border-gray-200 rounded-xl p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{day}</h3>
                    <button onClick={() => addSlot(day)} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Slot</button>
                  </div>
                  <div className="space-y-3">
                    {(dayData?.slots || []).map((slot, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <input type="time" value={slot.start} onChange={(e) => updateSlot(day, idx, 'start', e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
                        <span className="text-gray-500">to</span>
                        <input type="time" value={slot.end} onChange={(e) => updateSlot(day, idx, 'end', e.target.value)} className="border border-gray-300 rounded px-3 py-2" />
                        <button onClick={() => removeSlot(day, idx)} className="px-2 py-1 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">Remove</button>
                      </div>
                    ))}
                    {(!dayData || dayData.slots.length === 0) && (
                      <p className="text-sm text-gray-500">No slots added for {day}</p>
                    )}
                  </div>
                </div>
              )
            })}
            <div>
              <button onClick={onSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" disabled={setAvailMutation.isPending}>
                {setAvailMutation.isPending ? 'Saving...' : 'Save Availability'}
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


