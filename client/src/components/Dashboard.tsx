import React from 'react';
import { MoreVertical, PieChart } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="p-lg space-y-lg">
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
          <span className="text-headline-md font-headline-md text-secondary">18</span>
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
        <button className="ml-auto bg-depot-amber text-primary-container px-6 py-2 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity">
          Create New Trip
        </button>
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
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-lg py-4 font-mono-md text-mono-md">TR001</td>
                  <td className="px-lg py-4 text-body-md">VAN-05</td>
                  <td className="px-lg py-4 text-body-md">Alex Mercer</td>
                  <td className="px-lg py-4"><span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase">On Trip</span></td>
                  <td className="px-lg py-4 font-mono-md text-mono-md text-outline">45 min</td>
                  <td className="px-lg py-4 text-right"><MoreVertical size={16} className="text-outline cursor-pointer" /></td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors">
                  <td className="px-lg py-4 font-mono-md text-mono-md">TR002</td>
                  <td className="px-lg py-4 text-body-md">TRK-12</td>
                  <td className="px-lg py-4 text-body-md">Joan D.</td>
                  <td className="px-lg py-4"><span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold uppercase">Completed</span></td>
                  <td className="px-lg py-4 font-mono-md text-mono-md text-outline">--</td>
                  <td className="px-lg py-4 text-right"><MoreVertical size={16} className="text-outline cursor-pointer" /></td>
                </tr>
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
    </div>
  );
}
