import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VehicleRegistry from './components/VehicleRegistry';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';
import Drivers from './components/Drivers';
import Settings from './components/Settings';

export type Screen = 'dashboard' | 'fleet' | 'drivers' | 'maintenance' | 'reports' | 'settings';
type AuthScreen = 'login' | 'signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  if (!isLoggedIn) {
    if (authScreen === 'signup') {
      return (
        <Signup
          onSignup={(r) => { setIsLoggedIn(true); setUserRole(r); }}
          onSwitchToLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <Login
        onLogin={(r) => { setIsLoggedIn(true); setUserRole(r); }}
        onSwitchToSignup={() => setAuthScreen('signup')}
      />
    );
  }

  return (
    <Layout currentScreen={currentScreen} onNavigate={setCurrentScreen} userRole={userRole}>
      {currentScreen === 'dashboard' && <Dashboard />}
      {currentScreen === 'fleet' && <VehicleRegistry />}
      {currentScreen === 'drivers' && <Drivers />}
      {currentScreen === 'maintenance' && <Maintenance />}
      {currentScreen === 'reports' && <Reports />}
      {currentScreen === 'settings' && <Settings />}
    </Layout>
  );
}
