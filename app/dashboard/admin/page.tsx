
'use client';

import DashboardLayout from '../../../components/DashboardLayout';
import DataTable from '../../../components/DataTable';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    {
      title: 'Total Students',
      value: '2,847',
      change: '+12%',
      icon: 'ri-user-line',
      color: 'blue',
      trend: [20, 45, 35, 75, 55, 85, 70, 95]
    },
    {
      title: 'Active Instructors',
      value: '42',
      change: '+8%',
      icon: 'ri-user-star-line',
      color: 'green',
      trend: [30, 25, 45, 55, 65, 60, 70, 75]
    },
    {
      title: 'Today\'s Slots',
      value: '186',
      change: '+15%',
      icon: 'ri-calendar-check-line',
      color: 'purple',
      trend: [40, 35, 50, 45, 60, 55, 70, 80]
    },
    {
      title: 'Revenue Today',
      value: '$8,420',
      change: '+23%',
      icon: 'ri-money-dollar-circle-line',
      color: 'orange',
      trend: [15, 25, 35, 45, 40, 60, 75, 85]
    }
  ];

  const revenueData = [
    { name: 'Jan', revenue: 4200, lessons: 85 },
    { name: 'Feb', revenue: 5800, lessons: 120 },
    { name: 'Mar', revenue: 7200, lessons: 144 },
    { name: 'Apr', revenue: 8900, lessons: 178 },
    { name: 'May', revenue: 9500, lessons: 190 },
    { name: 'Jun', revenue: 11200, lessons: 224 }
  ];

  const lessonTypeData = [
    { name: 'Practice Sessions', value: 65, color: '#3B82F6' },
    { name: 'Road Test Prep', value: 35, color: '#10B981' }
  ];

  const pendingBookings = [
    {
      id: 'BK001',
      studentName: 'John Smith',
      lessonType: 'Practice Session',
      date: '2024-01-25',
      time: '09:00 AM',
      duration: '1 hour',
      instructor: 'Sarah Johnson',
      status: 'Pending',
      pickupAddress: '123 Main St, Downtown',
      rate: '$60/hour',
      estimatedAmount: '$60.00'
    },
    {
      id: 'BK002',
      studentName: 'Emily Davis',
      lessonType: 'Road Test Prep',
      date: '2024-01-25',
      time: '11:00 AM',
      duration: '2 hours',
      instructor: 'Mike Wilson',
      status: 'Pending',
      pickupAddress: '456 Oak Ave, Suburbs',
      rate: '$98/hour',
      estimatedAmount: '$196.00'
    },
    {
      id: 'BK003',
      studentName: 'Robert Chen',
      lessonType: 'Practice Session',
      date: '2024-01-26',
      time: '02:00 PM',
      duration: '1.5 hours',
      instructor: 'Lisa Brown',
      status: 'Pending',
      pickupAddress: '789 Pine Rd, Eastside',
      rate: '$60/hour',
      estimatedAmount: '$90.00'
    }
  ];

  const recentLessons = [
    {
      id: 'LS001',
      studentName: 'Alice Johnson',
      instructor: 'Tom Davis',
      lessonType: 'Practice Session',
      date: '2024-01-24',
      scheduledDuration: '1 hour',
      actualDuration: '55m',
      status: 'Completed',
      rating: 5,
      scheduledAmount: '$60.00',
      actualAmount: '$55.00',
      paymentStatus: 'Paid'
    },
    {
      id: 'LS002',
      studentName: 'Mark Wilson',
      instructor: 'Emma Rodriguez',
      lessonType: 'Road Test Prep',
      date: '2024-01-24',
      scheduledDuration: '2 hours',
      actualDuration: '2h 20m',
      status: 'Completed',
      rating: 4,
      scheduledAmount: '$196.00',
      actualAmount: '$228.67',
      paymentStatus: 'Paid'
    },
    {
      id: 'LS003',
      studentName: 'Sarah Brown',
      instructor: 'James Miller',
      lessonType: 'Practice Session',
      date: '2024-01-25',
      scheduledDuration: '2 hours',
      actualDuration: 'In Progress',
      status: 'Active',
      rating: null,
      scheduledAmount: '$120.00',
      actualAmount: 'TBD',
      paymentStatus: 'Pending'
    }
  ];

  const handleApproveBooking = (booking: any) => {
    alert(`Booking ${booking.id} approved! Student will be notified.`);
  };

  const handleRejectBooking = (booking: any) => {
    alert(`Booking ${booking.id} rejected! Student will be notified.`);
  };

  const pendingBookingColumns = [
    {
      key: 'id',
      label: 'Booking ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'studentName',
      label: 'Student Name',
      sortable: true,
      width: '150px'
    },
    {
      key: 'lessonType',
      label: 'Lesson Type',
      sortable: true,
      width: '130px',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Practice Session' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      width: '100px'
    },
    {
      key: 'time',
      label: 'Time',
      sortable: true,
      width: '100px'
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      width: '100px'
    },
    {
      key: 'rate',
      label: 'Rate',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span className="text-sm font-medium text-green-600">{value}</span>
      )
    },
    {
      key: 'estimatedAmount',
      label: 'Est. Amount',
      sortable: true,
      width: '110px',
      render: (value: string) => (
        <span className="text-sm font-semibold text-blue-600">{value}</span>
      )
    },
    {
      key: 'instructor',
      label: 'Instructor',
      sortable: true,
      width: '140px'
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          {value}
        </span>
      )
    }
  ];

  const recentLessonsColumns = [
    {
      key: 'id',
      label: 'Lesson ID',
      sortable: true,
      width: '100px'
    },
    {
      key: 'studentName',
      label: 'Student',
      sortable: true,
      width: '150px'
    },
    {
      key: 'instructor',
      label: 'Instructor',
      sortable: true,
      width: '150px'
    },
    {
      key: 'lessonType',
      label: 'Type',
      sortable: true,
      width: '130px',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Practice Session' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-purple-100 text-purple-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      width: '100px'
    },
    {
      key: 'scheduledDuration',
      label: 'Scheduled',
      sortable: true,
      width: '100px'
    },
    {
      key: 'actualDuration',
      label: 'Actual',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span className={`text-sm font-medium ${
          value === 'In Progress' ? 'text-orange-600' : 'text-gray-900'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'actualAmount',
      label: 'Amount',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span className={`font-medium ${
          value === 'TBD' ? 'text-orange-600' : 'text-green-600'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'paymentStatus',
      label: 'Payment',
      sortable: true,
      width: '100px',
      render: (value: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Paid' 
            ? 'bg-green-100 text-green-800'
            : 'bg-orange-100 text-orange-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'rating',
      label: 'Rating',
      sortable: true,
      width: '100px',
      render: (value: number) => 
        value ? (
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`ri-star-${i < value ? 'fill' : 'line'} text-yellow-400`}
              ></i>
            ))}
          </div>
        ) : (
          <span className="text-gray-400 text-sm">Pending</span>
        )
    }
  ];

  return (
    <DashboardLayout userType="admin" userName="Admin">
      <div className="p-6">
        {/* Animated Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-gray-600">Manage your driving school with comprehensive insights</p>
        </div>

        {/* Enhanced Stats Cards with Mini Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center">
                    <i className="ri-arrow-up-line mr-1"></i>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`w-14 h-14 flex items-center justify-center bg-${stat.color}-100 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${stat.icon} text-2xl text-${stat.color}-600`}></i>
                </div>
              </div>
              
              {/* Mini Trend Chart */}
              <div className="h-12">
              <ResponsiveContainer width="100%" height="100%">
  <AreaChart data={stat.trend.map((value) => ({ value }))}>
    <Area 
      type="monotone" 
      dataKey="value" 
      stroke={`var(--${stat.color}-500)`}
      fill={`var(--${stat.color}-500)`}
      fillOpacity={0.3}
      strokeWidth={2}
    />
  </AreaChart>
</ResponsiveContainer>

              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                { id: 'bookings', label: 'Pending Approvals', icon: 'ri-calendar-check-line' },
                { id: 'lessons', label: 'Active & Recent Lessons', icon: 'ri-history-line' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="animate-fade-in space-y-8">
                {/* Charts Row */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {/* Revenue Chart */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Revenue Trends</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span>Monthly Revenue</span>
                      </div>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={revenueData}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#3B82F6" 
                          fillOpacity={1} 
                          fill="url(#colorRevenue)"
                          strokeWidth={3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Lesson Types Chart */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Lesson Distribution</h3>
                    <ResponsiveContainer width="100%" height={350}>
                      <PieChart>
                        <Pie
                          data={lessonTypeData}
                          cx="50%"
                          cy="50%"
                          innerRadius={80}
                          outerRadius={140}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {lessonTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center space-x-6 mt-4">
                      {lessonTypeData.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-3" style={{backgroundColor: item.color}}></div>
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          <span className="text-sm text-gray-500 ml-2">({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: 'Add Instructor', icon: 'ri-user-add-line', color: 'blue' },
                      { label: 'Schedule Lesson', icon: 'ri-calendar-event-line', color: 'green' },
                      { label: 'Generate Report', icon: 'ri-file-chart-line', color: 'purple' },
                      { label: 'System Settings', icon: 'ri-settings-line', color: 'orange' }
                    ].map((action, index) => (
                      <button
                        key={index}
                        className={`p-4 bg-white rounded-xl border border-gray-200 hover:border-${action.color}-300 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 group`}
                      >
                        <div className={`w-12 h-12 bg-${action.color}-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-${action.color}-200 transition-colors`}>
                          <i className={`${action.icon} text-2xl text-${action.color}-600`}></i>
                        </div>
                        <span className="text-sm font-medium text-gray-700">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pending Booking Approvals</h3>
                  <p className="text-gray-600">Review and approve student lesson bookings</p>
                </div>

                <DataTable
                  title="Pending Lesson Bookings"
                  columns={pendingBookingColumns}
                  data={pendingBookings}
                  searchable={true}
                  exportable={true}
                  importable={false}
                  selectable={true}
                  onEdit={(booking) => handleApproveBooking(booking)}
                  onDelete={(booking) => handleRejectBooking(booking)}
                  onMultiDelete={(bookings) => {
                    bookings.forEach(booking => handleApproveBooking(booking));
                  }}
                  onExport={() => alert('Exporting bookings data...')}
                />

                {/* Custom Action Buttons for Bookings */}
                <div className="mt-6 flex flex-wrap space-x-4 space-y-2">
                  <button className="flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors">
                    <i className="ri-check-line mr-2"></i>
                    Approve Selected
                  </button>
                  <button className="flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors">
                    <i className="ri-close-line mr-2"></i>
                    Reject Selected
                  </button>
                  <button className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                    <i className="ri-mail-send-line mr-2"></i>
                    Send Notifications
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="animate-fade-in">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Active & Recent Lessons</h3>
                  <p className="text-gray-600">Monitor ongoing lessons and payment status</p>
                </div>

                <DataTable
                  title="Lesson Management"
                  columns={recentLessonsColumns}
                  data={recentLessons}
                  searchable={true}
                  exportable={true}
                  importable={true}
                  selectable={true}
                  onEdit={(lesson) => alert(`Viewing lesson ${lesson.id} details`)}
                  onDelete={(lesson) => alert(`Canceling lesson ${lesson.id}`)}
                  onImport={(file) => alert(`Importing lessons from ${file.name}`)}
                  onExport={() => alert('Exporting lessons data...')}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </DashboardLayout>
  );
}
