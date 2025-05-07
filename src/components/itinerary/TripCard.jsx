import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, LocationMarkerIcon, UserGroupIcon } from '@heroicons/react/outline';

const TripCard = ({ trip, onClick }) => {
  const { destination, dateRange, image, participants = [] } = trip;
  const startDate = new Date(dateRange.start);
  const endDate = new Date(dateRange.end);
  const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={() => onClick(trip)}
    >
      {/* Trip Image */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={image || '/api/placeholder/400/160'} 
          alt={destination} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-semibold text-lg">{destination}</h3>
        </div>
      </div>

      {/* Trip Info */}
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-2">
          <CalendarIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">
            {format(startDate, 'MMM d')} - {format(endDate, 'MMM d, yyyy')} · {duration} {duration === 1 ? 'day' : 'days'}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <LocationMarkerIcon className="h-4 w-4 mr-2" />
          <span className="text-sm">{destination}</span>
        </div>

        {/* Participants */}
        {participants.length > 0 && (
          <div className="flex items-center mt-3">
            <div className="flex -space-x-2 mr-2">
              {participants.slice(0, 3).map((participant, index) => (
                <img 
                  key={index}
                  src={participant.avatar || '/api/placeholder/32/32'} 
                  alt={participant.name}
                  className="w-6 h-6 rounded-full border border-white"
                />
              ))}
            </div>
            {participants.length > 3 && (
              <span className="text-xs text-gray-500">
                +{participants.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Trip Status */}
        <div className="flex justify-between items-center mt-3">
          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
            {new Date() > endDate ? 'Completed' : 'Upcoming'}
          </span>
          <span className="text-gray-400 text-sm">
            {new Date() > endDate ? 'Archived' : 'Active'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TripCard;