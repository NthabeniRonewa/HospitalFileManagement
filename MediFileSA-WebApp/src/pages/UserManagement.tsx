import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Filter, Search, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

// Mock user data
const mockUsers = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@example.com', role: 'doctor', status: 'active' },
  { id: 2, name: 'Nurse Michael Chen', email: 'michael.chen@example.com', role: 'nurse', status: 'active' },
  { id: 3, name: 'Admin David Wilson', email: 'david.wilson@example.com', role: 'admin', status: 'active' },
  { id: 4, name: 'Dr. Emily Santos', email: 'emily.santos@example.com', role: 'doctor', status: 'inactive' },
  { id: 5, name: 'Facility Admin Jessica Lee', email: 'jessica.lee@example.com', role: 'facility-admin', status: 'active' },
   { id: 6, name: 'Dr. John Doe', email: 'john.doe@example.com', role: 'doctor', status: 'active' },
  { id: 7, name: 'Nurse Jane Smith', email: 'jane.smith@example.com', role: 'nurse', status: 'active' },
  { id: 8, name: 'Admin Robert Brown', email: 'robert.brown@example.com', role: 'admin', status: 'active' },
  { id: 9, name: 'Dr. Maria Garcia', email: 'maria.garcia@example.com', role: 'doctor', status: 'inactive' },
  { id: 10, name: 'Facility Admin Tom Clark', email: 'tom.clark@example.com', role: 'facility-admin', status: 'active' },
  { id: 11, name: 'Dr. Anna White', email: 'anna.white@example.com', role: 'doctor', status: 'active' },
  
];

const UserManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">User Management</h1>
          <p className="text-gray-500">Manage all users of the system</p>
        </div>
        <Button 
          onClick={() => navigate('/users/add')}
          className="medifile-btn-primary flex items-center gap-2"
        >
          <UserPlus size={16} />
          <span>Add User</span>
        </Button>
      </div>

      <div className="max-h-[calc(100vh-128px)] overflow-y-auto">
        <Card className="overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filter</span>
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="font-medium">{user.name}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'doctor'
                          ? 'bg-blue-100 text-blue-800'
                          : user.role === 'nurse'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.role.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 5 of 5 users
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;