import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VehicleRegistry from './components/VehicleRegistry';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';

export type Screen = 'dashboard' | 'fleet' | 'maintenance' | 'reports';
type AuthScreen = 'login' | 'signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  if (!isLoggedIn) {
    if (authScreen === 'signup') {
      return (
        <Signup
          onSignup={() => setIsLoggedIn(true)}
          onSwitchToLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <Login
        onLogin={() => setIsLoggedIn(true)}
        onSwitchToSignup={() => setAuthScreen('signup')}
      />
    );
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
