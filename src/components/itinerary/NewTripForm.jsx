import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useApp } from '../context/AppContext';

const NewTripForm = ({ onClose }) => {
  const { addTrip } = useApp();
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    image: '/api/placeholder/400/160'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.destination.trim()) {
      newErrors.destination = 'Destination is required';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    } else if (formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format the trip data
      const newTrip = {
        destination: formData.destination,
        dateRange: {
          start: formData.startDate,
          end: formData.endDate
        },
        image: formData.image,
        activities: [],
        participants: [
          { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/32/32" }
        ]
      };
      
      addTrip(newTrip);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Create New Trip</h2>
          <button 
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Destination */}
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                Destination
              </label>
              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="e.g., Paris, France"
                className={`w-full px-3 py-2 border ${
                  errors.destination ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.destination}
                onChange={handleChange}
              />
              {errors.destination && (
                <p className="mt-1 text-sm text-red-500">{errors.destination}</p>
              )}
            </div>
            
            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className={`w-full px-3 py-2 border ${
                    errors.startDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className={`w-full px-3 py-2 border ${
                    errors.endDate ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
            </div>
            
            {/* Optional Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image URL (Optional)
              </label>
              <input
                type="text"
                id="image"
                name="image"
                placeholder="http://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Trip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTripForm;