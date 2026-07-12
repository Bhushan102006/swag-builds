import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Trip {
  id: string;
  source: string;
  destination: string;
  vehicle: string;
  driver: string;
  status: 'DRAFT' | 'DISPATCHED' | 'IN-TRANSIT' | 'CANCELLED' | 'COMPLETED';
  eta?: string;
  startedAt?: string;
  statusText?: string;
  date?: string;
  progress?: number;
  cargoWeight: number;
}

interface TripContextType {
  trips: Trip[];
  addTrip: (trip: Trip) => void;
  updateTrip: (id: string, updates: Partial<Trip>) => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: 'TR001',
      source: 'Gandhinagar Depot',
      destination: 'Ahmedabad Hub',
      vehicle: 'VAN-05',
      driver: 'Alex Mercer',
      status: 'DISPATCHED',
      eta: '45 min',
      cargoWeight: 300
    },
    {
      id: 'TR004',
      source: 'Vatva Industrial Area',
      destination: 'Sanand Warehouse',
      vehicle: 'TRUCK-11',
      driver: 'Suresh',
      status: 'IN-TRANSIT',
      startedAt: '2h ago',
      statusText: 'Near Sanand',
      progress: 75,
      cargoWeight: 3000
    },
    {
      id: 'TR006',
      source: 'Gandhinagar Depot',
      destination: 'Kalol Depot',
      vehicle: 'TRK-12',
      driver: 'Awaiting driver assignment',
      status: 'DRAFT',
      cargoWeight: 1200
    },
    {
      id: 'TR003',
      source: 'Ahmedabad Hub',
      destination: 'Baroda Depot',
      vehicle: 'VAN-05',
      driver: 'Alex Mercer',
      status: 'CANCELLED',
      statusText: 'Vehicle went to shop for urgent maintenance',
      date: '10 JUL 2026',
      cargoWeight: 400
    }
  ]);

  const addTrip = (trip: Trip) => setTrips(prev => [trip, ...prev]);
  
  const updateTrip = (id: string, updates: Partial<Trip>) => {
    setTrips(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  return (
    <TripContext.Provider value={{ trips, addTrip, updateTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrips() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrips must be used within a TripProvider');
  }
  return context;
}
