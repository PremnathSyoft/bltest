'use client';

import DashboardLayout from '../../../components/DashboardLayout';
import Link from 'next/link';

export default function CustomerDashboard() {
  const quickActions = [
    {
      title: 'Book a Ride',
      description: 'Get a ride to your destination',
      icon: 'ri-car-line',
      href: '/dashboard/customer/book',
      color: 'blue'
    },
    {
      title: 'Schedule Ride',
      description: 'Plan your future trips',
      icon: 'ri-calendar-line',
      href: '/dashboard/customer/book',
      color: 'green'
    },
    {
      title: 'Trip History',
      description: 'View your past rides',
      icon: 'ri-history-line',
      href: '/dashboard/customer/history',
      color: 'purple'
    },
    {
      title: 'Payment Methods',
      description: 'Manage your payment options',
      icon: 'ri-wallet-line',
      href: '/dashboard/customer/payment',
      color: 'orange'
    }
  ];

  const recentTrips = [
    {
      id: '#12847',
      date: 'Today, 2:30 PM',
      from: 'Home',
      to: 'Downtown Office',
      driver: 'Mike Johnson',
      rating: 5,
      amount: '$24.50',
      status: 'Completed'
    },
    {
      id: '#12843',
      date: 'Yesterday, 6:45 PM',
      from: 'Downtown Office',
      to: 'Shopping Mall',
      driver: 'Sarah Wilson',
      rating: 4,
      amount: '$18.75',
      status: 'Completed'
    },
    {
      id: '#12841',
      date: 'Dec 15, 9:20 AM',
      from: 'Airport Terminal 2',
      to: 'Home',
      driver: 'David Chen',
      rating: 5,
      amount: '$45.30',
      status: 'Completed'
    }
  ];

  const currentRide = {
    driver: 'Emma Rodriguez',
    vehicle: 'Toyota Camry - ABC 123',
    rating: 4.9,
    eta: '5 minutes',
    from: 'Current Location',
    to: 'Business District'
  };

  const stats = [
    { label: 'Total Trips', value: '47' },
    { label: 'This Month', value: '12' },
    { label: 'Total Spent', value: '$1,234' },
    { label: 'Avg Rating', value: '4.8' }
  ];

  return (
    <DashboardLayout userType="customer" userName="John">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, John!</h1>
          <p className="text-gray-600">Ready for your next ride? Let's get you where you need to go.</p>
        </div>

        {/* Current Ride Status */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Current Ride</h2>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">In Progress</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-full mr-3">
                  <i className="ri-user-line text-xl"></i>
                </div>
                <div>
                  <p className="font-medium">{currentRide.driver}</p>
                  <p className="text-blue-100 text-sm">{currentRide.vehicle}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span>{currentRide.rating}</span>
                </div>
                <div className="flex items-center">
                  <i className="ri-time-line mr-1"></i>
                  <span>ETA: {currentRide.eta}</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                  <span className="text-sm">{currentRide.from}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
                  <span className="text-sm">{currentRide.to}</span>
                </div>
              </div>
              
              <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap cursor-pointer">
                Track Driver
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center">
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className={`w-12 h-12 flex items-center justify-center bg-${action.color}-100 rounded-lg mb-4`}>
                  <i className={`${action.icon} text-2xl text-${action.color}-600`}></i>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Trips</h2>
            <Link 
              href="/dashboard/customer/history"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {recentTrips.map((trip, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-3">{trip.id}</span>
                    <span className="text-sm text-gray-500">{trip.date}</span>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{trip.amount}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-gray-600">From: </span>
                        <span className="text-gray-900 ml-1">{trip.from}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-gray-600">To: </span>
                        <span className="text-gray-900 ml-1">{trip.to}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Driver: {trip.driver}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`ri-star-${i < trip.rating ? 'fill' : 'line'} text-yellow-400 text-sm`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {trip.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}