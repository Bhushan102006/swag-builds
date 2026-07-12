import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import VehicleRegistry from './components/VehicleRegistry';
import Maintenance from './components/Maintenance';
import Reports from './components/Reports';
import Trips from './components/Trips';
import Drivers from './components/Drivers';
import Settings from './components/Settings';

export type Screen = 'dashboard' | 'fleet' | 'trips' | 'drivers' | 'maintenance' | 'reports' | 'settings';
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
    else if (role === 'fleet_manager') fullName = 'Admin User'; // Matches screenshot "Admin User / Fleet Manager"
    
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

  // Ensure role has access to trips/drivers screen; if not, fall back to dashboard
  const hasTripsAccess = currentUser?.role === 'dispatcher' || currentUser?.role === 'safety_officer';
  const hasDriversAccess = currentUser?.role === 'fleet_manager' || currentUser?.role === 'safety_officer';
  
  let activeScreen = currentScreen;
  if (currentScreen === 'trips' && !hasTripsAccess) {
    activeScreen = 'dashboard';
  } else if (currentScreen === 'drivers' && !hasDriversAccess) {
    activeScreen = 'dashboard';
  }

  return (
    <Layout 
      currentScreen={activeScreen} 
      onNavigate={setCurrentScreen}
      user={currentUser}
      onLogout={handleLogout}
    >
      {activeScreen === 'dashboard' && <Dashboard />}
      {activeScreen === 'fleet' && <VehicleRegistry />}
      {activeScreen === 'trips' && <Trips role={currentUser?.role || 'dispatcher'} />}
      {activeScreen === 'drivers' && <Drivers />}
      {activeScreen === 'maintenance' && <Maintenance />}
      {activeScreen === 'reports' && <Reports />}
      {activeScreen === 'settings' && <Settings />}
    </Layout>
  );
}
