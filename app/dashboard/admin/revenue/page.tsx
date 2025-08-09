'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/lib/auth-context'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from 'recharts'

const monthlyRevenueData = [
  { month: 'Jan', revenue: 8200, bookings: 120 },
  { month: 'Feb', revenue: 9100, bookings: 132 },
  { month: 'Mar', revenue: 10400, bookings: 148 },
  { month: 'Apr', revenue: 9800, bookings: 139 },
  { month: 'May', revenue: 11300, bookings: 156 },
  { month: 'Jun', revenue: 12100, bookings: 161 },
  { month: 'Jul', revenue: 12950, bookings: 171 },
  { month: 'Aug', revenue: 12400, bookings: 165 },
  { month: 'Sep', revenue: 13150, bookings: 175 },
  { month: 'Oct', revenue: 13800, bookings: 182 },
  { month: 'Nov', revenue: 14250, bookings: 189 },
  { month: 'Dec', revenue: 15700, bookings: 205 },
]

const weeklyTrendData = [
  { name: 'Mon', revenue: 1100 },
  { name: 'Tue', revenue: 1250 },
  { name: 'Wed', revenue: 980 },
  { name: 'Thu', revenue: 1460 },
  { name: 'Fri', revenue: 1720 },
  { name: 'Sat', revenue: 2100 },
  { name: 'Sun', revenue: 1540 },
]

export default function RevenuePage() {
  const { user } = useAuth()

  const totalRevenueYtd = monthlyRevenueData.reduce((sum, m) => sum + m.revenue, 0)
  const totalBookingsYtd = monthlyRevenueData.reduce((sum, m) => sum + m.bookings, 0)
  const avgRevenuePerBooking = totalBookingsYtd > 0 ? Math.round(totalRevenueYtd / totalBookingsYtd) : 0

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Revenue Overview</h1>
          <p className="text-gray-600">Static demo data with modern charts. Connect to your API later.</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">YTD Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${totalRevenueYtd.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="ri-money-dollar-circle-line text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{totalBookingsYtd.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i className="ri-calendar-2-line text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg $ / Booking</p>
                <p className="text-2xl font-bold text-gray-900">${avgRevenuePerBooking.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="ri-bar-chart-2-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
              <span className="text-xs text-gray-500">Static</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue ($)" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Trend</h3>
              <span className="text-xs text-gray-500">Static</span>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyTrendData}>
                  <defs>
                    <linearGradient id="revArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#10B981" fillOpacity={1} fill="url(#revArea)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>This page uses static sample data. Replace with API-driven data when available.</li>
            <li>Charts are built with Recharts and are responsive.</li>
            <li>KPIs summarize YTD performance based on the sample set.</li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}


