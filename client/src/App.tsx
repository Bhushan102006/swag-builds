import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VehicleRegistry from './components/VehicleRegistry';
import Maintenance from './components/Maintenance';
import Analytics from './components/Analytics';
import Drivers from './components/Drivers';
import Settings from './components/Settings';
import Trips from './components/Trips';
import Fuel from './components/Fuel';
import { canEdit, Feature } from './accessControl';

export type Screen = Feature;
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
      {currentScreen === 'fleet' && <VehicleRegistry readOnly={!canEdit(userRole, 'fleet')} />}
      {currentScreen === 'drivers' && <Drivers readOnly={!canEdit(userRole, 'drivers')} />}
      {currentScreen === 'trips' && <Trips readOnly={!canEdit(userRole, 'trips')} />}
      {currentScreen === 'maintenance' && <Maintenance />}
      {currentScreen === 'fuel' && <Fuel readOnly={!canEdit(userRole, 'fuel')} />}
      {currentScreen === 'analytics' && <Analytics readOnly={!canEdit(userRole, 'analytics')} />}
      {currentScreen === 'settings' && <Settings />}
    </Layout>
  );
}
