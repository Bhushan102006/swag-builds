import React from 'react';
import { Route, Lock, MapPin, Navigation, Clock, AlertCircle, Edit, Eye, ChevronDown } from 'lucide-react';

export default function Trips({ readOnly = false }: { readOnly?: boolean }) {
  return (
    <div className="p-lg space-y-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-xs flex items-center gap-3">
            Trips Management
            {readOnly && <span className="text-[10px] bg-surface-container-high text-outline px-2 py-1 rounded font-bold uppercase tracking-widest flex items-center gap-1 leading-none"><Lock size={10} /> View Only</span>}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Monitor and dispatch active route assignments.</p>
        </div>
        {!readOnly && (
          <button className="bg-depot-amber text-primary-container px-5 py-2.5 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <Route size={18} />
            <span>Create Trip</span>
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Active Trips</span>
            <Navigation size={18} className="text-signal-blue opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-headline-md font-headline-md text-primary">24</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center">On Route</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Completed Today</span>
            <MapPin size={18} className="text-green-600 opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto space-y-1.5">
            <span className="text-headline-md font-headline-md text-primary">15</span>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
               <div className="h-full bg-green-500 rounded" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Avg Trip Time</span>
            <Clock size={18} className="text-depot-amber opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto">
            <span className="text-headline-md font-headline-md text-primary">4h 15m</span>
            <div className="text-[10px] text-outline font-label-sm uppercase mt-1">Based on recent 30 days</div>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest border border-error/30 p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden bg-error-container/5 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-error/80 uppercase tracking-wider">Delayed/Alerts</span>
            <AlertCircle size={18} className="text-error" />
          </div>
          <div className="flex flex-col mt-auto">
            <span className="text-headline-md font-headline-md text-error">02</span>
            <span className="text-[10px] text-error/80 font-label-sm uppercase">Require immediate attention</span>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest hairline rounded-xl overflow-hidden flex flex-col">
        <div className="px-lg py-sm border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-xs">
              <label className="text-label-sm font-label-sm text-outline">Status:</label>
              <select className="bg-surface hairline rounded-lg px-2 py-1 text-body-md focus:ring-signal-blue outline-none border-none shadow-sm cursor-pointer">
                <option>All Trips</option>
                <option>In Transit</option>
                <option>Completed</option>
                <option>Delayed</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-label-sm">
             <span className="text-outline">Sort by:</span>
             <button className="font-bold text-on-surface hover:text-signal-blue flex items-center gap-1 transition-colors">
               ETA <ChevronDown size={14} />
             </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Trip ID</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Vehicle / Driver</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">Route (Origin → Destination)</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold text-center">Status</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold">ETA / Completed</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <TripRow 
                id="TRP-1092" 
                vehicle="VAN-05" driver="Alex Johnson"
                origin="Gandhinagar Depot" dest="Ahmedabad Central"
                status="In Transit" time="2h 15m remaining"
                readOnly={readOnly}
              />
              <TripRow 
                id="TRP-1091" 
                vehicle="TRUCK-11" driver="Priya Sharma"
                origin="Surat Hub" dest="Mumbai Port"
                status="Delayed" time="Expected +45m late"
                readOnly={readOnly}
              />
              <TripRow 
                id="TRP-1088" 
                vehicle="TRUCK-02" driver="Raj Patel"
                origin="Gandhinagar Depot" dest="Vadodara Hub"
                status="Completed" time="Today, 10:45 AM"
                readOnly={readOnly}
              />
            </tbody>
          </table>
        </div>

        <div className="px-lg py-3 border-t border-outline-variant flex items-center justify-between bg-surface-container-low text-label-sm">
          <span className="text-outline font-medium">Showing 3 of 24 active trips</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center text-outline hover:bg-surface-container-high rounded transition-colors">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center bg-signal-blue text-white font-bold rounded">1</button>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors font-medium">2</button>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors">&gt;</button>
          </div>
        </div>
      </section>
    </div>
  );
}

type TripStatus = 'In Transit' | 'Completed' | 'Delayed';

function TripRow({ id, vehicle, driver, origin, dest, status, time, readOnly }: { id: string, vehicle: string, driver: string, origin: string, dest: string, status: TripStatus, time: string, readOnly: boolean }) {
  const getStatusStyle = (status: TripStatus) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-signal-blue';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Delayed': return 'bg-red-100 text-red-700';
    }
  };

  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="px-lg py-4 font-mono-md text-on-surface font-bold">{id}</td>
      <td className="px-lg py-4">
        <div className="flex flex-col">
          <span className="text-label-md font-bold text-on-surface">{vehicle}</span>
          <span className="text-label-sm text-outline">{driver}</span>
        </div>
      </td>
      <td className="px-lg py-4">
        <div className="flex items-center gap-2">
          <span className="text-body-md font-medium text-on-surface-variant max-w-[150px] truncate">{origin}</span>
          <span className="text-outline">→</span>
          <span className="text-body-md font-medium text-on-surface">{dest}</span>
        </div>
      </td>
      <td className="px-lg py-4 text-center">
        <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block min-w-[85px] ${getStatusStyle(status)}`}>{status}</span>
      </td>
      <td className="px-lg py-4 font-body-sm text-on-surface-variant">{time}</td>
      <td className="px-lg py-4 text-right">
         <div className="flex items-center justify-end gap-1">
           {!readOnly && (
             <button className="p-1.5 text-outline hover:text-signal-blue hover:bg-surface-container rounded transition-all">
               <Edit size={16} />
             </button>
           )}
           <button className="p-1.5 text-outline hover:text-signal-blue hover:bg-surface-container rounded transition-all">
             <Eye size={16} />
           </button>
         </div>
      </td>
    </tr>
  );
}
