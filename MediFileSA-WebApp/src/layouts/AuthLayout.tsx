
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Logo from '@/components/Logo';
import { useAuth } from '@/context/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-subtle">
          <div className="h-8 w-32 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    );
  }

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - image/branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-medical-primary p-12 flex-col justify-between">
        <div>
          <Logo className="text-white" />
        </div>
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-4">Welcome to InnovateSA Medifile</h1>
          <p className="text-lg opacity-90 mb-8">
            A secure electronic file management system for healthcare facilities.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Secure Electronic Records</h3>
                <p className="text-sm opacity-75">Protect patient data with our secure system</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Easy and Fast Access</h3>
                <p className="text-sm opacity-75">Access patient files anywhere, anytime</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Streamlined Workflows</h3>
                <p className="text-sm opacity-75">Optimize healthcare processes</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-white/70 text-sm">
          © 2025 InnovateSA. All rights reserved.
        </div>
      </div>
      
      {/* Right side - auth forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
