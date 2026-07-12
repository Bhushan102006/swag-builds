import React, { useState, useEffect } from 'react';
import { Plus, Filter, Edit, Eye, Info, ChevronLeft, ChevronRight, Lock, Truck } from 'lucide-react';
import { getVehicles, createVehicle, Vehicle } from '../api';

export default function VehicleRegistry({ readOnly = false }: { readOnly?: boolean }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form State
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleType, setVehicleType] = useState('Van');
  const [maxLoadCapacity, setMaxLoadCapacity] = useState<number | ''>('');
  const [odometer, setOdometer] = useState<number | ''>('');
  const [acquisitionCost, setAcquisitionCost] = useState<number | ''>('');

  const loadVehicles = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await getVehicles();
      setVehicles(res.vehicles);
    } catch (err: any) {
      setError(err?.message || 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationNumber || !vehicleName || maxLoadCapacity === '' || odometer === '' || acquisitionCost === '') return;

    setIsSubmitting(true);
    try {
      await createVehicle({
        registrationNumber,
        vehicleName,
        vehicleType,
        maxLoadCapacity: Number(maxLoadCapacity),
        odometer: Number(odometer),
        acquisitionCost: Number(acquisitionCost),
        status: 'Available'
      });

      setIsModalOpen(false);
      // Reset
      setRegistrationNumber('');
      setVehicleName('');
      setVehicleType('Van');
      setMaxLoadCapacity('');
      setOdometer('');
      setAcquisitionCost('');
      
      // Reload list
      loadVehicles();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to create vehicle');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusStyle = (status: string) => {
    if (status === 'Available') return 'bg-[#DEF7EC] text-[#03543F]';
    if (status === 'On Trip') return 'bg-[#E1EFFE] text-[#1E429F]';
    return 'bg-surface-container-high text-on-surface-variant';
  };

  return (
    <div className="flex flex-col h-full relative">
      <section className="px-xl py-lg flex items-end justify-between shrink-0">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface flex items-center gap-3">
            Vehicle Registry
            {readOnly && <span className="text-[12px] bg-surface-container-high text-outline px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 leading-none h-fit"><Lock size={12} /> View Only</span>}
          </h2>
        </div>
        <div className="flex gap-3">
          {!readOnly && (
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-on-tertiary-container text-on-tertiary px-6 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-90 transition-all active:scale-95"
            >
              <Plus size={20} />
              Add Vehicle
            </button>
          )}
        </div>
      </section>

      <div className="flex-1 px-xl pb-xl overflow-hidden flex flex-col">
        <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md mb-gutter flex items-center gap-gutter shrink-0">
          <div className="flex-1 grid grid-cols-4 gap-gutter">
            <div className="flex flex-col gap-1">
              <label className="text-label-sm font-label-sm text-on-surface-variant px-1">Vehicle Type</label>
              <select className="bg-surface-container-low border border-outline-variant rounded-lg py-2 px-3 text-body-md focus:ring-secondary transition-all outline-none">
                <option>All Types</option>
                <option>Van</option>
                <option>Truck</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-label-sm font-label-sm text-on-surface-variant px-1">Status</label>
              <select className="bg-surface-container-low border border-outline-variant rounded-lg py-2 px-3 text-body-md focus:ring-secondary transition-all outline-none">
                <option>All Status</option>
                <option>Available</option>
                <option>On Trip</option>
              </select>
            </div>
          </div>
          <button className="mt-5 p-2.5 text-secondary hover:bg-secondary-fixed transition-all rounded-lg">
            <Filter size={20} />
          </button>
        </div>

        <div className="flex-1 bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden flex flex-col min-h-0">
          <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="sticky top-0 bg-surface-container-high border-b border-outline-variant z-10">
                <tr>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Reg No. (Unique)</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Name/Model</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Type</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Capacity (kg)</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Odometer (km)</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-on-surface-variant">Loading vehicles...</td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-error">{error}</td>
                  </tr>
                ) : vehicles.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-on-surface-variant">No vehicles found.</td>
                  </tr>
                ) : (
                  vehicles.map((v) => (
                    <tr key={v._id} className="hover:bg-surface-container-low transition-colors group">
                      <td className="px-gutter py-4 font-mono-md text-mono-md text-on-surface">{v.registrationNumber}</td>
                      <td className="px-gutter py-4 font-body-md text-on-surface">{v.vehicleName}</td>
                      <td className="px-gutter py-4 font-body-md text-on-surface-variant">{v.vehicleType}</td>
                      <td className="px-gutter py-4 font-mono-md text-mono-md text-right">{v.maxLoadCapacity.toLocaleString()} kg</td>
                      <td className="px-gutter py-4 font-mono-md text-mono-md text-right">{v.odometer.toLocaleString()} km</td>
                      <td className="px-gutter py-4">
                        <span className={`px-2.5 py-1 rounded-full font-medium text-xs ${getStatusStyle(v.status)}`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="px-gutter py-4">
                        {!readOnly && <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Edit size={16}/></button>}
                        <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Eye size={16}/></button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="px-gutter py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between shrink-0">
            <p className="text-label-md font-label-md text-on-surface-variant">Showing <span className="text-on-surface font-semibold">{vehicles.length > 0 ? 1 : 0}-{vehicles.length}</span> of <span className="text-on-surface font-semibold">{vehicles.length}</span> vehicles</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-all"><ChevronLeft size={16}/></button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-secondary-container bg-secondary-fixed text-secondary font-bold text-label-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-all"><ChevronRight size={16}/></button>
            </div>
          </div>
        </div>

        <div className="mt-gutter flex items-start gap-3 bg-tertiary-fixed text-on-tertiary-fixed-variant p-md rounded-lg border border-on-tertiary-container/10 shrink-0">
          <Info size={20} className="shrink-0 mt-0.5" />
          <p className="text-body-md leading-relaxed">
            <span className="font-bold">Compliance Note:</span> Vehicle Registration IDs must be unique across the Fleet Management System. Retired or In Shop vehicles are automatically hidden from the active Trip Dispatcher pool.
          </p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-[100] backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
                <Truck size={20} className="text-secondary" /> Register New Vehicle
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded bg-surface-container-highest text-on-surface hover:bg-outline-variant transition-colors"
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleAddSubmit} className="p-lg space-y-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Vehicle Reg No.</label>
                  <input 
                    type="text" 
                    value={registrationNumber} 
                    onChange={(e) => setRegistrationNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. MH01AB1234"
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all uppercase"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Name/Model</label>
                  <input 
                    type="text" 
                    value={vehicleName} 
                    onChange={(e) => setVehicleName(e.target.value)}
                    placeholder="e.g. TATA Ace"
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Vehicle Type</label>
                  <select 
                    value={vehicleType} 
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  >
                    <option value="Mini Truck">Mini Truck</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                    <option value="Pickup">Pickup</option>
                    <option value="Container">Container</option>
                    <option value="Trailer">Trailer</option>
                    <option value="Bus">Bus</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Load Capacity (kg)</label>
                  <input 
                    type="number" 
                    value={maxLoadCapacity} 
                    onChange={(e) => setMaxLoadCapacity(Number(e.target.value))}
                    placeholder="e.g. 500"
                    required
                    min="0"
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Initial Odometer (km)</label>
                  <input 
                    type="number" 
                    value={odometer} 
                    onChange={(e) => setOdometer(Number(e.target.value))}
                    placeholder="e.g. 0"
                    required
                    min="0"
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Acquisition Cost (₹)</label>
                  <input 
                    type="number" 
                    value={acquisitionCost} 
                    onChange={(e) => setAcquisitionCost(Number(e.target.value))}
                    placeholder="e.g. 500000"
                    required
                    min="0"
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
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
                  disabled={!registrationNumber || !vehicleName || isSubmitting}
                  className="px-6 py-2.5 bg-on-tertiary-container text-on-tertiary font-button-md rounded-lg font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering...' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
