import React, { useState, useEffect } from 'react';
import { MoreVertical, PieChart, Truck, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTrips } from '../TripContext';
import { getDashboard, DashboardData } from '../api';

export default function Dashboard({ readOnlyTrips = false }: { readOnlyTrips?: boolean }) {
  const { trips } = useTrips();
  
  const [stats, setStats] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        console.error("Failed to load dashboard stats", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const driversOnDuty = stats ? stats.totalDrivers - stats.availableDrivers : 0;
  const pendingTrips = stats ? (stats.activeTrips + stats.completedTrips > 0 ? 3 /* mock pending */ : 0) : 0; // Backend doesn't explicitly have pending trips count, so we'll leave it as 0 or mock

  return (
    <div className="p-lg space-y-lg relative">
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-gutter">
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Fleet Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-headline-md font-headline-md text-primary">
              {isLoading ? '--' : stats?.totalVehicles}
            </span>
          </div>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Available</span>
          <span className="text-headline-md font-headline-md text-primary">
            {isLoading ? '--' : stats?.availableVehicles}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">In Shop</span>
          <span className="text-headline-md font-headline-md text-error">
            {isLoading ? '--' : stats?.inShopVehicles}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Active Trips</span>
          <span className="text-headline-md font-headline-md text-secondary">
            {isLoading ? '--' : stats?.activeTrips}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Total Drivers</span>
          <span className="text-headline-md font-headline-md text-outline">
            {isLoading ? '--' : stats?.totalDrivers}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Drivers On Duty</span>
          <span className="text-headline-md font-headline-md text-primary">
            {isLoading ? '--' : driversOnDuty}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col items-center justify-center gap-2 h-32">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-high" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
              <circle className="text-depot-amber" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" 
                strokeDasharray="175.9" 
                strokeDashoffset={stats ? 175.9 - (175.9 * stats.fleetUtilization) / 100 : 175.9} 
                strokeWidth="4">
              </circle>
            </svg>
            <span className="absolute text-label-sm font-bold">
              {isLoading ? '--' : `${Math.round(stats?.fleetUtilization || 0)}%`}
            </span>
          </div>
          <span className="text-[10px] font-label-sm text-outline uppercase">Utilization</span>
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-gutter">
        <div className="flex items-center gap-sm">
          <label className="text-label-sm font-label-sm text-outline">Vehicle Type:</label>
          <select className="bg-surface hairline rounded-lg px-3 py-1.5 text-body-md focus:ring-signal-blue outline-none border-none shadow-sm">
            <option>All Types</option>
            <option>Heavy Truck</option>
          </select>
        </div>
      </section>

      <div className="grid grid-cols-12 gap-lg">
        <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest hairline rounded-xl overflow-hidden flex flex-col">
          <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
            <h3 className="text-headline-sm font-headline-sm">Recent Trips</h3>
            <button className="text-secondary text-label-md font-label-md hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Trip ID</th>
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Vehicle</th>
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Driver</th>
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Status</th>
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Date</th>
                  <th className="px-lg py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {trips.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-lg py-8 text-center text-on-surface-variant">
                      No recent trips
                    </td>
                  </tr>
                ) : (
                  trips.slice(0, 5).map((trip) => (
                    <tr key={trip._id} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-lg py-4 font-mono-md text-mono-md">...{trip._id.substring(trip._id.length - 6)}</td>
                      <td className="px-lg py-4 text-body-md font-medium text-on-surface">{trip.vehicle?.registrationNumber || 'Unknown'}</td>
                      <td className="px-lg py-4 text-body-md text-on-surface-variant">{trip.driver?.name || 'Unknown'}</td>
                      <td className="px-lg py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          trip.status === 'Completed' ? 'bg-emerald-50 text-emerald-800' :
                          trip.status === 'Cancelled' ? 'bg-error-container/30 text-error' :
                          trip.status === 'Draft' ? 'bg-surface-container-high text-on-surface-variant' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-lg py-4 font-mono-md text-mono-md text-outline">
                        {new Date(trip.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-lg py-4 text-right"><MoreVertical size={16} className="text-outline cursor-pointer hover:text-secondary" /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-lg">
          <div className="bg-surface-container-lowest hairline rounded-xl p-lg">
            <div className="flex items-center justify-between mb-xl">
              <h3 className="text-headline-sm font-headline-sm">Vehicle Status</h3>
              <PieChart size={20} className="text-outline" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-label-sm font-bold">
                  <span className="text-outline uppercase">Available</span>
                  <span>{isLoading ? '--' : stats?.availableVehicles} Units</span>
                </div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 transition-all" style={{width: `${isLoading || !stats?.totalVehicles ? 0 : (stats.availableVehicles / stats.totalVehicles) * 100}%`}}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-label-sm font-bold">
                  <span className="text-outline uppercase">On Trip</span>
                  <span>{isLoading ? '--' : stats?.onTripVehicles} Units</span>
                </div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-signal-blue transition-all" style={{width: `${isLoading || !stats?.totalVehicles ? 0 : (stats.onTripVehicles / stats.totalVehicles) * 100}%`}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
