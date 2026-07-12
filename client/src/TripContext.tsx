import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTrips, Trip, createTrip, dispatchTrip, cancelTrip, completeTrip } from './api';

interface TripContextType {
  trips: Trip[];
  isLoading: boolean;
  refreshTrips: () => Promise<void>;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const refreshTrips = async () => {
    setIsLoading(true);
    try {
      const res = await getTrips();
      setTrips(res.trips);
    } catch (err) {
      console.error('Failed to load trips:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshTrips();
  }, []);

  return (
    <TripContext.Provider value={{ trips, isLoading, refreshTrips }}>
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
