import React from 'react';
import { AppProvider } from './components/context/AppContext';
import AppLayout from './components/layout/AppLayout';
import './index.css';

function App() {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
}

export default App;