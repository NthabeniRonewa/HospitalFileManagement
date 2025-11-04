import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';

const MainLayout = () => {
  const { user, isLoading, isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />

        <div className="flex flex-1 relative">
          <Sidebar isOpen={isSidebarOpen} />

          <main
              className="flex-1 p-4 md:p-6 overflow-auto"
              onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
          >
            <Outlet />
          </main>
        </div>
      </div>
  );
};

export default MainLayout;