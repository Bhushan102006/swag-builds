import React, { useState, useEffect } from 'react';
import { 
  Plus, MapPin, Activity, CheckCircle2, Truck, AlertCircle, 
  ChevronRight, Navigation, X, Clock, Lock
} from 'lucide-react';
import { useTrips } from '../TripContext';
import { getVehicles, getDrivers, Vehicle, Driver, createTrip, dispatchTrip, completeTrip, cancelTrip } from '../api';

interface TripsProps {
  role: string;
  readOnly?: boolean;
}

// Nodes for the SVG network map
interface MapNode {
  name: string;
  x: number;
  y: number;
}

const MAP_NODES: Record<string, MapNode> = {
  "Gandhinagar Depot": { name: "Gandhinagar", x: 140, y: 60 },
  "Kalol Depot": { name: "Kalol", x: 60, y: 100 },
  "Sanand Warehouse": { name: "Sanand", x: 80, y: 220 },
  "Ahmedabad Hub": { name: "Ahmedabad", x: 220, y: 150 },
  "Vatva Industrial Area": { name: "Vatva", x: 260, y: 220 },
  "Baroda Depot": { name: "Baroda", x: 340, y: 310 },
};

const MAP_ROUTES = [
  { from: "Gandhinagar Depot", to: "Kalol Depot" },
  { from: "Gandhinagar Depot", to: "Ahmedabad Hub" },
  { from: "Ahmedabad Hub", to: "Vatva Industrial Area" },
  { from: "Vatva Industrial Area", to: "Sanand Warehouse" },
  { from: "Ahmedabad Hub", to: "Baroda Depot" },
];

export default function Trips({ role, readOnly = false }: TripsProps) {
  const isSafetyOfficer = readOnly;

  const { trips, isLoading, refreshTrips } = useTrips();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  // Form State
  const [source, setSource] = useState('Gandhinagar Depot');
  const [destination, setDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedDriver, setSelectedDriver] = useState('');
  const [cargoWeight, setCargoWeight] = useState<number>(300);
  const [plannedDistance, setPlannedDistance] = useState<number>(38);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<'all' | 'Draft' | 'Dispatched' | 'Completed' | 'Cancelled'>('all');
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch available vehicles and drivers for the dropdowns
    getVehicles({ status: 'Available' }).then(res => {
      setVehicles(res.vehicles);
      if (res.vehicles.length > 0) setSelectedVehicle(res.vehicles[0]._id);
    });
    getDrivers({ status: 'Available' }).then(res => {
      setDrivers(res.drivers);
      if (res.drivers.length > 0) setSelectedDriver(res.drivers[0]._id);
    });
  }, []);

  // Compute selected vehicle's capacity
  const currentVehicleObj = vehicles.find(v => v._id === selectedVehicle);
  const currentCapacity = currentVehicleObj ? currentVehicleObj.maxLoadCapacity : 500;
  const loadPercentage = Math.min(Math.round((cargoWeight / currentCapacity) * 100), 200);
  const isOverloaded = cargoWeight > currentCapacity;

  const handleDispatchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSafetyOfficer) return;
    if (!destination || !selectedVehicle || !selectedDriver) {
      alert("Please fill all fields");
      return;
    }
    if (isOverloaded) {
      alert("Cannot dispatch: cargo exceeds vehicle capacity!");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await createTrip({
        source,
        destination,
        vehicle: selectedVehicle,
        driver: selectedDriver,
        cargoWeight,
        plannedDistance
      });
      
      setSuccessMessage(`Trip created successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
      
      setDestination('');
      setCargoWeight(300);
      setPlannedDistance(38);
      
      await refreshTrips();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to create trip');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = async (tripId: string, action: 'dispatch' | 'complete' | 'cancel') => {
    if (isSafetyOfficer) return;
    try {
      if (action === 'dispatch') await dispatchTrip(tripId);
      if (action === 'complete') await completeTrip(tripId);
      if (action === 'cancel') await cancelTrip(tripId);
      await refreshTrips();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || `Failed to ${action} trip`);
    }
  };

  const filteredTrips = trips.filter(trip => {
    return statusFilter === 'all' || trip.status === statusFilter;
  });

  const activeTripsCount = trips.filter(t => t.status === 'Dispatched').length;

  const activeTrip = trips.find(t => t._id === selectedTripId);
  const activeSource = activeTrip?.source || '';
  const activeDestination = activeTrip?.destination || '';

  const activeSourceNode = MAP_NODES[activeSource] || MAP_NODES[source];
  const activeDestNode = MAP_NODES[activeDestination] || MAP_NODES[destination] || MAP_NODES["Ahmedabad Hub"];

  return (
    <div className="p-lg space-y-lg flex flex-col h-full overflow-y-auto">
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-gutter shrink-0">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface flex items-center gap-3">
            Trip Dispatcher
            {readOnly && <span className="text-[12px] bg-surface-container-high text-outline px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 leading-none"><Lock size={12} /> View Only</span>}
          </h2>
          <p className="text-body-md text-on-surface-variant mt-1">Manage real-time logistics and dispatch new vehicle routes.</p>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl px-lg py-md flex items-center justify-between gap-6 shadow-sm">
          {[
            { step: 1, filter: 'Draft', label: 'Draft' },
            { step: 2, filter: 'Dispatched', label: 'Dispatched' },
            { step: 3, filter: 'Completed', label: 'Completed' },
            { step: 4, filter: 'Cancelled', label: 'Cancelled' },
          ].map((item) => {
            const isActive = statusFilter === item.filter;
            return (
              <button
                key={item.step}
                onClick={() => setStatusFilter(statusFilter === item.filter ? 'all' : (item.filter as any))}
                className="flex items-center gap-2 group transition-all"
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  isActive 
                    ? 'bg-secondary text-white ring-4 ring-secondary/20' 
                    : 'bg-surface-container-high text-on-surface-variant group-hover:bg-outline-variant/30'
                }`}>
                  {item.step}
                </div>
                <div className="text-left">
                  <p className={`text-label-sm font-bold ${isActive ? 'text-secondary' : 'text-on-surface-variant'}`}>{item.label}</p>
                </div>
                {item.step < 4 && <ChevronRight size={14} className="text-outline-variant mx-1" />}
              </button>
            );
          })}
          {statusFilter !== 'all' && (
            <button 
              onClick={() => setStatusFilter('all')}
              className="text-xs text-secondary font-semibold hover:underline flex items-center gap-0.5 ml-2 border-l border-outline-variant pl-3"
            >
              Clear <X size={12} />
            </button>
          )}
        </div>
      </section>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-md flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="text-green-600 shrink-0" size={20} />
          <p className="text-label-md font-semibold">{successMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg items-start">
        <div className="lg:col-span-6 space-y-lg">
          <div className="bg-surface-container-lowest hairline rounded-xl p-lg shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[4px] bg-secondary"></div>
            
            <div className="flex items-center gap-sm mb-lg">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Plus size={18} />
              </div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Create New Trip</h3>
            </div>

            {isSafetyOfficer && (
              <div className="mb-md p-md bg-error-container/20 border border-error/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-error shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-label-sm font-bold text-on-error-container uppercase tracking-wider">Safety Officer Access Only</p>
                  <p className="text-body-md text-on-error-container/90 mt-0.5">Your role is limited to view-only logs. Dispatching and route creations are disabled.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleDispatchSubmit} className="space-y-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Source</label>
                  <select 
                    value={source} 
                    onChange={(e) => setSource(e.target.value)}
                    disabled={isSafetyOfficer}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all disabled:opacity-60"
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
                    disabled={isSafetyOfficer}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all disabled:opacity-60"
                  >
                    <option value="" disabled>Select Destination...</option>
                    <option value="Ahmedabad Hub">Ahmedabad Hub</option>
                    <option value="Sanand Warehouse">Sanand Warehouse</option>
                    <option value="Kalol Depot">Kalol Depot</option>
                    <option value="Baroda Depot">Baroda Depot</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Vehicle</label>
                  <div className="relative">
                    <select 
                      value={selectedVehicle} 
                      onChange={(e) => setSelectedVehicle(e.target.value)}
                      disabled={isSafetyOfficer}
                      className="w-full bg-surface border border-outline-variant rounded-lg pl-3 pr-10 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all appearance-none disabled:opacity-60"
                    >
                      <option value="" disabled>Select Vehicle...</option>
                      {vehicles.map(v => (
                        <option key={v._id} value={v._id}>{v.registrationNumber} ({v.maxLoadCapacity} kg)</option>
                      ))}
                    </select>
                    <Truck size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Driver</label>
                  <select 
                    value={selectedDriver} 
                    onChange={(e) => setSelectedDriver(e.target.value)}
                    disabled={isSafetyOfficer}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all disabled:opacity-60"
                  >
                    <option value="" disabled>Select Driver...</option>
                    {drivers.map(d => (
                      <option key={d._id} value={d._id}>{d.name} ({d.licenseCategory})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Cargo Weight (KG)</label>
                  <input 
                    type="number" 
                    value={cargoWeight} 
                    onChange={(e) => setCargoWeight(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={isSafetyOfficer}
                    className={`w-full bg-surface border ${isOverloaded ? 'border-error text-error focus:ring-error/20 focus:border-error' : 'border-outline-variant focus:ring-secondary/20 focus:border-secondary'} rounded-lg px-3 py-2 text-body-md outline-none transition-all disabled:opacity-60`}
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Planned Distance (KM)</label>
                  <input 
                    type="number" 
                    value={plannedDistance} 
                    onChange={(e) => setPlannedDistance(Math.max(0, parseInt(e.target.value) || 0))}
                    disabled={isSafetyOfficer}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2 text-body-md outline-none transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-md border border-outline-variant/60 space-y-3">
                <div className="flex justify-between text-label-sm font-bold">
                  <span className="text-outline uppercase">Vehicle Capacity:</span>
                  <span className="text-on-surface font-mono-md">{currentCapacity} kg</span>
                </div>
                
                <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-300 rounded-full ${
                      isOverloaded ? 'bg-error' : 'bg-secondary'
                    }`} 
                    style={{ width: `${Math.min(loadPercentage, 100)}%` }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-label-sm">
                  <span className={`font-semibold ${isOverloaded ? 'text-error' : 'text-secondary'}`}>
                    Estimated Load: {cargoWeight} kg ({loadPercentage}%)
                  </span>
                  {isOverloaded && (
                    <span className="flex items-center gap-1 text-error text-[10px] font-bold uppercase animate-pulse">
                      <AlertCircle size={12} /> Overloaded
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => {
                    setDestination('');
                    setCargoWeight(300);
                    setPlannedDistance(38);
                  }}
                  disabled={isSafetyOfficer}
                  className="px-6 py-2.5 border border-outline-variant hover:bg-surface-container rounded-lg text-button-md font-bold transition-all disabled:opacity-40"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSafetyOfficer || isOverloaded || !destination || !selectedVehicle || !selectedDriver || isSubmitting}
                  className="px-6 py-2.5 bg-depot-amber text-primary-container font-button-md rounded-lg font-bold shadow-sm hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Trip'}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-surface-container-lowest hairline rounded-xl p-lg shadow-sm flex flex-col justify-between h-[360px] relative overflow-hidden">
            <div className="flex items-center justify-between mb-sm">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Interactive Telemetry Map</span>
              {activeTrip && (
                <div className="bg-secondary-fixed text-secondary border border-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5 animate-pulse">
                  <Navigation size={10} /> Route Active
                </div>
              )}
            </div>

            <div className="flex-1 w-full bg-surface-container-low rounded-lg border border-outline-variant/60 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <svg className="w-full h-full min-h-[220px] max-h-[260px] z-10" viewBox="0 0 400 360">
                {MAP_ROUTES.map((route, idx) => {
                  const fromNode = MAP_NODES[route.from];
                  const toNode = MAP_NODES[route.to];
                  if (!fromNode || !toNode) return null;
                  return (
                    <line key={idx} x1={fromNode.x} y1={fromNode.y} x2={toNode.x} y2={toNode.y} stroke="#c6c6cd" strokeWidth="2" strokeDasharray="4 4" />
                  );
                })}

                {activeSourceNode && activeDestNode && (
                  <>
                    <line x1={activeSourceNode.x} y1={activeSourceNode.y} x2={activeDestNode.x} y2={activeDestNode.y} stroke="#406aef" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                    <line x1={activeSourceNode.x} y1={activeSourceNode.y} x2={activeDestNode.x} y2={activeDestNode.y} stroke="#ffffff" strokeWidth="2" strokeDasharray="6 6" strokeLinecap="round">
                      <animate attributeName="stroke-dashoffset" values="30;0" dur="1.5s" repeatCount="indefinite" />
                    </line>
                    <circle r="6" fill="#1d4fd5">
                      <animateMotion path={`M ${activeSourceNode.x} ${activeSourceNode.y} L ${activeDestNode.x} ${activeDestNode.y}`} dur="3s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}

                {Object.values(MAP_NODES).map((node) => {
                  const isActive = activeSource === node.name || activeDestination === node.name || 
                                   (activeTrip && (activeTrip.source.includes(node.name) || activeTrip.destination.includes(node.name)));
                  return (
                    <g key={node.name} className="cursor-pointer">
                      <circle cx={node.x} cy={node.y} r={isActive ? "7" : "5"} fill={isActive ? "#1d4fd5" : "#76777d"} stroke="#ffffff" strokeWidth="2" className="transition-all" />
                      <text x={node.x} y={node.y - 10} textAnchor="middle" className={`text-[9px] font-bold ${isActive ? 'fill-secondary font-black' : 'fill-on-surface-variant'}`}>{node.name}</text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 right-3 bg-white/95 border border-outline-variant/80 rounded-lg p-2 flex items-center gap-2 text-xs shadow-sm z-20">
                <MapPin className="text-secondary shrink-0" size={14} />
                <span className="font-semibold text-on-surface shrink-0">Route Visualizer:</span>
                <span className="text-on-surface-variant font-mono-md truncate">
                  {activeTrip 
                    ? `${activeTrip.source} → ${activeTrip.destination} (${activeTrip._id.substring(activeTrip._id.length - 6)})`
                    : `${source} → ${destination || 'Select destination...'}`
                  }
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-lg">
          <div className="bg-surface-container-lowest hairline rounded-xl flex flex-col shadow-sm">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="text-secondary shrink-0 animate-pulse" size={18} />
                <h3 className="text-headline-sm font-headline-sm">Live Board</h3>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider">Live Updates</span>
              </div>
            </div>

            <div className="divide-y divide-outline-variant/60 max-h-[460px] overflow-y-auto custom-scrollbar">
              {isLoading ? (
                <div className="p-xl text-center text-on-surface-variant">Loading trips...</div>
              ) : filteredTrips.length === 0 ? (
                <div className="p-xl text-center">
                  <Truck size={36} className="text-outline-variant mx-auto mb-2 opacity-50" />
                  <p className="text-label-md font-bold text-on-surface-variant">No trips match criteria</p>
                </div>
              ) : (
                filteredTrips.map((trip) => {
                  const isSelected = selectedTripId === trip._id;
                  const statusColors = {
                    'Draft': 'bg-surface-container-high text-on-surface-variant border-outline-variant',
                    'Dispatched': 'bg-blue-50 text-blue-700 border-blue-200',
                    'Completed': 'bg-emerald-50 text-emerald-800 border-emerald-200',
                    'Cancelled': 'bg-error-container/30 text-error border-error/20'
                  };

                  return (
                    <div 
                      key={trip._id}
                      onClick={() => setSelectedTripId(trip._id)}
                      className={`p-md hover:bg-surface-container-low transition-colors cursor-pointer relative ${
                        isSelected ? 'bg-surface-container-low border-l-4 border-secondary' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-mono-md text-label-md font-bold text-on-surface">...{trip._id.substring(trip._id.length - 6)}</span>
                          <span className={`px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wider ${statusColors[trip.status]}`}>
                            {trip.status}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          {trip.status === 'Draft' && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAction(trip._id, 'dispatch'); }}
                                disabled={isSafetyOfficer}
                                className="px-3 py-1 bg-secondary text-white rounded-lg text-xs font-semibold hover:bg-secondary-container transition-all disabled:opacity-50"
                              >
                                Dispatch
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAction(trip._id, 'cancel'); }}
                                disabled={isSafetyOfficer}
                                className="px-3 py-1 bg-surface-container-high text-error rounded-lg text-xs font-semibold hover:bg-error/10 transition-all disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                          {trip.status === 'Dispatched' && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAction(trip._id, 'complete'); }}
                                disabled={isSafetyOfficer}
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-all disabled:opacity-50"
                              >
                                Complete
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); handleAction(trip._id, 'cancel'); }}
                                disabled={isSafetyOfficer}
                                className="px-3 py-1 bg-surface-container-high text-error rounded-lg text-xs font-semibold hover:bg-error/10 transition-all disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-sm">
                        <div className="flex items-center gap-2 text-body-md font-medium text-on-surface">
                          <span>{trip.source}</span>
                          <ChevronRight size={14} className="text-outline" />
                          <span>{trip.destination}</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant font-medium">
                          <div className="flex items-center gap-1">
                            <Truck size={12} className="text-outline" />
                            <span>{trip.vehicle?.registrationNumber || 'Unknown'} / {trip.driver?.name || 'Unknown'}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock size={12} className="text-outline" />
                            <span>Created: {new Date(trip.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-md">
            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-md flex flex-col justify-between h-28 shadow-sm">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Active Trips</span>
              <div className="flex items-baseline gap-2">
                <span className="text-display-lg font-bold text-secondary font-display-lg">{activeTripsCount}</span>
                <span className="text-[10px] text-green-600 font-bold">Running</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-md flex flex-col justify-between h-28 shadow-sm opacity-50 grayscale">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Avg. Delay</span>
              <div className="flex items-baseline gap-1">
                <span className="text-display-lg font-bold text-on-surface font-display-lg">--</span>
                <span className="text-xs text-outline font-bold">min</span>
              </div>
              <p className="text-[10px] text-outline italic">No ETA data in backend</p>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/60 rounded-xl p-md flex flex-col justify-between h-28 shadow-sm opacity-50 grayscale">
              <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Utilization</span>
              <div className="flex items-baseline gap-1">
                <span className="text-display-lg font-bold text-on-surface font-display-lg">--</span>
                <span className="text-xs text-outline font-bold">%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
