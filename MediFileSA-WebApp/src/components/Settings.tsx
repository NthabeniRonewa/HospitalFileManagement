import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogOut, Bell, Shield, Mail } from 'lucide-react';

interface UserData {
  fullName?: string;
  username?: string;
  email?: string;
  role?: string;
  phone?: string;
}

const Settings = () => {
  const { user, logout } = useAuth() as { user: UserData; logout: () => void };
  const navigate = useNavigate();
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    app: true
  });

  // Contact information
  const [contactInfo, setContactInfo] = useState({
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validatePassword = () => {
    let valid = true;
    const newErrors = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
      valid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = 'New password is required';
      valid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
      valid = false;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setPasswordErrors(newErrors);
    return valid;
  };

  const handleChangePassword = () => {
    if (!validatePassword()) return;
    
    // Here you would typically call an API to change the password
    console.log('Password change request:', {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });

    // Mock success
    alert('Password changed successfully!');
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleNotificationChange = (type: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveContactInfo = () => {
    // Save contact information to backend
    alert('Contact information updated!');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Card className="shadow-md border border-gray-200">
        <CardHeader className="flex flex-row items-center gap-3 border-b">
          <div className="p-3 rounded-full bg-red-100">
            <User className="w-6 h-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl">Account Settings</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8 py-6 max-h-[calc(100vh-128px)] overflow-y-auto">
          {/* Profile Info */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{(user?.fullName || user?.fullName) ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user?.email ?? 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium capitalize">{user?.role?.toLowerCase() ?? 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Contact Information
            </h2>
            <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  placeholder="Enter your email"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={handleContactInfoChange}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>
              
              <Button 
                onClick={handleSaveContactInfo}
                className="bg-red-600 hover:bg-red-700"
              >
                Save Changes
              </Button>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </h2>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <Button
                    variant={notifications.email ? 'default' : 'outline'}
                    onClick={() => handleNotificationChange('email')}
                  >
                    {notifications.email ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">Receive text message alerts</p>
                  </div>
                  <Button
                    variant={notifications.sms ? 'default' : 'outline'}
                    onClick={() => handleNotificationChange('sms')}
                  >
                    {notifications.sms ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">In-App Notifications</p>
                    <p className="text-sm text-gray-500">Get alerts within the application</p>
                  </div>
                  <Button
                    variant={notifications.app ? 'default' : 'outline'}
                    onClick={() => handleNotificationChange('app')}
                  >
                    {notifications.app ? 'Enabled' : 'Disabled'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Change Password */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Change Password
            </h2>
            <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  className="mt-1"
                />
                {passwordErrors.currentPassword && (
                  <p className="text-sm text-red-500 mt-1">{passwordErrors.currentPassword}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password (min 8 characters)"
                  className="mt-1"
                />
                {passwordErrors.newPassword && (
                  <p className="text-sm text-red-500 mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Confirm new password"
                  className="mt-1"
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>
              
              <Button 
                onClick={handleChangePassword}
                className="bg-red-600 hover:bg-red-700"
              >
                Update Password
              </Button>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy & Security
            </h2>
            <div className="p-4 bg-white border border-gray-200 rounded-lg space-y-4">
              <Button variant="outline" className="w-full justify-start">
                View Privacy Policy
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Terms of Service
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Download Your Data
              </Button>
            </div>
          </div>

          {/* Logout */}
          <div className="space-y-4">
            <h2 className="font-semibold text-xl flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Account Actions
            </h2>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                >
                  Request Account Deletion
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleLogout}
                  className="w-full gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;