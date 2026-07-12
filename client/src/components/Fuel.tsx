import React from 'react';
import { Fuel as FuelIcon, Lock } from 'lucide-react';

export default function Fuel({ readOnly = false }: { readOnly?: boolean }) {
  return (
    <div className="p-lg space-y-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-headline-md font-headline-md text-on-surface mb-xs flex items-center gap-2">
            Fuel & Expenses
            {readOnly && <span className="text-[10px] bg-surface-container-high text-outline px-2 py-1 rounded font-bold uppercase tracking-widest flex items-center gap-1"><Lock size={10} /> View Only</span>}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">Track fleet fuel consumption and financial metrics.</p>
        </div>
        {!readOnly && (
          <button className="bg-depot-amber text-primary-container px-5 py-2.5 rounded-lg font-button-md shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <FuelIcon size={18} />
            <span>Log Expense</span>
          </button>
        )}
      </div>

      <div className="bg-surface-container-lowest hairline rounded-xl p-xl flex items-center justify-center min-h-[400px]">
        <div className="text-center text-outline">
          <FuelIcon size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-body-lg font-bold mb-2">Fuel & Expenses (Placeholder)</p>
          <p className="text-body-sm max-w-sm mx-auto">Financial data will be represented here under `{readOnly ? 'View Only' : 'Full Edit'}` permissions.</p>
        </div>
      </div>
    </div>
  );
}
