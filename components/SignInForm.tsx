'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignInForm() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: ''
  });
  const router = useRouter();

  const checkEmail = async (emailAddress: string) => {
    setIsLoading(true);
    
    // Simulate API call to check if email exists
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock logic: if email contains 'admin', it's SuperAdmin; if 'new', it's new user
    if (emailAddress.includes('admin')) {
      setUserType('SuperAdmin');
      setStep('password');
    } else if (emailAddress.includes('new')) {
      setUserType('Customer');
      setStep('register');
    } else {
      setUserType('Customer');
      setStep('password');
    }
    
    setIsLoading(false);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      checkEmail(email);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password.trim()) {
      // Redirect based on user type
      if (userType === 'SuperAdmin') {
        router.push('/dashboard/admin');
      } else {
        router.push('/dashboard/customer');
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.firstName.trim() && formData.lastName.trim()) {
      // Redirect to customer dashboard
      router.push('/dashboard/customer');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setUserType('');
    setFormData({ firstName: '', lastName: '', password: '' });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome to BlissDrive
        </h2>
        <p className="text-gray-600">
          {step === 'email' && 'Enter your email to continue'}
          {step === 'password' && `Welcome back! Please enter your password`}
          {step === 'register' && 'Complete your registration'}
        </p>
      </div>

      {step === 'email' && (
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            {isLoading ? 'Checking...' : 'Continue'}
          </button>
        </form>
      )}

      {step === 'password' && (
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800 text-sm">
              <span className="font-medium">Account found:</span> {email}
              <br />
              <span className="font-medium">User type:</span> {userType}
            </p>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <a href="#" className="text-blue-600 hover:text-blue-700">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm cursor-pointer"
          >
            Use different email
          </button>
        </form>
      )}

      {step === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <p className="text-green-800 text-sm">
              <span className="font-medium">New account:</span> {email}
              <br />
              <span className="font-medium">Account type:</span> {userType}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                required
                placeholder="Enter your first name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                required
                placeholder="Enter your last name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            Create Account
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="w-full text-gray-600 hover:text-gray-800 py-2 text-sm cursor-pointer"
          >
            Use different email
          </button>
        </form>
      )}
    </div>
  );
}