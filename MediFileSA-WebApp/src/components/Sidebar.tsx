import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  UserCog,
  UserPlus,
  ClipboardList
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { user } = useAuth();

  const baseItems = user?.role !== 'doctor' ? [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
      link: '/dashboard',
    },
  ] : [];

  // Admin-specific menu items
  if (user?.role === 'admin') {
    return (
        <SidebarContent
            isOpen={isOpen}
            navItems={[
              ...baseItems,
              {
                title: 'User Management',
                icon: <UserCog size={20} />,
                link: '/users',
              },
              {
                title: 'Add User',
                icon: <UserPlus size={20} />,
                link: '/users/add',
              },
              {
                title: 'Add Patient',
                icon: <UserPlus size={20} />,
                link: '/add-patient',
              },
              {
                title: 'Settings',
                icon: <Settings size={20} />,
                link: '/settings',
              },
            ]}
        />
    );
  }

  // Doctor-specific menu items
  if (user?.role === 'doctor') {
    return (
        <SidebarContent
            isOpen={isOpen}
            navItems={[
              {
                title: 'Doctor Dashboard',
                icon: <LayoutDashboard size={20} />,
                link: '/doctordashboard',
              },
              {
                title: 'Add Patient',
                icon: <UserPlus size={20} />,
                link: '/add-patient',
              },
              {
                title: 'Drs & Nurses Interaction',
                icon: <UserCog size={20} />,
                link: '/doctor-patient',
              },
              {
                title: 'Patient Files',
                icon: <FileText size={20} />,
                link: '/patients',
              },
              {
                title: 'My Schedule',
                icon: <ClipboardList size={20} />,
                link: '/schedule',
              },
            ]}
        />
    );
  }

  // Facility admin-specific menu items
  if (user?.role === 'facility-admin') {
    return (
        <SidebarContent
            isOpen={isOpen}
            navItems={[
              ...baseItems,
              {
                title: 'Staff Management',
                icon: <Users size={20} />,
                link: '/staff',
              },
              {
                title: 'Facility Reports',
                icon: <ClipboardList size={20} />,
                link: '/reports',
              },
              {
                title: 'Settings',
                icon: <Settings size={20} />,
                link: '/settings',
              },
            ]}
        />
    );
  }

  // Default items (if no role matches)
  return <SidebarContent isOpen={isOpen} navItems={baseItems} />;
};

const SidebarContent = ({ isOpen, navItems }: { isOpen: boolean; navItems: { title: string, icon: JSX.Element, link: string }[] }) => {
  return (
      <div
          className={cn(
              "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 md:relative md:transform-none pt-20 md:pt-0",
              isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          )}
      >
        <div className="p-4">
          <div className="mb-8">
            <p className="text-xs font-medium text-gray-500 uppercase mb-2">Main Menu</p>
            <nav className="space-y-1">
              {navItems.map((item, index) => (
                  <NavLink
                      key={index}
                      to={item.link}
                      className={({ isActive }) => cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                          isActive
                              ? "bg-medical-accent text-medical-primary"
                              : "text-gray-600 hover:bg-gray-100"
                      )}
                  >
                    {item.icon}
                    <span>{item.title}</span>
                  </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
