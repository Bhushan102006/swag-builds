import React from 'react';
import { History, Info, Filter, Download, Wrench, CheckCircle2, DollarSign } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="p-lg max-w-[1600px] mx-auto">
      <div className="mb-xl">
        <h1 className="font-headline-md text-headline-md text-primary">Maintenance Management</h1>
        <p className="text-body-md text-on-surface-variant">Schedule repairs, track service costs, and monitor fleet health.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-5 flex flex-col gap-gutter">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-sm text-headline-sm">Log Service Record</h2>
              <History className="text-on-surface-variant" size={20} />
            </div>
            <form className="space-y-4">
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Vehicle</label>
                <select className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md">
                  <option>Select Vehicle</option>
                  <option>VAN-05</option>
                </select>
              </div>
              <div>
                <label className="block font-label-md text-label-md text-on-surface mb-1.5">Service Type</label>
                <select className="w-full bg-white border border-outline-variant rounded-lg p-2.5 focus:border-signal-blue focus:ring-1 focus:ring-signal-blue outline-none text-body-md">
                  <option>Oil Change</option>
                  <option>Engine Repair</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-depot-amber text-on-primary py-3 px-4 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-90 active:scale-[0.98] transition-all mt-4">
                Save Service Entry
              </button>
            </form>
          </div>
          <div className="bg-surface-container-low border border-dashed border-outline-variant rounded-xl p-md">
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

        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest rounded-xl border border-outline-variant h-full p-md flex flex-col">
            <div className="flex items-center justify-between mb-6">
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
            <div className="overflow-x-auto flex-1">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant">
                    <th className="text-left py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Vehicle</th>
                    <th className="text-left py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Service</th>
                    <th className="text-left py-3 px-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  <tr className="hover:bg-surface-container-low transition-colors">
                    <td className="py-4 px-4 font-label-md text-label-md">VAN-05</td>
                    <td className="py-4 px-4 text-body-md">Oil Change & Filter</td>
                    <td className="py-4 px-4"><span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight bg-orange-100 text-orange-700">In Shop</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
