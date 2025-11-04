import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/components/ui/use-toast';

export type UserRole = 'admin' | 'doctor' | 'nurse' | 'facility-admin';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string, role: UserRole) => Promise<void>; // 👈 updated
  verifyOtp: (email: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('medifile_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      let user: User | null = null;

      // Mock users
      if (email === 'admin@example.com' && password === 'password') {
        user = {
          id: '1',
          fullName: 'Admin User',
          email,
          role: 'admin',
          verified: true,
        };
      } else if (email === 'doctor@example.com' && password === 'password') {
        user = {
          id: '2',
          fullName: 'Dr. John Doe',
          email,
          role: 'doctor',
          verified: true,
        };
      }

      if (user) {
        localStorage.setItem('medifile_user', JSON.stringify(user));
        setUser(user);
        toast({
          title: 'Login successful',
          description: `Welcome back, ${user.fullName}!`,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Login failed',
          description: 'Invalid email or password',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };


  const register = async (
      fullName: string,
      email: string,
      password: string,
      role: UserRole // 👈 new param
  ) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const tempUser: User = {
        id: Date.now().toString(),
        fullName,
        email,
        role, // 👈 use selected role
        verified: false
      };

      localStorage.setItem('medifile_pending_user', JSON.stringify(tempUser));

      toast({
        title: 'Registration successful',
        description: 'Please check your email for the OTP verification code.',
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: 'destructive',
        title: 'Registration failed',
        description: 'An error occurred during registration',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (otp === '123456') {
        const pendingUser = localStorage.getItem('medifile_pending_user');
        if (pendingUser) {
          const user: User = { ...JSON.parse(pendingUser), verified: true };
          localStorage.setItem('medifile_user', JSON.stringify(user));
          localStorage.removeItem('medifile_pending_user');
          setUser(user);

          toast({
            title: 'Verification successful',
            description: 'Your account has been verified. Welcome to InnovateSA Medifile!',
          });
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Verification failed',
          description: 'Invalid OTP code',
        });
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast({
        variant: 'destructive',
        title: 'Verification failed',
        description: 'An error occurred during verification',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('medifile_user');
    setUser(null);
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully',
    });
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    verifyOtp,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
