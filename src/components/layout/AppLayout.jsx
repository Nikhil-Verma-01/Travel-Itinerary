import React from 'react';
import { useApp } from '../context/AppContext';
import ItineraryList from './ItineraryList';
import DetailView from './DetailView';

const AppLayout = () => {
  const { selectedTrip } = useApp();

  return (
    <div className="h-screen flex">
      {/* Left Sidebar - Trip List */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <ItineraryList />
      </div>

      {/* Main Content - Trip Details */}
      <div className="flex-1 bg-gray-50">
        {selectedTrip ? (
          <DetailView />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-500">Select a trip to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppLayout;