
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    role: user?.role || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send update request to backend
    console.log('Updated profile:', formData);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p className="text-gray-500 mb-6">Manage your account details</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>View and update your information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </div>
              <div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <Input
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  disabled
                  className="bg-gray-100 cursor-not-allowed"
                />
              </div>
<Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">
  Update Profile
</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;