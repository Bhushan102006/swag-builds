import React, { useState, useEffect } from 'react';
import { History, Info, Filter, Download, Wrench, CheckCircle2, DollarSign } from 'lucide-react';
import { getVehicles, getMaintenances, createMaintenance, closeMaintenance, Vehicle, Maintenance as MaintenanceType } from '../api';

export default function Maintenance() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [maintenances, setMaintenances] = useState<MaintenanceType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form State
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [maintenanceType, setMaintenanceType] = useState('Oil Change');
  const [description, setDescription] = useState('');
  const [cost, setCost] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [vehRes, maintRes] = await Promise.all([
        getVehicles(), // we can select any vehicle for maintenance, not just available ones
        getMaintenances()
      ]);
      setVehicles(vehRes.vehicles);
      setMaintenances(maintRes.maintenances);
      if (vehRes.vehicles.length > 0 && !selectedVehicle) {
        setSelectedVehicle(vehRes.vehicles[0]._id);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVehicle || !maintenanceType) return;
    
    setIsSubmitting(true);
    try {
      await createMaintenance({
        vehicle: selectedVehicle,
        maintenanceType,
        description,
        cost: cost === '' ? undefined : Number(cost)
      });
      
      // Reset form
      setMaintenanceType('Oil Change');
      setDescription('');
      setCost('');
      
      await fetchData();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to log maintenance');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = async (id: string) => {
    try {
      await closeMaintenance(id);
      await fetchData();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to close maintenance');
    }
  };

  return (
    <div className="p-lg max-w-[1600px] mx-auto flex flex-col h-full relative">
      <div className="mb-xl shrink-0">
        <h1 className="font-headline-md text-headline-md text-primary">Maintenance Management</h1>
        <p className="text-body-md text-on-surface-variant">Schedule repairs, track service costs, and monitor fleet health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter flex-1 min-h-0">
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-gutter overflow-y-auto">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-sm text-headline-sm">Log Service Record</h2>
              <History className="text-on-surface-variant" size={20} />
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Vehicle</label>
                <select 
                  value={selectedVehicle}
                  onChange={(e) => setSelectedVehicle(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md"
                >
                  <option value="" disabled>Select Vehicle</option>
                  {vehicles.map(v => (
                    <option key={v._id} value={v._id}>{v.registrationNumber} ({v.vehicleName})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Service Type</label>
                <select 
                  value={maintenanceType}
                  onChange={(e) => setMaintenanceType(e.target.value)}
                  className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md"
                >
                  <option value="Oil Change">Oil Change</option>
                  <option value="Engine Repair">Engine Repair</option>
                  <option value="Tire Replacement">Tire Replacement</option>
                  <option value="Brake Inspection">Brake Inspection</option>
                  <option value="General Servicing">General Servicing</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Estimated Cost (₹)</label>
                <input 
                  type="number"
                  value={cost}
                  onChange={(e) => setCost(Number(e.target.value))}
                  placeholder="e.g. 5000"
                  className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md"
                />
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Description (Optional)</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Additional details..."
                  className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md resize-none h-20"
                />
              </div>

              <button 
                type="submit" 
                disabled={!selectedVehicle || !maintenanceType || isSubmitting}
                className="w-full bg-depot-amber text-primary-container py-3 px-4 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-95 active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save Service Entry'}
              </button>
            </form>
          </div>

          <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-md mt-auto shrink-0">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-secondary-container/10 rounded-full flex items-center justify-center shrink-0">
                <Info className="text-secondary" size={20} />
              </div>
              <div>
                <h3 className="font-label-md text-label-md text-on-surface">Compliance Note</h3>
                <p className="text-body-md text-on-surface-variant mt-1 text-sm">Vehicles marked "In Shop" are automatically removed from the Trip Dispatcher pool until service is completed.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 xl:col-span-9 flex flex-col min-h-0">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant h-full p-md flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
              <h2 className="font-headline-sm text-headline-sm">Service Log History</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <Filter size={18} />
                </button>
                <button className="p-2 border border-outline-variant rounded-lg hover:bg-surface-container transition-colors">
                  <Download size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
              <table className="w-full border-collapse min-w-[800px] text-left">
                <thead className="sticky top-0 bg-surface-container-lowest border-b border-outline-variant z-10">
                  <tr>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Vehicle</th>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Service Type</th>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Cost</th>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Date</th>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-center">Status</th>
                    <th className="py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-on-surface-variant">Loading service records...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-error">{error}</td>
                    </tr>
                  ) : maintenances.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-on-surface-variant">No service records found.</td>
                    </tr>
                  ) : (
                    maintenances.map((m) => (
                      <tr key={m._id} className="hover:bg-surface-container-low transition-colors group">
                        <td className="py-4 px-4">
                          <div className="font-label-md text-label-md text-on-surface">
                            {m.vehicle?.registrationNumber || 'Unknown'}
                          </div>
                          <div className="text-xs text-on-surface-variant">
                            {m.vehicle?.vehicleName || ''}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-body-md font-medium">{m.maintenanceType}</div>
                          {m.description && <div className="text-xs text-outline line-clamp-1 max-w-[200px]">{m.description}</div>}
                        </td>
                        <td className="py-4 px-4 font-mono-md">
                          {m.cost ? `₹${m.cost.toLocaleString()}` : '--'}
                        </td>
                        <td className="py-4 px-4 text-body-md text-on-surface-variant">
                          {new Date(m.startDate).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                            m.status === 'Open' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {m.status === 'Open' ? 'In Shop' : 'Completed'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          {m.status === 'Open' && (
                            <button 
                              onClick={() => handleClose(m._id)}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold transition-colors shadow-sm"
                            >
                              Close Ticket
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center shrink-0">
              <span className="text-label-sm text-outline font-medium">Showing {maintenances.length} records</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
