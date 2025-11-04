import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Users, FileText, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-6">Welcome back, {user?.fullName}!</p>

      <div className="max-h-[calc(100vh-128px)] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-8 w-8 text-medical-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-gray-500">Active users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">New Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserPlus className="h-8 w-8 text-medical-secondary mr-3" />
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-gray-500">Last 7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Files</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-medical-primary mr-3" />
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-gray-500">Patient records</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-medical-secondary mr-3" />
                <div>
                  <div className="text-2xl font-bold">42</div>
                  <p className="text-xs text-gray-500">Files updated today</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3 shrink-0">
                      <FileText size={16} className="text-medical-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Patient file updated</p>
                      <p className="text-xs text-gray-500">Dr. Sarah Johnson updated Patient #1002{i} records</p>
                      <p className="text-xs text-gray-400">2 hour{i > 1 ? 's' : ''} ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>Users with access to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3">
                      <Users size={16} className="text-medical-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Admin Users</p>
                      <p className="text-xs text-gray-500">2 users</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3">
                      <Users size={16} className="text-medical-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Doctor Users</p>
                      <p className="text-xs text-gray-500">12 users</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2 border-b">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3">
                      <Users size={16} className="text-medical-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Nurse Users</p>
                      <p className="text-xs text-gray-500">8 users</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-medical-accent flex items-center justify-center mr-3">
                      <Users size={16} className="text-medical-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Facility Admin</p>
                      <p className="text-xs text-gray-500">2 users</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;