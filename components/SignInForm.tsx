'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEmailCheck } from '@/lib/hooks/useAuth';

export default function SignInForm() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [validationErrors, setValidationErrors] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: ''
  });
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    confirm: false
  });
  const router = useRouter();
  const emailCheckMutation = useEmailCheck('customer'); // Default to customer type for email check

  const checkEmail = async (emailAddress: string) => {
    try {
      setErrorMessage(''); // Clear any previous errors
      const result = await emailCheckMutation.mutateAsync(emailAddress) as any;

      // Only proceed if we get a successful response
      if (result && typeof result === 'object') {
        if (result.exists) {
          setUserType(result.user_type || 'Customer');
          setStep('password');
          // Pre-fill user data if available
          if (result.first_name && result.last_name) {
            setFormData(prev => ({
              ...prev,
              firstName: result.first_name || '',
              lastName: result.last_name || ''
            }));
          }
        } else {
          setUserType('Customer');
          setStep('register');
        }
      } else {
        setErrorMessage('Something went wrong. Please try again.');
        setStep('error');
      }
    } catch (error: any) {
      console.error('Email check failed:', error);

      // Check if it's a 404 (user not found) - treat as new user
      if (error?.message?.includes('404') || error?.status === 404) {
        setUserType('Customer');
        setStep('register');
        return;
      }

      // Handle other errors
      if (error?.message?.includes('500') || error?.status === 500) {
        setErrorMessage('Something went wrong on our end. Please try again later.');
      } else if (error?.message?.includes('Network') || error?.name === 'NetworkError') {
        setErrorMessage('Network error. Please check your connection and try again.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }

      setStep('error');
    }
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

    // Validate all required fields
    const phoneError = validateUSAPhoneNumber(formData.phoneNumber);
    const dateOfBirthError = validateDateOfBirth(formData.dateOfBirth);
    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    setValidationErrors(prev => ({ 
      ...prev, 
      phoneNumber: phoneError,
      dateOfBirth: dateOfBirthError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    }));

    if (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.dateOfBirth.trim() &&
      formData.phoneNumber.trim() &&
      formData.password.trim() &&
      formData.confirmPassword.trim() &&
      !phoneError &&
      !dateOfBirthError &&
      !passwordError &&
      !confirmPasswordError
    ) {
      // Redirect to customer dashboard
      router.push('/dashboard/customer');
    }
  };

  const validateUSAPhoneNumber = (phone: string) => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // USA phone number should be 10 digits
    if (digits.length !== 10) {
      return 'Phone number must be 10 digits';
    }

    // First digit should not be 0 or 1
    if (digits[0] === '0' || digits[0] === '1') {
      return 'Area code cannot start with 0 or 1';
    }

    // Area code second digit should not be 9
    if (digits[1] === '9') {
      return 'Invalid area code';
    }

    return '';
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return 'Password must contain at least one special character (@$!%*?&)';
    }
    return '';
  };

  const validateConfirmPassword = (password: string, confirmPassword: string) => {
    if (confirmPassword !== password) {
      return 'Passwords do not match';
    }
    return '';
  };

  const validateDateOfBirth = (dateOfBirth: string) => {
    if (!dateOfBirth) {
      return 'Date of birth is required';
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    
    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 18) {
      return 'You must be at least 18 years old';
    }

    if (age > 80) {
      return 'Age cannot exceed 80 years';
    }

    return '';
  };

  // Calculate date ranges for min/max attributes
  const getDateLimits = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
    const currentDay = String(today.getDate()).padStart(2, '0');
    
    // Maximum date: 18 years ago from today
    const maxDate = `${currentYear - 18}-${currentMonth}-${currentDay}`;
    
    // Minimum date: 80 years ago from today
    const minDate = `${currentYear - 80}-${currentMonth}-${currentDay}`;
    
    return { minDate, maxDate };
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Limit to 10 digits
    const limitedDigits = digits.slice(0, 10);

    // Format as (XXX) XXX-XXXX
    if (limitedDigits.length >= 6) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
    } else if (limitedDigits.length >= 3) {
      return `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
    } else {
      return limitedDigits;
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    if (field === 'phoneNumber' && typeof value === 'string') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [field]: formattedPhone }));

      // Validate phone number
      const error = validateUSAPhoneNumber(formattedPhone);
      setValidationErrors(prev => ({ ...prev, phoneNumber: error }));
    } else if (field === 'dateOfBirth' && typeof value === 'string') {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Validate date of birth
      const error = validateDateOfBirth(value);
      setValidationErrors(prev => ({ ...prev, dateOfBirth: error }));
    } else if (field === 'password' && typeof value === 'string') {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Validate password
      const error = validatePassword(value);
      setValidationErrors(prev => ({ ...prev, password: error }));
      
      // Also validate confirm password if it exists
      if (formData.confirmPassword) {
        const confirmError = validateConfirmPassword(value, formData.confirmPassword);
        setValidationErrors(prev => ({ ...prev, confirmPassword: confirmError }));
      }
    } else if (field === 'confirmPassword' && typeof value === 'string') {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Validate confirm password
      const error = validateConfirmPassword(formData.password, value);
      setValidationErrors(prev => ({ ...prev, confirmPassword: error }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const togglePasswordVisibility = (field: 'login' | 'register' | 'confirm') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const resetForm = () => {
    setStep('email');
    setEmail('');
    setUserType('');
    setErrorMessage('');
    setFormData({ 
      firstName: '', 
      lastName: '', 
      dateOfBirth: '', 
      phoneNumber: '', 
      password: '', 
      confirmPassword: '', 
      agreeToTerms: false 
    });
    setValidationErrors({ phoneNumber: '', password: '', confirmPassword: '', dateOfBirth: '' });
    setShowPassword({ login: false, register: false, confirm: false });
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
          {step === 'error' && 'We encountered an issue'}
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
            disabled={emailCheckMutation.isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            {emailCheckMutation.isPending ? 'Checking...' : 'Continue'}
          </button>

          {emailCheckMutation.error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">
                {emailCheckMutation.error.message || 'Failed to check email. Please try again.'}
              </p>
            </div>
          )}
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
            <div className="relative">
              <input
                type={showPassword.login ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
                placeholder="Enter your password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('login')}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword.login ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
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

            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
                <span className="text-xs text-gray-500 ml-1">(Must be 18-80 years old)</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                  min={getDateLimits().minDate}
                  max={getDateLimits().maxDate}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    validationErrors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                  }`}
                  style={{
                    colorScheme: 'light',
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield'
                  }}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {validationErrors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.dateOfBirth}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Click on the calendar icon to select your birth date
              </p>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="flex">
                <div className="flex items-center px-3 py-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-600">
                  +1
                </div>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                  placeholder="(555) 123-4567"
                  className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${validationErrors.phoneNumber ? 'border-red-300' : 'border-gray-300'
                    }`}
                />
              </div>
              {validationErrors.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.phoneNumber}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="registerPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.register ? "text" : "password"}
                  id="registerPassword"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  placeholder="Enter your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    validationErrors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('register')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.register ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                  placeholder="Confirm your password"
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm ${
                    validationErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword.confirm ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {validationErrors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                  Terms and Conditions
                </a>
                {' '}(optional)
              </label>
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

      {step === 'error' && (
        <div className="space-y-6">
          <div className="bg-red-50 p-6 rounded-lg text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-red-900 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-800 text-sm mb-4">
              {errorMessage}
            </p>
          </div>

          <button
            type="button"
            onClick={resetForm}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors cursor-pointer"
          >
            Try Again
          </button>

          <div className="text-center">
            <p className="text-gray-600 text-sm">
              If the problem persists, please contact our support team.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}