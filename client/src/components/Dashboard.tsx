import React, { useState } from 'react';
import { MoreVertical, PieChart, Truck, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { useTrips } from '../TripContext';

export default function Dashboard({ readOnlyTrips = false }: { readOnlyTrips?: boolean }) {
  const { trips, addTrip } = useTrips();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal Form State
  const [source, setSource] = useState('Gandhinagar Depot');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('VAN-05');
  const [cargoWeight, setCargoWeight] = useState<number>(300);
  const [plannedDistance, setPlannedDistance] = useState<number>(38);

  const vehiclesInfo: Record<string, { name: string; capacity: number }> = {
    'VAN-05': { name: 'VAN-05 (500 kg)', capacity: 500 },
    'TRUCK-11': { name: 'TRUCK-11 (5 Ton)', capacity: 5000 },
    'TRK-12': { name: 'TRK-12 (2 Ton)', capacity: 2000 },
  };

  const currentCapacity = vehiclesInfo[selectedVehicle]?.capacity || 500;
  const loadPercentage = Math.min(Math.round((cargoWeight / currentCapacity) * 100), 100);
  const isOverloaded = cargoWeight > currentCapacity;

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination) {
      alert("Please select a destination");
      return;
    }
    if (isOverloaded) {
      alert("Cannot dispatch: cargo exceeds vehicle capacity!");
      return;
    }

    const nextIdNum = Math.max(...trips.map(t => parseInt(t.id.replace('TR', '')))) + 1;
    const nextId = `TR${String(nextIdNum).padStart(3, '0')}`;

    addTrip({
      id: nextId,
      source,
      destination,
      vehicle: selectedVehicle,
      driver: 'Ranjit K.',
      status: 'DISPATCHED',
      eta: `${Math.round(plannedDistance * 1.2)} min`,
      cargoWeight
    });

    setIsModalOpen(false);
    // Reset Form fields
    setDestination('');
    setCargoWeight(300);
    setPlannedDistance(38);
  };

  return (
    <div className="p-lg space-y-lg relative">
      <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-gutter">
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Fleet Active</span>
          <div className="flex items-baseline gap-2">
            <span className="text-headline-md font-headline-md text-primary">53</span>
            <span className="text-xs text-green-600 font-bold">+2.4%</span>
          </div>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Available</span>
          <span className="text-headline-md font-headline-md text-primary">42</span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Maintenance</span>
          <span className="text-headline-md font-headline-md text-error">05</span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Active Trips</span>
          <span className="text-headline-md font-headline-md text-secondary">
            {trips.filter(t => t.status === 'DISPATCHED' || t.status === 'IN-TRANSIT').length}
          </span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Pending</span>
          <span className="text-headline-md font-headline-md text-outline">09</span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32">
          <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Drivers On Duty</span>
          <span className="text-headline-md font-headline-md text-primary">26</span>
        </div>
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col items-center justify-center gap-2 h-32">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle className="text-surface-container-high" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeWidth="4"></circle>
              <circle className="text-depot-amber" cx="32" cy="32" fill="transparent" r="28" stroke="currentColor" strokeDasharray="175.9" strokeDashoffset="33.4" strokeWidth="4"></circle>
            </svg>
            <span className="absolute text-label-sm font-bold">81%</span>
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
        {!readOnlyTrips && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="ml-auto bg-depot-amber text-primary-container px-6 py-2 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity"
          >
            Create New Trip
          </button>
        )}
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
                  <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">ETA</th>
                  <th className="px-lg py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {trips.slice(0, 5).map((trip) => (
                  <tr key={trip.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="px-lg py-4 font-mono-md text-mono-md">{trip.id}</td>
                    <td className="px-lg py-4 text-body-md font-medium text-on-surface">{trip.vehicle}</td>
                    <td className="px-lg py-4 text-body-md text-on-surface-variant">{trip.driver}</td>
                    <td className="px-lg py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        trip.status === 'IN-TRANSIT' ? 'bg-green-100 text-green-700' :
                        trip.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800' :
                        trip.status === 'CANCELLED' ? 'bg-error-container/30 text-error' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {trip.status}
                      </span>
                    </td>
                    <td className="px-lg py-4 font-mono-md text-mono-md text-outline">{trip.eta || '--'}</td>
                    <td className="px-lg py-4 text-right"><MoreVertical size={16} className="text-outline cursor-pointer hover:text-secondary" /></td>
                  </tr>
                ))}
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
                <div className="flex justify-between text-label-sm font-bold"><span className="text-outline uppercase">Available</span><span>42 Units</span></div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: '70%'}}></div></div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-label-sm font-bold"><span className="text-outline uppercase">On Trip</span><span>18 Units</span></div>
                <div className="h-3 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-signal-blue" style={{width: '30%'}}></div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-[100] backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <h3 className="text-headline-md font-headline-md text-on-surface">Dispatch New Trip</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-highest text-on-surface hover:bg-outline-variant transition-colors"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleDispatchSubmit} className="p-lg space-y-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Source</label>
                  <select 
                    value={source} 
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  >
                    <option value="Gandhinagar Depot">Gandhinagar Depot</option>
                    <option value="Vatva Industrial Area">Vatva Industrial Area</option>
                    <option value="Ahmedabad Hub">Ahmedabad Hub</option>
                  </select>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Destination</label>
                  <select 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  >
                    <option value="" disabled>Select Destination...</option>
                    <option value="Ahmedabad Hub">Ahmedabad Hub</option>
                    <option value="Sanand Warehouse">Sanand Warehouse</option>
                    <option value="Baroda Depot">Baroda Depot</option>
                  </select>
                </div>
              </div>

              <div className="space-y-xs">
                <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Vehicle Selection</label>
                <div className="relative">
                  <select 
                    value={selectedVehicle} 
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg pl-3 pr-10 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all appearance-none"
                  >
                    <option value="VAN-05">VAN-05 (500 kg capacity)</option>
                    <option value="TRUCK-11">TRUCK-11 (5 Ton capacity)</option>
                    <option value="TRK-12">TRK-12 (2 Ton capacity)</option>
                  </select>
                  <Truck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Cargo Weight (KG)</label>
                  <input 
                    type="number" 
                    value={cargoWeight} 
                    onChange={(e) => setCargoWeight(Math.max(0, parseInt(e.target.value) || 0))}
                    className={`w-full bg-surface border ${isOverloaded ? 'border-error text-error focus:ring-error/20' : 'border-outline-variant focus:ring-secondary/20'} rounded-lg px-3 py-2 text-body-md focus:ring-2 outline-none transition-all`}
                  />
                  {isOverloaded && <span className="text-xs text-error font-bold flex items-center gap-1 mt-1"><AlertCircle size={12}/> Exceeds vehicle capacity!</span>}
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Planned Distance (KM)</label>
                  <input 
                    type="number" 
                    value={plannedDistance} 
                    onChange={(e) => setPlannedDistance(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-outline-variant mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 hover:bg-surface-container rounded-lg text-button-md font-bold transition-all text-on-surface-variant font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isOverloaded || !destination}
                  className="px-6 py-2.5 bg-depot-amber text-primary-container font-button-md rounded-lg font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                >
                  Confirm Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
