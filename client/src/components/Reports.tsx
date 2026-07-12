import React from 'react';
import { Download, TrendingUp, TrendingDown, DollarSign, CheckCircle, AlertTriangle } from 'lucide-react';

export default function Reports() {
  return (
    <div className="p-lg max-w-[1440px] mx-auto space-y-lg">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="text-display-lg font-display-lg text-primary tracking-tight">Reports & Analytics</h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">Real-time performance monitoring and fleet health overview.</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex bg-surface-container-high p-1 rounded-lg border border-outline-variant">
            <button className="px-4 py-1.5 rounded-md bg-on-tertiary shadow-sm text-label-md font-label-md text-secondary">Last 30 Days</button>
            <button className="px-4 py-1.5 rounded-md text-label-md font-label-md text-on-surface-variant hover:text-on-surface">Quarterly</button>
          </div>
          <button className="flex items-center gap-2 bg-on-tertiary border border-outline-variant px-4 py-2 rounded-lg text-button-md font-button-md hover:bg-surface-container-low transition-colors">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        <div className="bg-on-tertiary p-lg rounded-xl border hairline flex flex-col justify-between group hover:border-secondary transition-all">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-surface-container-low rounded-lg text-secondary">
              <TrendingUp size={20} />
            </div>
            <span className="text-label-sm font-label-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+4.2%</span>
          </div>
          <div className="mt-xl">
            <p className="text-label-md font-label-md text-on-surface-variant">Fuel Efficiency</p>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-headline-md font-headline-md text-primary">8.4</h3>
              <span className="text-label-md font-label-md text-on-surface-variant">km/l</span>
            </div>
          </div>
        </div>
        
        <div className="bg-on-tertiary p-lg rounded-xl border hairline flex flex-col justify-between group hover:border-secondary transition-all">
          <div className="flex justify-between items-start">
            <div className="p-2 bg-surface-container-low rounded-lg text-secondary">
              <DollarSign size={20} />
            </div>
            <span className="text-label-sm font-label-sm text-error bg-error-container px-2 py-0.5 rounded-full">-1.8%</span>
          </div>
          <div className="mt-xl">
            <p className="text-label-md font-label-md text-on-surface-variant">Operational Cost</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-label-md font-label-md text-on-surface-variant">$</span>
              <h3 className="text-headline-md font-headline-md text-primary font-mono-md">34,070</h3>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div className="bg-on-tertiary p-lg rounded-xl border hairline">
          <h4 className="text-headline-sm font-headline-sm text-primary mb-md">Operational Health</h4>
          <div className="space-y-md">
            <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle size={20} />
              </div>
              <div>
                <p className="text-label-md font-label-md text-primary">Scheduled Maintenance Compliance</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">94% of fleet on schedule (+2% vs LW)</p>
              </div>
            </div>
            <div className="p-md rounded-lg bg-surface-container-low border border-outline-variant flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-label-md font-label-md text-primary">High Fuel Variance Detected</p>
                <p className="text-label-sm font-label-sm text-on-surface-variant">TRUCK-11 consumed 15% more fuel than average.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
