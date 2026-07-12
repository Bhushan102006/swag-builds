import React from 'react';
import { Users, Route, Award, AlertTriangle, ChevronDown, UserPlus, FileWarning } from 'lucide-react';

export default function Drivers() {
  return (
    <div className="p-lg space-y-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Drivers & Safety Profiles</h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Monitor driver performance, licensing compliance, and safety standards.</p>
        </div>
        <button className="bg-depot-amber text-primary-container px-5 py-2.5 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          <UserPlus size={18} />
          <span>Add Driver</span>
        </button>
      </div>
      
      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Total Drivers</span>
            <Users size={18} className="text-secondary opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-headline-md font-headline-md text-primary">142</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center">↗ 4.2%</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">On Trip</span>
            <Route size={18} className="text-signal-blue opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto space-y-1.5">
            <span className="text-headline-md font-headline-md text-primary">86</span>
            <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
               <div className="h-full bg-signal-blue rounded" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Avg Safety Score</span>
            <Award size={18} className="text-depot-amber opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto">
            <span className="text-headline-md font-headline-md text-primary">94.8%</span>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={4.5} />
              <span className="text-[10px] text-outline font-label-sm uppercase">Elite Fleet</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 bg-surface-container-lowest border border-error/30 p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden bg-error-container/5 group">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-error/80 uppercase tracking-wider">License Expiries</span>
            <AlertTriangle size={18} className="text-error" />
          </div>
          <div className="flex flex-col mt-auto">
            <span className="text-headline-md font-headline-md text-error">03</span>
            <span className="text-[10px] text-error/80 font-label-sm uppercase">Expiring in 30 days</span>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest hairline rounded-xl overflow-hidden flex flex-col">
        <div className="px-lg py-sm border-b border-outline-variant flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-sm">
            <div className="flex items-center gap-xs">
              <label className="text-label-sm font-label-sm text-outline">Category:</label>
              <select className="bg-surface hairline rounded-lg px-2 py-1 text-body-md focus:ring-signal-blue outline-none border-none shadow-sm cursor-pointer">
                <option>All Categories</option>
                <option>LMV</option>
                <option>HMV</option>
              </select>
            </div>
            <div className="w-px h-6 bg-outline-variant mx-2"></div>
            <div className="flex items-center gap-xs">
              <label className="text-label-sm font-label-sm text-outline">Status:</label>
              <select className="bg-surface hairline rounded-lg px-2 py-1 text-body-md focus:ring-signal-blue outline-none border-none shadow-sm cursor-pointer">
                <option>All Status</option>
                <option>Available</option>
                <option>On Trip</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2 text-label-sm">
             <span className="text-outline">Sort by:</span>
             <button className="font-bold text-on-surface hover:text-signal-blue flex items-center gap-1 transition-colors">
               Safety Score <ChevronDown size={14} />
             </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-surface-container-low border-b border-outline-variant">
              <tr>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Driver Name</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">License No</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold" align="center">Category</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Expiry</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Contact</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold whitespace-nowrap">Trip Compl.</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold min-w-[120px]">Safety Rating</th>
                <th className="px-lg py-3 text-label-sm text-outline uppercase font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              <DriverRow 
                name="Alex Johnson" 
                img="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                license="DL-55213" category="LMV" expiry="12/2028" contact="98765-XXXXX" 
                trip="96%" rating={3} status="Available" 
              />
              <DriverRow 
                name="Jean Miller" 
                img="https://i.pravatar.cc/150?u=a04258114e29026702d"
                license="DL-66120" category="HMV" expiry="03/2025" expiryError
                contact="98220-XXXXX" trip="91%" rating={3} status="Suspended" 
              />
              <DriverRow 
                name="Priya Sharma" 
                img="https://i.pravatar.cc/150?u=a048581f4e29026701d"
                license="DL-99031" category="LMV" expiry="08/2027" contact="99110-XXXXX" 
                trip="99%" rating={4} status="On Trip" 
              />
              <DriverRow 
                name="Suresh Kumar" 
                img="https://i.pravatar.cc/150?img=11"
                license="DL-40045" category="HMV" expiry="01/2027" contact="97440-XXXXX" 
                trip="88%" rating={2} status="Off Duty" 
              />
            </tbody>
          </table>
        </div>

        <div className="px-lg py-3 border-t border-outline-variant flex items-center justify-between bg-surface-container-low text-label-sm">
          <span className="text-outline font-medium">Showing 4 of 142 drivers</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center text-outline hover:bg-surface-container-high rounded transition-colors">&lt;</button>
            <button className="w-7 h-7 flex items-center justify-center bg-signal-blue text-white font-bold rounded">1</button>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors font-medium">2</button>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors font-medium">3</button>
            <span className="px-1 text-outline">...</span>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors font-medium">15</button>
            <button className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-container-high rounded transition-colors">&gt;</button>
          </div>
        </div>
      </section>

      <div className="bg-error-container/20 border border-error/30 rounded-xl p-md flex gap-4 max-w-4xl">
        <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
          <FileWarning className="text-error" size={20} />
        </div>
        <div>
          <h4 className="font-label-md text-error font-bold mb-0.5">License Validation Required</h4>
          <p className="text-body-sm font-body-md text-on-surface-variant opacity-90 leading-relaxed">Drivers with <span className="font-bold">Expired</span> or <span className="font-bold">Suspended</span> status are automatically blocked from Trip Assignments. Renewal documentation must be uploaded via the driver profile.</p>
        </div>
      </div>
    </div>
  );
}

// Subcomponents
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex text-depot-amber text-[10px]">
      {[1,2,3,4,5].map(i => (
        <span key={i} className={i <= rating ? "opacity-100" : "opacity-30"}>★</span>
      ))}
    </div>
  );
}

type DriverStatus = 'Available' | 'Suspended' | 'On Trip' | 'Off Duty';

function DriverRow({ name, img, license, category, expiry, expiryError, contact, trip, rating, status }: { name: string, img: string, license: string, category: string, expiry: string, expiryError?: boolean, contact: string, trip: string, rating: number, status: DriverStatus }) {
  const getStatusStyle = (status: DriverStatus) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      case 'On Trip': return 'bg-blue-100 text-signal-blue';
      case 'Off Duty': return 'bg-surface-container-high text-outline';
    }
  };

  const getProgressColor = (val: string) => {
    const num = parseInt(val);
    if (num >= 95) return 'bg-green-500';
    if (num >= 90) return 'bg-signal-blue';
    return 'bg-depot-amber';
  };

  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="px-lg py-3">
        <div className="flex items-center gap-3">
          <img src={img} alt={name} className="w-8 h-8 rounded-full bg-surface-container-highest border hairline group-hover:border-outline-variant transition-colors" />
          <span className="text-label-md font-bold text-on-surface">{name}</span>
        </div>
      </td>
      <td className="px-lg py-3 font-mono-md text-outline">{license}</td>
      <td className="px-lg py-3" align="center">
        <span className="px-2 py-0.5 bg-surface-container-high border hairline text-[10px] uppercase font-bold text-outline rounded text-center">{category}</span>
      </td>
      <td className="px-lg py-3">
        <div className="flex flex-col">
           <span className={`text-label-md font-bold ${expiryError ? 'text-error' : 'text-on-surface'}`}>{expiry}</span>
           {expiryError && <span className="text-[10px] text-error font-bold uppercase tracking-widest mt-0.5">Expired</span>}
        </div>
      </td>
      <td className="px-lg py-3 font-mono-md text-outline">{contact}</td>
      <td className="px-lg py-3">
        <div className="flex items-center gap-2 max-w-[120px]">
          <span className="font-bold text-on-surface text-label-sm w-10">{trip}</span>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className={`h-full ${getProgressColor(trip)}`} style={{ width: trip }}></div>
          </div>
        </div>
      </td>
      <td className="px-lg py-3">
        <StarRating rating={rating} />
      </td>
      <td className="px-lg py-3 text-center">
        <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block min-w-[70px] ${getStatusStyle(status)}`}>{status}</span>
      </td>
    </tr>
  );
}
