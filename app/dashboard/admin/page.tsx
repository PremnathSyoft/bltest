'use client';

// import { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { useAuth } from '@/lib/auth-context';
import { useStudents } from '@/lib/hooks/useStudents';

export default function AdminDashboard() {
  const { user } = useAuth();
  // Removed unused state variables: dateRange, setDateRange

  // Fetch students data for statistics
  const { data: studentsData, isLoading: studentsLoading } = useStudents({ 
    page: 1, 
    offset: 100 // Get more records for statistics
  });

  const students = Array.isArray(studentsData?.data) ? studentsData.data : [];

  // Calculate statistics
  const totalStudents = students.length;
  const approvedStudents = students.filter(s => s.verification_status === 'approved').length;
  const pendingStudents = students.filter(s => s.verification_status === 'pending').length;
  const rejectedStudents = students.filter(s => s.verification_status === 'rejected').length;

  // Role distribution
  const roleStats = {
    customers: students.filter(s => s.role === 'Customer').length,
    instructors: students.filter(s => s.role === 'Instructor').length,
    admins: students.filter(s => s.role === 'Admin').length,
    superAdmins: students.filter(s => s.role === 'SuperAdmin').length,
  };

  // Static demo data for charts (can be wired to real analytics later)
  const signupsTrendData = [
    { name: 'Mon', signups: 12 },
    { name: 'Tue', signups: 18 },
    { name: 'Wed', signups: 10 },
    { name: 'Thu', signups: 22 },
    { name: 'Fri', signups: 27 },
    { name: 'Sat', signups: 16 },
    { name: 'Sun', signups: 14 },
  ];

  const roleDistributionData = [
    { name: 'Customers', value: roleStats.customers },
    { name: 'Instructors', value: roleStats.instructors },
    { name: 'Admins', value: roleStats.admins },
    { name: 'Super Admins', value: roleStats.superAdmins },
  ];
  const ROLE_COLORS = ['#3B82F6', '#8B5CF6', '#6366F1', '#6B7280'];

  // Recent students (last 7 days)
  const recentStudents = students
    .filter(s => {
      if (!s.created_at) return false;
      const createdDate = new Date(s.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return createdDate >= weekAgo;
    })
    .slice(0, 5); // Show only 5 most recent

  const stats = [
    {
      title: 'Total Students',
      value: totalStudents.toString(),
      change: `+${recentStudents.length}`,
      changeLabel: 'this week',
      icon: 'ri-user-line',
      color: 'blue',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Approved Students',
      value: approvedStudents.toString(),
      change: `${totalStudents > 0 ? Math.round((approvedStudents / totalStudents) * 100) : 0}%`,
      changeLabel: 'of total',
      icon: 'ri-check-line',
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200'
    },
    {
      title: 'Pending Review',
      value: pendingStudents.toString(),
      change: `${totalStudents > 0 ? Math.round((pendingStudents / totalStudents) * 100) : 0}%`,
      changeLabel: 'of total',
      icon: 'ri-time-line',
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-200'
    },
    {
      title: 'Instructors',
      value: roleStats.instructors.toString(),
      change: `${totalStudents > 0 ? Math.round((roleStats.instructors / totalStudents) * 100) : 0}%`,
      changeLabel: 'of users',
      icon: 'ri-user-star-line',
      color: 'purple',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-200'
    }
  ];

  if (studentsLoading) {
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
          </div>
      </DashboardLayout>
    );
    }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of your driving school management system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.bgColor} ${stat.borderColor} border rounded-xl p-6 transition-all duration-200 hover:shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <i className={`${stat.icon} text-xl ${stat.textColor}`}></i>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.title}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${stat.textColor}`}>
                  {stat.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">{stat.changeLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Verification Status Chart */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Approved</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{approvedStudents}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${totalStudents > 0 ? (approvedStudents / totalStudents) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
          </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Pending</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{pendingStudents}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${totalStudents > 0 ? (pendingStudents / totalStudents) * 100 : 0}%` }}
                    ></div>
                      </div>
                    </div>
                  </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Rejected</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">{rejectedStudents}</span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${totalStudents > 0 ? (rejectedStudents / totalStudents) * 100 : 0}%` }}
                    ></div>
                  </div>
                        </div>
                    </div>
                  </div>
          </div>

          {/* Role Distribution */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roleDistributionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {roleDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={ROLE_COLORS[index % ROLE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
              </div>
        </div>

        {/* Charts: Engagement Overview */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Weekly Signups</h3>
              <span className="text-sm text-gray-500">Static demo</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={signupsTrendData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="signups" stroke="#3B82F6" fillOpacity={1} fill="url(#colorSignups)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-user-add-line text-blue-600"></i>
                  </div>
                  <span className="text-sm text-gray-700">New this week</span>
                </div>
                <span className="text-sm font-semibold text-blue-700">{recentStudents.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-check-line text-green-600"></i>
                  </div>
                  <span className="text-sm text-gray-700">Approved</span>
                </div>
                <span className="text-sm font-semibold text-green-700">{approvedStudents}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 border border-yellow-100">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                    <i className="ri-time-line text-yellow-600"></i>
                  </div>
                  <span className="text-sm text-gray-700">Pending</span>
                </div>
                <span className="text-sm font-semibold text-yellow-700">{pendingStudents}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Students */}
        {recentStudents.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Students (This Week)</h3>
            <div className="space-y-3">
              {recentStudents.map((student, index) => (
                <div key={student.id || index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-medium">
                        {student.first_name?.charAt(0)}{student.last_name?.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {student.first_name} {student.last_name}
                      </p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      student.verification_status === 'approved' ? 'bg-green-100 text-green-800' :
                      student.verification_status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.verification_status?.charAt(0).toUpperCase() + student.verification_status?.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
                </div>
              </div>
            )}

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a
              href="/dashboard/admin/students"
              className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-user-line text-2xl text-blue-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Manage Students</span>
            </a>
            
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-user-add-line text-2xl text-green-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Add Student</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-download-line text-2xl text-purple-600"></i>
                </div>
              <span className="text-sm font-medium text-gray-700">Export Data</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <i className="ri-settings-line text-2xl text-orange-600"></i>
              </div>
              <span className="text-sm font-medium text-gray-700">Settings</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
