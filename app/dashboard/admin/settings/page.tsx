'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/lib/auth-context'

export default function SettingsPage() {
  const { user } = useAuth()

  // Static form state (can be wired to API later)
  const [orgName, setOrgName] = useState('Bliss Drive Academy')
  const [supportEmail, setSupportEmail] = useState('support@blissdrive.test')
  const [currency, setCurrency] = useState('USD')
  const [notifications, setNotifications] = useState(true)
  const [timezone, setTimezone] = useState('America/New_York')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Saved (static demo)')
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Static preferences for demonstration. Hook up to your backend later.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                  <input
                    type="email"
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="AUD">AUD</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="America/New_York">America/New_York</option>
                    <option value="America/Chicago">America/Chicago</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="Asia/Kolkata">Asia/Kolkata</option>
                    <option value="Australia/Sydney">Australia/Sydney</option>
                  </select>
                </div>
                <div className="flex items-center mt-6">
                  <input
                    id="notif"
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="notif" className="ml-2 text-sm text-gray-700">Email notifications</label>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About this Page</h3>
            <p className="text-gray-700 text-sm">
              This is a static settings screen demonstrating a modern layout. Replace with
              real data bindings and submit handlers when your endpoints are ready.
            </p>
            <ul className="mt-4 text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Accessible form controls</li>
              <li>Responsive two-column layout</li>
              <li>Tailwind-based styling</li>
            </ul>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


