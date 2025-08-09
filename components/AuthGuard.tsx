'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, token, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Check if we're on a dashboard route
      if (pathname.startsWith('/dashboard')) {
        if (!isAuthenticated || !token || !user) {
          // Store the intended destination
          sessionStorage.setItem('redirectAfterLogin', pathname);
          // Redirect to signin
          router.replace('/signin');
          return;
        }

        // Role-based routing: redirect to correct dashboard if user is on wrong one
        const isAdminRoute = pathname.startsWith('/dashboard/admin');
        const isCustomerRoute = pathname.startsWith('/dashboard/customer');
        const isSuperAdmin = user.role === 'SuperAdmin';

        if (isAdminRoute && !isSuperAdmin) {
          // Non-admin trying to access admin routes
          router.replace('/dashboard/customer');
          return;
        }

        if (isCustomerRoute && isSuperAdmin) {
          // Admin trying to access customer routes
          router.replace('/dashboard/admin');
          return;
        }

        // Optional: Add token validation with API here in the future
        // For now, we trust the token if it exists in localStorage
      }

      // Special handling for signin/login pages when user is already authenticated
      if ((pathname === '/signin' || pathname === '/login') && isAuthenticated && user) {
        // Redirect authenticated users away from signin page
        if (user.role === 'SuperAdmin') {
          router.replace('/dashboard/admin');
        } else {
          router.replace('/dashboard/customer');
        }
        return;
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, token, user, pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading && pathname.startsWith('/dashboard')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}