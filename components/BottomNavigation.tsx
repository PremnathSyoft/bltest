
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
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

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
      <div className="flex">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={index}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center mb-1">
                <i className={`${isActive ? item.iconActive : item.icon} text-xl`}></i>
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
