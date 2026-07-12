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
import { canEdit, canView, Feature } from './accessControl';

export type Screen = Feature;
type AuthScreen = 'login' | 'signup';

export interface User {
  fullName: string;
  email: string;
  role: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [authScreen, setAuthScreen] = useState<AuthScreen>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');

  const handleLogin = (role: string, email: string) => {
    let fullName = 'Alex Mercer';
    if (role === 'dispatcher') fullName = 'Ranjit K.';
    else if (role === 'safety_officer') fullName = 'Sarah Connor';
    else if (role === 'financial_analyst') fullName = 'John Doe';
    
    const user: User = { fullName, email, role };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentScreen('dashboard');
  };

  const handleSignup = (role: string, email: string, fullName: string) => {
    const user: User = { fullName, email, role };
    setCurrentUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setAuthScreen('login');
  };

  if (!isLoggedIn) {
    if (authScreen === 'signup') {
      return (
        <Signup
          onSignup={handleSignup}
          onSwitchToLogin={() => setAuthScreen('login')}
        />
      );
    }
    return (
      <Login
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthScreen('signup')}
      />
    );
  }

  let activeScreen = currentScreen;
  if (currentScreen !== 'dashboard' && currentScreen !== 'settings' && currentScreen !== 'maintenance') {
    if (!canView(currentUser?.role || '', currentScreen)) {
       activeScreen = 'dashboard';
    }
  }

  return (
    <Layout 
      currentScreen={activeScreen} 
      onNavigate={setCurrentScreen}
      user={currentUser}
      onLogout={handleLogout}
    >
      {activeScreen === 'dashboard' && <Dashboard />}
      {activeScreen === 'fleet' && <VehicleRegistry readOnly={!canEdit(currentUser?.role || '', 'fleet')} />}
      {activeScreen === 'trips' && <Trips readOnly={!canEdit(currentUser?.role || '', 'trips')} role={currentUser?.role || ''} />}
      {activeScreen === 'drivers' && <Drivers readOnly={!canEdit(currentUser?.role || '', 'drivers')} />}
      {activeScreen === 'maintenance' && <Maintenance />}
      {activeScreen === 'fuel' && <Fuel readOnly={!canEdit(currentUser?.role || '', 'fuel')} />}
      {activeScreen === 'analytics' && <Analytics readOnly={!canEdit(currentUser?.role || '', 'analytics')} />}
      {activeScreen === 'settings' && <Settings />}
    </Layout>
  );
}
