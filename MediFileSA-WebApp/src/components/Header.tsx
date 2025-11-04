
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Menu, Bell, User } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center">
        {toggleSidebar && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleSidebar}
            className="mr-2 md:hidden"
          >
            <Menu size={20} />
          </Button>
        )}
        <Logo />
      </div>
      
      {user && (
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-medical-light flex items-center justify-center">
                  <User size={16} className="text-medical-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user.fullName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
};

export default Header;
