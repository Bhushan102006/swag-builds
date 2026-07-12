import React from 'react';
import { Plus, Filter, Edit, Eye, Info, ChevronLeft, ChevronRight } from 'lucide-react';

export default function VehicleRegistry() {
  return (
    <div className="flex flex-col h-full">
      <section className="px-xl py-lg flex items-end justify-between shrink-0">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface">Vehicle Registry</h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-on-tertiary-container text-on-tertiary px-6 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-90 transition-all active:scale-95">
            <Plus size={20} />
            Add Vehicle
          </button>
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
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Capacity</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider text-right">Odometer</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Status</th>
                  <th className="px-gutter py-4 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                <tr className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-on-surface">GJ01BH5121</td>
                  <td className="px-gutter py-4 font-body-md text-on-surface">VAN-05</td>
                  <td className="px-gutter py-4 font-body-md text-on-surface-variant">Van</td>
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-right">500 kg</td>
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-right">74,000 km</td>
                  <td className="px-gutter py-4"><span className="px-2.5 py-1 rounded-full font-medium text-xs bg-[#DEF7EC] text-[#03543F]">Available</span></td>
                  <td className="px-gutter py-4">
                    <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Edit size={16}/></button>
                    <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Eye size={16}/></button>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-on-surface">GJ01BH9981</td>
                  <td className="px-gutter py-4 font-body-md text-on-surface">TRUCK-11</td>
                  <td className="px-gutter py-4 font-body-md text-on-surface-variant">Truck</td>
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-right">5 Ton</td>
                  <td className="px-gutter py-4 font-mono-md text-mono-md text-right">1,82,000 km</td>
                  <td className="px-gutter py-4"><span className="px-2.5 py-1 rounded-full font-medium text-xs bg-[#E1EFFE] text-[#1E429F]">On Trip</span></td>
                  <td className="px-gutter py-4">
                    <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Edit size={16}/></button>
                    <button className="p-1 hover:text-secondary opacity-0 group-hover:opacity-100 transition-all"><Eye size={16}/></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-gutter py-4 border-t border-outline-variant bg-surface-container-lowest flex items-center justify-between shrink-0">
            <p className="text-label-md font-label-md text-on-surface-variant">Showing <span className="text-on-surface font-semibold">1-2</span> of <span className="text-on-surface font-semibold">42</span> vehicles</p>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-all"><ChevronLeft size={16}/></button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-secondary-container bg-secondary-fixed text-secondary font-bold text-label-md">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant hover:bg-surface-container text-on-surface-variant transition-all text-label-md">2</button>
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
    </div>
  );
}
