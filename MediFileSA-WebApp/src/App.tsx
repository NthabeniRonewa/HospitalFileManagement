import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";

// Layouts
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import VerifyOTP from "@/pages/VerifyOTP";
import Dashboard from "@/pages/Dashboard";
import UserManagement from "@/pages/UserManagement";
import AddUser from "@/pages/AddUser";
import NotFound from "@/pages/NotFound";
import AddPatient from "@/components/AddPatient";
import Settings from '@/components/Settings';
import XrayImagesPage from './pages/XrayImagesPage';

// New doctor-patient interaction page
import DoctorPatientInteraction from "@/components/DoctorPatientInteraction";
import DoctorDashboard from "@/pages/DoctorDashboard.tsx";
import Schedule from "@/pages/schedule.tsx";
import Profile from "@/pages/Profile.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public landing page */}
            <Route path="/" element={<Index />} />
            
            {/* Auth routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
            </Route>
            
            {/* Protected routes */}
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctorDashboard" element={<DoctorDashboard/>} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/users/add" element={<AddUser />} />
              <Route path="/doctor-patient" element={<DoctorPatientInteraction />} />
              <Route path="/add-patient" element={<AddPatient />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/xray-images" element={<XrayImagesPage />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/profile" element={<Profile/>} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
