import React, { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useApp } from '../context/AppContext';
import { format } from 'date-fns';

const NewActivityForm = ({ onClose }) => {
  const { selectedTrip, updateTrip } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  // Generate array of dates within the trip date range
  const generateDateOptions = () => {
    if (!selectedTrip) return [];
    
    const dates = [];
    const start = new Date(selectedTrip.dateRange.start);
    const end = new Date(selectedTrip.dateRange.end);
    
    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      dates.push({
        value: format(date, 'yyyy-MM-dd'),
        label: format(date, 'EEEE, MMMM d, yyyy')
      });
    }
    
    return dates;
  };

  const dateOptions = generateDateOptions();

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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Activity name is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm() && selectedTrip) {
      // Create new activity
      const newActivity = {
        id: Date.now(),
        name: formData.name,
        date: formData.date,
        time: formData.time,
        notes: formData.notes
      };
      
      // Update trip with new activity
      const updatedTrip = {
        ...selectedTrip,
        activities: [...selectedTrip.activities, newActivity]
      };
      
      updateTrip(updatedTrip);
      onClose();
    }
  };

  if (!selectedTrip) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Add New Activity</h2>
          <button 
            className="p-1 text-gray-500 hover:bg-gray-100 rounded-full"
            onClick={onClose}
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Activity Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Activity Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="e.g., Visit Eiffel Tower"
                className={`w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            
            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <select
                id="date"
                name="date"
                className={`w-full px-3 py-2 border ${
                  errors.date ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.date}
                onChange={handleChange}
              >
                <option value="">Select a date</option>
                {dateOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.date && (
                <p className="mt-1 text-sm text-red-500">{errors.date}</p>
              )}
            </div>
            
            {/* Time */}
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                className={`w-full px-3 py-2 border ${
                  errors.time ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.time}
                onChange={handleChange}
              />
              {errors.time && (
                <p className="mt-1 text-sm text-red-500">{errors.time}</p>
              )}
            </div>
            
            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                placeholder="Any additional details about this activity..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.notes}
                onChange={handleChange}
              ></textarea>
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
              Add Activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewActivityForm;