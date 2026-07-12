import React from 'react';
import { Save, Bell, Globe, Building2, Check } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-xl max-w-6xl mx-auto space-y-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-start mb-lg">
        <div>
          <h2 className="text-display-sm font-display-sm font-bold text-on-surface mb-2">Settings</h2>
          <p className="text-body-lg font-body-lg text-on-surface-variant">Configure depot parameters and manage role-based access control permissions.</p>
        </div>
        <button className="bg-depot-amber hover:bg-depot-amber/90 text-primary-container px-5 py-2.5 rounded-lg font-semibold flex items-center gap-2 transition-colors shadow-sm">
          <Save size={18} />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl relative pb-16">
        <div className="lg:col-span-5 space-y-6">
          {/* Depot Profile Card */}
          <div className="bg-surface-container-lowest hairline rounded-xl p-lg">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-signal-blue" size={20} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Depot Profile</h3>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Depot Name</label>
                <input 
                  type="text" 
                  defaultValue="Gandhinagar Depot G24" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-signal-blue focus:ring-1 focus:ring-signal-blue transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Location/Address</label>
                <textarea 
                   defaultValue="Sector 24, Electronics Estate,&#10;Gandhinagar, Gujarat 382024"
                   className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-signal-blue focus:ring-1 focus:ring-signal-blue transition-colors resize-none h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Primary Contact</label>
                <input 
                  type="text" 
                  defaultValue="+91 79 2321 0000" 
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-signal-blue focus:ring-1 focus:ring-signal-blue transition-colors font-mono-md"
                />
              </div>
            </div>
          </div>

          {/* Regional Settings Card */}
          <div className="bg-surface-container-lowest hairline rounded-xl p-lg">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-signal-blue" size={20} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Regional Settings</h3>
            </div>
            
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Currency</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-signal-blue focus:ring-1 focus:ring-signal-blue transition-colors appearance-none cursor-pointer">
                  <option>INR (₹) - Indian Rupee</option>
                  <option>USD ($) - US Dollar</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Distance Unit</label>
                <div className="flex bg-surface-container-low border border-outline-variant rounded-lg p-1">
                  <button className="flex-1 py-2 rounded-md bg-white shadow-sm border border-outline-variant/30 text-signal-blue font-semibold text-sm">Kilometers</button>
                  <button className="flex-1 py-2 text-on-surface-variant font-medium text-sm hover:text-on-surface transition-colors">Miles</button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Timezone</label>
                <select className="w-full bg-surface-container-low border border-outline-variant rounded-lg px-4 py-3 text-body-md text-on-surface focus:outline-none focus:border-signal-blue focus:ring-1 focus:ring-signal-blue transition-colors appearance-none cursor-pointer">
                  <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Notifications */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest hairline rounded-xl p-lg min-h-full">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-outline-variant leading-tight">
              <Bell className="text-signal-blue" size={20} />
              <h3 className="text-headline-sm font-headline-sm text-on-surface">Notification Preferences</h3>
            </div>
            
            <div className="space-y-6 mt-4">
              <div className="flex items-start justify-between gap-4 group cursor-pointer">
                <div>
                  <h4 className="font-bold text-on-surface mb-1">System Alerts</h4>
                  <p className="text-on-surface-variant text-sm">Emergency breakdowns and route deviations.</p>
                </div>
                <Toggle checked={true} />
              </div>
              
              <div className="flex items-start justify-between gap-4 group cursor-pointer">
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Maintenance Reminders</h4>
                  <p className="text-on-surface-variant text-sm">Scheduled service and document renewals.</p>
                </div>
                <Toggle checked={true} />
              </div>

              <div className="flex items-start justify-between gap-4 group cursor-pointer">
                <div>
                  <h4 className="font-bold text-on-surface mb-1">Fuel Variance Reports</h4>
                  <p className="text-on-surface-variant text-sm">Daily summaries of consumption deviations.</p>
                </div>
                <Toggle checked={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between py-6 mt-8 border-t border-outline-variant/30 text-label-sm text-outline font-medium">
        <span>© 2024 TransitOps Fleet Solutions v2.4.1</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-on-surface transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-on-surface transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-on-surface transition-colors">Help Center</a>
        </div>
      </div>
    </div>
  );
}

function Toggle({ checked }: { checked: boolean }) {
  return (
    <div className={`w-11 h-6 rounded-full flex items-center shrink-0 p-1 transition-colors duration-200 ${checked ? 'bg-signal-blue' : 'bg-surface-container-highest hairline'}`}>
      <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 ${checked ? 'translate-x-5 bg-white' : 'translate-x-0 bg-outline-variant'}`}>
        {checked && <Check size={12} className="text-signal-blue stroke-[3]" />}
      </div>
    </div>
  );
}
