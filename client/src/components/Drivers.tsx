import React, { useState } from 'react';
import { Users, Route, Award, AlertTriangle, ChevronDown, UserPlus, FileWarning, Lock, UserCog } from 'lucide-react';

export type DriverStatus = 'Available' | 'Suspended' | 'On Trip' | 'Off Duty';

export interface DriverData {
  id: string;
  name: string;
  img?: string;
  license: string;
  category: string;
  expiry: string;
  expiryError?: boolean;
  contact: string;
  trip: string;
  rating: number;
  status: DriverStatus;
}

export default function Drivers({ readOnly = false }: { readOnly?: boolean }) {
  const [drivers, setDrivers] = useState<DriverData[]>([
    {
      id: "D1",
      name: "Alex Johnson",
      img: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
      license: "DL-55213",
      category: "LMV",
      expiry: "12/2028",
      contact: "98765-XXXXX",
      trip: "96%",
      rating: 3,
      status: "Available"
    },
    {
      id: "D2",
      name: "Jean Miller",
      img: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      license: "DL-66120",
      category: "HMV",
      expiry: "03/2025",
      expiryError: true,
      contact: "98220-XXXXX",
      trip: "91%",
      rating: 3,
      status: "Suspended"
    },
    {
      id: "D3",
      name: "Priya Sharma",
      img: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
      license: "DL-99031",
      category: "LMV",
      expiry: "08/2027",
      contact: "99110-XXXXX",
      trip: "99%",
      rating: 4,
      status: "On Trip"
    },
    {
      id: "D4",
      name: "Suresh Kumar",
      img: "https://i.pravatar.cc/150?img=11",
      license: "DL-40045",
      category: "HMV",
      expiry: "01/2027",
      contact: "97440-XXXXX",
      trip: "88%",
      rating: 2,
      status: "Off Duty"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [license, setLicense] = useState('');
  const [category, setCategory] = useState('LMV');
  const [expiry, setExpiry] = useState('');
  const [contact, setContact] = useState('');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !license) return;

    const newId = `D${drivers.length + 1}`;
    setDrivers([
      {
        id: newId,
        name,
        license,
        category,
        expiry,
        contact,
        trip: '0%',
        rating: 5,
        status: 'Available',
        img: `https://i.pravatar.cc/150?u=${newId}`
      },
      ...drivers
    ]);

    setIsModalOpen(false);
    setName('');
    setLicense('');
    setCategory('LMV');
    setExpiry('');
    setContact('');
  };

  const handleStatusChange = (driverId: string, newStatus: DriverStatus) => {
    setDrivers(drivers.map(d => 
      d.id === driverId ? { ...d, status: newStatus } : d
    ));
  };

  return (
    <div className="p-lg space-y-lg relative h-full flex flex-col">
      <div className="flex justify-between items-start shrink-0">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-xs flex items-center gap-3">
            Drivers & Safety Profiles
            {readOnly && <span className="text-[10px] bg-surface-container-high text-outline px-2 py-1 rounded font-bold uppercase tracking-widest flex items-center gap-1 leading-none"><Lock size={10} /> View Only</span>}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Monitor driver performance, licensing compliance, and safety standards.</p>
        </div>
        {!readOnly && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-depot-amber text-primary-container px-5 py-2.5 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <UserPlus size={18} />
            <span>Add Driver</span>
          </button>
        )}
      </div>
      
      {/* Metrics Row */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter shrink-0">
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">Total Drivers</span>
            <Users size={18} className="text-secondary opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-baseline gap-2 mt-auto">
            <span className="text-headline-md font-headline-md text-primary">{drivers.length + 138}</span>
            <span className="text-[10px] text-green-600 font-bold flex items-center">↗ 4.2%</span>
          </div>
        </div>
        
        <div className="col-span-1 bg-surface-container-lowest hairline p-md rounded-xl flex flex-col justify-between h-32 relative overflow-hidden group hover:border-outline transition-colors">
          <div className="flex justify-between items-start">
            <span className="text-label-sm font-label-sm text-outline uppercase tracking-wider">On Trip</span>
            <Route size={18} className="text-signal-blue opacity-80 group-hover:opacity-100 transition-opacity" />
          </div>
          <div className="mt-auto space-y-1.5">
            <span className="text-headline-md font-headline-md text-primary">{drivers.filter(d => d.status === 'On Trip').length + 85}</span>
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
            <span className="text-headline-md font-headline-md text-error">{drivers.filter(d => d.expiryError).length + 2}</span>
            <span className="text-[10px] text-error/80 font-label-sm uppercase">Expiring in 30 days</span>
          </div>
        </div>
      </section>

      {/* Table Section */}
      <section className="bg-surface-container-lowest hairline rounded-xl overflow-hidden flex flex-col flex-1 min-h-0">
        <div className="px-lg py-sm border-b border-outline-variant flex flex-wrap items-center justify-between gap-4 shrink-0">
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
        
        <div className="overflow-x-auto overflow-y-auto custom-scrollbar flex-1">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-surface-container-low border-b border-outline-variant sticky top-0 z-10">
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
              {drivers.map(driver => (
                <DriverRow 
                  key={driver.id}
                  data={driver} 
                  readOnly={readOnly}
                  onStatusChange={(status) => handleStatusChange(driver.id, status)}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-lg py-3 border-t border-outline-variant flex items-center justify-between bg-surface-container-low text-label-sm shrink-0">
          <span className="text-outline font-medium">Showing {drivers.length} of {drivers.length + 138} drivers</span>
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

      <div className="bg-error-container/20 border border-error/30 rounded-xl p-md flex gap-4 max-w-4xl shrink-0">
        <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
          <FileWarning className="text-error" size={20} />
        </div>
        <div>
          <h4 className="font-label-md text-error font-bold mb-0.5">License Validation Required</h4>
          <p className="text-body-sm font-body-md text-on-surface-variant opacity-90 leading-relaxed">Drivers with <span className="font-bold">Expired</span> or <span className="font-bold">Suspended</span> status are automatically blocked from Trip Assignments. Renewal documentation must be uploaded via the driver profile.</p>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-[100] backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low">
              <h3 className="text-headline-md font-headline-md text-on-surface flex items-center gap-2">
                <UserCog size={20} className="text-secondary" /> Register New Driver
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
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Full Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">License Number</label>
                  <input 
                    type="text" 
                    value={license} 
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="e.g. DL-12345"
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all uppercase"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">License Category</label>
                  <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  >
                    <option value="LMV">LMV (Light Motor Vehicle)</option>
                    <option value="HMV">HMV (Heavy Motor Vehicle)</option>
                    <option value="MCWG">MCWG (Motor Cycle With Gear)</option>
                  </select>
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Expiry Date</label>
                  <input 
                    type="text" 
                    value={expiry} 
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="e.g. 12/2029"
                    required
                    className="w-full bg-surface border border-outline-variant rounded-lg px-3 py-2.5 text-body-md focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                  />
                </div>

                <div className="space-y-xs">
                  <label className="text-label-sm font-label-sm text-outline uppercase tracking-wider block">Contact Number</label>
                  <input 
                    type="text" 
                    value={contact} 
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="e.g. 98765-XXXXX"
                    required
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
                  disabled={!name || !license}
                  className="px-6 py-2.5 bg-depot-amber text-primary-container font-button-md rounded-lg font-bold shadow-sm hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
                >
                  Register Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

const DriverRow: React.FC<{ data: DriverData, readOnly: boolean, onStatusChange: (status: DriverStatus) => void }> = ({ data, readOnly, onStatusChange }) => {
  const getStatusStyle = (status: DriverStatus) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-700';
      case 'Suspended': return 'bg-red-100 text-red-700';
      case 'On Trip': return 'bg-blue-100 text-signal-blue';
      case 'Off Duty': return 'bg-surface-container-high text-outline';
      default: return 'bg-surface-container-high text-outline';
    }
  };

  const getProgressColor = (val: string) => {
    const num = parseInt(val);
    if (isNaN(num)) return 'bg-surface-container-high';
    if (num >= 95) return 'bg-green-500';
    if (num >= 90) return 'bg-signal-blue';
    return 'bg-depot-amber';
  };

  return (
    <tr className="hover:bg-surface-container-low transition-colors group">
      <td className="px-lg py-3">
        <div className="flex items-center gap-3">
          <img src={data.img || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`} alt={data.name} className="w-8 h-8 rounded-full bg-surface-container-highest border hairline group-hover:border-outline-variant transition-colors" />
          <span className="text-label-md font-bold text-on-surface">{data.name}</span>
        </div>
      </td>
      <td className="px-lg py-3 font-mono-md text-outline">{data.license}</td>
      <td className="px-lg py-3" align="center">
        <span className="px-2 py-0.5 bg-surface-container-high border hairline text-[10px] uppercase font-bold text-outline rounded text-center">{data.category}</span>
      </td>
      <td className="px-lg py-3">
        <div className="flex flex-col">
           <span className={`text-label-md font-bold ${data.expiryError ? 'text-error' : 'text-on-surface'}`}>{data.expiry}</span>
           {data.expiryError && <span className="text-[10px] text-error font-bold uppercase tracking-widest mt-0.5">Expired</span>}
        </div>
      </td>
      <td className="px-lg py-3 font-mono-md text-outline">{data.contact}</td>
      <td className="px-lg py-3">
        <div className="flex items-center gap-2 max-w-[120px]">
          <span className="font-bold text-on-surface text-label-sm w-10">{data.trip}</span>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className={`h-full ${getProgressColor(data.trip)}`} style={{ width: data.trip }}></div>
          </div>
        </div>
      </td>
      <td className="px-lg py-3">
        <StarRating rating={data.rating} />
      </td>
      <td className="px-lg py-3 text-center">
        {!readOnly ? (
          <select 
            value={data.status}
            onChange={(e) => onStatusChange(e.target.value as DriverStatus)}
            className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block min-w-[70px] cursor-pointer outline-none form-select text-center appearance-none ${getStatusStyle(data.status)}`}
            style={{ textAlignLast: 'center' }}
          >
            <option className="bg-surface text-on-surface normal-case" value="Available">Available</option>
            <option className="bg-surface text-on-surface normal-case" value="On Trip">On Trip</option>
            <option className="bg-surface text-on-surface normal-case" value="Off Duty">Off Duty</option>
            <option className="bg-surface text-on-surface normal-case" value="Suspended">Suspended</option>
          </select>
        ) : (
          <span className={`px-2.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wide inline-block min-w-[70px] ${getStatusStyle(data.status)}`}>
            {data.status}
          </span>
        )}
      </td>
    </tr>
  );
}
