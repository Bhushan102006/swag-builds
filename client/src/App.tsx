import React, { useState } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VehicleRegistry from './components/VehicleRegistry';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';

export type Screen = 'dashboard' | 'fleet' | 'maintenance' | 'reports';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen}>
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'fleet' && <VehicleRegistry />}
      {currentScreen === 'maintenance' && <Maintenance />}
      {currentScreen === 'reports' && <Reports />}
    </Layout>
  );
}
