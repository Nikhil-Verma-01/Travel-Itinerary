import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);

  const closeThirdPane = () => {
    setSelectedTrip(null);
  };

  const deleteTrip = (tripId) => {
    // Implement delete functionality
    console.log('Deleting trip:', tripId);
  };

  return (
    <AppContext.Provider value={{ selectedTrip, setSelectedTrip, closeThirdPane, deleteTrip }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 