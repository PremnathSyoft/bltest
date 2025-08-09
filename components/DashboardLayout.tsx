
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import BottomNavigation from './BottomNavigation';
import Image from 'next/image';
interface DashboardLayoutProps {
  children: React.ReactNode;
  userType: 'admin' | 'customer';
  userName: string;
}

export default function DashboardLayout({ children, userType, userName }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/signin');
  };

  const adminNavItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', href: '/dashboard/admin' },
    { icon: 'ri-user-line', label: 'Students', href: '/dashboard/admin/students' },
    { icon: 'ri-map-pin-line', label: 'Locations', href: '/dashboard/admin/locations' },
    { icon: 'ri-gift-line', label: 'Coupons', href: '/dashboard/admin/coupons' },
    // { icon: 'ri-user-star-line', label: 'Instructors', href: '/dashboard/admin/instructors' },
    // { icon: 'ri-calendar-line', label: 'Lessons', href: '/dashboard/admin/lessons' },
    { icon: 'ri-money-dollar-circle-line', label: 'Revenue', href: '/dashboard/admin/revenue' },
    { icon: 'ri-settings-line', label: 'Settings', href: '/dashboard/admin/settings' }
  ];

  const customerNavItems = [
    { icon: 'ri-dashboard-line', label: 'Dashboard', href: '/dashboard/customer' },
    { icon: 'ri-calendar-line', label: 'Book Slot', href: '/dashboard/customer/book' },
    { icon: 'ri-history-line', label: 'Booking History', href: '/dashboard/customer/history' },
    { icon: 'ri-money-dollar-circle-line', label: 'Payment', href: '/dashboard/customer/payment' },
    { icon: 'ri-user-line', label: 'Profile', href: '/dashboard/customer/profile' },
    { icon: 'ri-customer-service-line', label: 'Support', href: '/dashboard/customer/support' }
  ];

  const navItems = userType === 'admin' ? adminNavItems : customerNavItems;

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-blue-600">
          <Link href="/" className="flex items-center">
            <Image
              src="/bliss_drive.png"
              alt="BlissDrive Logo"
              className="h-10 w-auto"
              width={0}
              height={0}
              sizes="(max-width: 768px) 120px, 140px"
              priority
            />
          </Link>
        </div>

        <nav className="mt-8">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <div className="w-6 h-6 flex items-center justify-center mr-3">
                <i className={item.icon}></i>
              </div>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-red-600 transition-colors cursor-pointer w-full text-left"
          >
            <div className="w-6 h-6 flex items-center justify-center mr-3">
              <i className="ri-logout-circle-line"></i>
            </div>
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 hover:text-gray-700 lg:hidden cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <i className="ri-menu-line"></i>
              </div>
            </button>

            <div className="flex items-center space-x-4 ml-auto">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Welcome back, {userName}</p>
                <p className="text-xs text-gray-500 capitalize">{userType} Dashboard</p>
              </div>
              <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                <i className="ri-user-line text-blue-600"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 pb-16 md:pb-0">
          {children}
        </main>

        {/* Bottom Navigation for Customer on Mobile */}
        {userType === 'customer' && <BottomNavigation />}
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black opacity-50 lg:hidden cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
}
