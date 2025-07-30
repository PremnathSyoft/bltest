'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignInForm from '../../components/SignInForm';

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sign In to BlissDrive
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Access your account to book rides, track your trips, and manage your profile.
            </p>
          </div>

          <SignInForm />

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account? The system will automatically create one for you during sign-in.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}