import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  XIcon,
  CalendarIcon,
  LocationMarkerIcon,
  UserGroupIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon
} from '@heroicons/react/outline';
import { useApp } from '../context/AppContext';

const DetailView = () => {
  const { selectedTrip, closeThirdPane, deleteTrip } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedTrip) {
    return (
      <div className="h-full flex justify-center items-center">
        <p className="text-gray-500">Select a trip to view details</p>
      </div>
    );
  }

  const { destination, dateRange, activities, participants = [] } = selectedTrip;
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Group activities by date
  const groupedActivities = activities.reduce((acc, activity) => {
    const date = activity.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(activity);
    return acc;
  }, {});

  // Sort dates
  const sortedDates = Object.keys(groupedActivities).sort();

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Trip Details</h2>
        <button 
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
          onClick={closeThirdPane}
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            className={`py-2 ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 ${activeTab === 'itinerary' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('itinerary')}
          >
            Itinerary
          </button>
          <button
            className={`py-2 ${activeTab === 'participants' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('participants')}
          >
            Participants
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div>
            <h3 className="text-lg font-medium mb-3">Trip Overview</h3>
            <p className="text-gray-600 mb-4">
              Your {duration}-day trip to {destination}. Explore the local sights, experience the culture, and create memories that will last a lifetime.
            </p>
            
            {/* Weather Preview */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <h4 className="font-medium mb-2">Weather Forecast</h4>
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-full mr-4">
                  <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium">75°F / 24°C</p>
                  <p className="text-sm text-gray-500">Sunny, clear skies</p>
                </div>
              </div>
            </div>
            
            {/* Map Preview */}
            <div className="mb-4">
              <h4 className="font-medium mb-2">Location</h4>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Map view of {destination}</p>
              </div>
            </div>
            
            {/* Quick Activities Preview */}
            <div>
              <h4 className="font-medium mb-2">Planned Activities</h4>
              <div className="space-y-2">
                {activities.slice(0, 3).map(activity => (
                  <div key={activity.id} className="p-3 bg-gray-50 rounded-lg flex justify-between">
                    <div>
                      <p className="font-medium">{activity.name}</p>
                      <p className="text-sm text-gray-500">{format(new Date(activity.date), 'MMM d')} • {activity.time}</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {activities.length > 3 && (
                  <button className="text-blue-600 hover:underline text-sm mt-2">
                    View all {activities.length} activities
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Itinerary</h3>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm">
                <PlusCircleIcon className="h-4 w-4 mr-1.5" />
                Add Activity
              </button>
            </div>
            
            {/* Itinerary Timeline */}
            <div className="space-y-6">
              {sortedDates.map(date => (
                <div key={date} className="border-l-2 border-blue-200 pl-4">
                  <h4 className="font-semibold mb-3 -ml-6 flex items-center">
                    <span className="h-4 w-4 bg-blue-500 rounded-full mr-2"></span>
                    {format(new Date(date), 'EEEE, MMMM d')}
                  </h4>
                  <div className="space-y-3">
                    {groupedActivities[date].map(activity => (
                      <div key={activity.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{activity.name}</p>
                            <p className="text-sm text-gray-500">{activity.time}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-blue-600">
                              <PencilIcon className="h-4 w-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'participants' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Participants</h3>
              <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center text-sm">
                <PlusCircleIcon className="h-4 w-4 mr-1.5" />
                Invite People
              </button>
            </div>
            
            {/* Participants List */}
            <div className="space-y-3">
              {participants.map(participant => (
                <div key={participant.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <img 
                      src={participant.avatar || '/api/placeholder/40/40'} 
                      alt={participant.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-500">{participant.id === 1 ? 'Trip Organizer' : 'Participant'}</p>
                    </div>
                  </div>
                  {participant.id !== 1 && (
                    <button className="text-gray-400 hover:text-red-600">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;