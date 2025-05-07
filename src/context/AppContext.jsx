import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const AppContext = createContext();

// Mock API call
const fetchTrips = async () => {
  // In a real app, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          destination: "Paris, France",
          dateRange: { start: "2025-05-15", end: "2025-05-22" },
          image: "/api/placeholder/400/160",
          activities: [
            { id: 101, name: "Eiffel Tower Visit", time: "10:00", date: "2025-05-16" },
            { id: 102, name: "Louvre Museum", time: "14:00", date: "2025-05-16" },
            { id: 103, name: "Seine River Cruise", time: "19:00", date: "2025-05-17" },
          ],
          participants: [
            { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
            { id: 2, name: "Maria Garcia", avatar: "/api/placeholder/32/32" },
            { id: 3, name: "James Smith", avatar: "/api/placeholder/32/32" },
            { id: 4, name: "Emma Wilson", avatar: "/api/placeholder/32/32" },
          ]
        },
        {
          id: 2,
          destination: "Tokyo, Japan",
          dateRange: { start: "2025-06-10", end: "2025-06-18" },
          image: "/api/placeholder/400/160",
          activities: [
            { id: 201, name: "Tokyo Tower", time: "11:00", date: "2025-06-11" },
            { id: 202, name: "Shibuya Crossing", time: "15:00", date: "2025-06-11" },
            { id: 203, name: "Shinjuku Gyoen Park", time: "10:00", date: "2025-06-12" },
          ],
          participants: [
            { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
            { id: 5, name: "David Chen", avatar: "/api/placeholder/32/32" },
          ]
        },
        {
          id: 3,
          destination: "New York City, USA",
          dateRange: { start: "2025-07-05", end: "2025-07-10" },
          image: "/api/placeholder/400/160",
          activities: [
            { id: 301, name: "Central Park Walk", time: "09:00", date: "2025-07-06" },
            { id: 302, name: "Empire State Building", time: "14:00", date: "2025-07-06" },
            { id: 303, name: "Broadway Show", time: "19:30", date: "2025-07-07" },
          ],
          participants: [
            { id: 1, name: "Alex Johnson", avatar: "/api/placeholder/32/32" },
            { id: 6, name: "Sophie Brown", avatar: "/api/placeholder/32/32" },
            { id: 7, name: "Michael Lee", avatar: "/api/placeholder/32/32" },
          ]
        }
      ]);
    }, 800);
  });
};

// Context provider component
export const AppProvider = ({ children }) => {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [thirdPaneOpen, setThirdPaneOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trips on component mount
  useEffect(() => {
    const getTrips = async () => {
      try {
        setLoading(true);
        const data = await fetchTrips();
        setTrips(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch trips. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrips();
  }, []);

  // Select a trip and open the third pane
  const selectTrip = (trip) => {
    setSelectedTrip(trip);
    setThirdPaneOpen(true);
  };

  // Toggle the third pane
  const toggleThirdPane = () => {
    setThirdPaneOpen(!thirdPaneOpen);
  };

  // Close the third pane
  const closeThirdPane = () => {
    setThirdPaneOpen(false);
  };

  // Add a new trip
  const addTrip = (newTrip) => {
    setTrips([...trips, { ...newTrip, id: Date.now() }]);
  };

  // Update a trip
  const updateTrip = (updatedTrip) => {
    setTrips(trips.map(trip => 
      trip.id === updatedTrip.id ? updatedTrip : trip
    ));
    
    if (selectedTrip && selectedTrip.id === updatedTrip.id) {
      setSelectedTrip(updatedTrip);
    }
  };

  // Delete a trip
  const deleteTrip = (tripId) => {
    setTrips(trips.filter(trip => trip.id !== tripId));
    
    if (selectedTrip && selectedTrip.id === tripId) {
      setSelectedTrip(null);
      setThirdPaneOpen(false);
    }
  };

  // Context value
  const value = {
    trips,
    selectedTrip,
    thirdPaneOpen,
    loading,
    error,
    selectTrip,
    toggleThirdPane,
    closeThirdPane,
    addTrip,
    updateTrip,
    deleteTrip
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the App context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};