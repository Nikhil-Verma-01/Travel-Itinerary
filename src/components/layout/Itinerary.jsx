import React, { useState } from 'react';
import { SearchIcon, FilterIcon } from '@heroicons/react/outline';
import TripCard from './TripCard';
import { useApp } from '../context/AppContext';

const ItineraryList = () => {
  const { trips, loading, error, selectTrip } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

  // Filter and search trips
  const filteredTrips = trips.filter(trip => {
    // Search term filter
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const today = new Date();
    const endDate = new Date(trip.dateRange.end);
    const isPast = endDate < today;
    
    if (filter === 'upcoming' && isPast) return false;
    if (filter === 'past' && !isPast) return false;
    
    return matchesSearch;
  });

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">My Trips</h2>
      </div>

      {/* Search and Filter */}
      <div className="px-6 py-3 border-b border-gray-200 flex space-x-3">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search trips..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <button className="px-3 py-2 border border-gray-300 rounded-lg flex items-center hover:bg-gray-50">
          <FilterIcon className="h-5 w-5 text-gray-500 mr-2" />
          <span>Filter</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="px-6 py-2 border-b border-gray-200">
        <div className="flex space-x-6">
          <button
            className={`py-2 ${filter === 'all' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setFilter('all')}
          >
            All Trips
          </button>
          <button
            className={`py-2 ${filter === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`py-2 ${filter === 'past' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-500'}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
        </div>
      </div>

      {/* Trip List */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-gray-500">Loading trips...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredTrips.length === 0 ? (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-gray-500">No trips found.</p>
            <button className="mt-2 text-blue-600 hover:underline">Create a new trip</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredTrips.map(trip => (
              <TripCard 
                key={trip.id} 
                trip={trip} 
                onClick={selectTrip} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryList;