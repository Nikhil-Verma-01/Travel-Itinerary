import React from 'react';
import { useApp } from '../context/AppContext';
import tripCover from '../../assets/images/trip-cover.jpg';

const ItineraryList = () => {
  const { setSelectedTrip } = useApp();

  // Sample data - replace with your actual data
  const trips = [
    {
      id: 1,
      destination: 'Paris',
      dateRange: {
        start: '2024-05-01',
        end: '2024-05-05'
      },
      activities: [],
      participants: [],
      image: tripCover
    }
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Trips</h2>
      <div className="space-y-4">
        {trips.map(trip => (
          <div
            key={trip.id}
            className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
            onClick={() => setSelectedTrip(trip)}
          >
            <div className="relative h-32 mb-3 rounded-lg overflow-hidden">
              <img 
                src={trip.image} 
                alt={trip.destination}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-medium">{trip.destination}</h3>
            <p className="text-sm text-gray-500">
              {new Date(trip.dateRange.start).toLocaleDateString()} - {new Date(trip.dateRange.end).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryList; 