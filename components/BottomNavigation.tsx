
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BottomNavigationProps {
  userType?: 'admin' | 'customer';
}

export default function BottomNavigation({ userType = 'customer' }: BottomNavigationProps) {
  const pathname = usePathname();

  const customerNavItems = [
    {
      icon: 'ri-dashboard-line',
      iconActive: 'ri-dashboard-fill',
      label: 'Dashboard',
      href: '/dashboard/customer'
    },
    {
      icon: 'ri-calendar-line',
      iconActive: 'ri-calendar-fill',
      label: 'Book',
      href: '/dashboard/customer/book'
    },
    {
      icon: 'ri-history-line',
      iconActive: 'ri-history-fill',
      label: 'History',
      href: '/dashboard/customer/history'
    },
    {
      icon: 'ri-credit-card-line',
      iconActive: 'ri-credit-card-fill',
      label: 'Payment',
      href: '/dashboard/customer/payment'
    },
    {
      icon: 'ri-user-line',
      iconActive: 'ri-user-fill',
      label: 'Profile',
      href: '/dashboard/customer/profile'
    }
  ];

  const adminNavItems = [
    {
      icon: 'ri-dashboard-line',
      iconActive: 'ri-dashboard-fill',
      label: 'Dashboard',
      href: '/dashboard/admin'
    },
    {
      icon: 'ri-user-line',
      iconActive: 'ri-user-fill',
      label: 'Students',
      href: '/dashboard/admin/students'
    },
    {
      icon: 'ri-calendar-2-line',
      iconActive: 'ri-calendar-2-fill',
      label: 'Bookings',
      href: '/dashboard/admin/bookings'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      iconActive: 'ri-money-dollar-circle-fill',
      label: 'Revenue',
      href: '/dashboard/admin/revenue'
    },
    {
      icon: 'ri-settings-line',
      iconActive: 'ri-settings-fill',
      label: 'Settings',
      href: '/dashboard/admin/settings'
    }
  ];

  const navItems = userType === 'admin' ? adminNavItems : customerNavItems;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 md:hidden z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/40 px-4 py-3">
        <div className="flex items-center space-x-6">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={index}
                href={item.href}
                className="relative group flex flex-col items-center"
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                )}
                
                {/* Icon Container */}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                }`}>
                  <i className={`${isActive ? item.iconActive : item.icon} text-lg transition-all duration-200 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}></i>
                </div>
                
                {/* Label */}
                <span className={`text-xs font-medium mt-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-600 group-hover:text-blue-600'
                }`}>
                  {item.label}
                </span>
                
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/10' 
                    : 'group-hover:bg-blue-500/5'
                }`}></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
