import React from 'react';
import {
  HomeIcon,
  CalendarIcon,
  MapIcon,
  CogIcon,
  UserCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/outline';

const Sidebar = () => {
  const [active, setActive] = React.useState('trips');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'trips', label: 'My Trips', icon: CalendarIcon },
    { id: 'destinations', label: 'Destinations', icon: MapIcon },
    { id: 'settings', label: 'Settings', icon: CogIcon },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Logo and App Name */}
      <div className="px-6 py-6 flex items-center">
        <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <MapIcon className="h-5 w-5 text-white" />
        </div>
        <h1 className="ml-3 font-semibold text-lg">TravelPlanner</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`w-full flex items-center px-3 py-2 rounded-lg ${
                  active === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActive(item.id)}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Create New Trip Button */}
      <div className="px-3 py-4">
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          <span>Create New Trip</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="px-3 py-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            <UserCircleIcon className="h-8 w-8 text-gray-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-gray-500">alex@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;