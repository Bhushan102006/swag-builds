import React from 'react';
import { 
  Fuel as FuelIcon, 
  CreditCard, 
  Plus, 
  TrendingUp, 
  CheckCircle2, 
  Download, 
  Filter, 
  Wrench,
  Lock
} from 'lucide-react';

export default function Fuel({ readOnly = false }: { readOnly?: boolean }) {
  return (
    <div className="p-lg max-w-[1440px] mx-auto space-y-lg flex flex-col min-h-0">
      {/* Title & Actions */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-md shrink-0">
        <div>
          <h2 className="text-display-lg font-display-lg text-on-surface font-bold tracking-tight flex items-center gap-2">
            Fuel & Expenses
            {readOnly && (
              <span className="text-[10px] bg-surface-container-high text-outline px-2 py-1 rounded font-bold uppercase tracking-widest flex items-center gap-1">
                <Lock size={10} /> View Only
              </span>
            )}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">
            Centralized monitoring of operational expenditure and fuel efficiency.
          </p>
        </div>
        {!readOnly && (
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-[#E8A33D] text-white px-5 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-90 transition-all active:scale-95 font-semibold cursor-pointer">
              <FuelIcon size={18} />
              + Log Fuel
            </button>
            <button className="flex items-center gap-2 bg-[#141b2c] text-white px-5 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:bg-[#1c253c] transition-all active:scale-95 font-semibold cursor-pointer">
              <Plus size={18} />
              + Add Expense
            </button>
          </div>
        )}
      </section>

      {/* KPI Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md shrink-0">
        {/* TOTAL OP. COST */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">TOTAL OP. COST</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              ₹ 34,070
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-red-500" />
            <span className="text-[13px] font-medium text-red-500">8.2% vs last month</span>
          </div>
        </div>

        {/* FUEL EFFICIENCY */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">FUEL EFFICIENCY</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              8.4 km/l
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-green-600">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-[13px] font-medium">Within target range</span>
          </div>
        </div>

        {/* AVG FUEL PRICE */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">AVG FUEL PRICE</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              ₹ 104.20
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[#7d8399]">
            <span className="text-[13px] font-medium">National Average: ₹ 102.50</span>
          </div>
        </div>

        {/* ACTIVE RECEIPTS */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">ACTIVE RECEIPTS</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              12 Pending
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[#7d8399]">
            <span className="text-[13px] font-medium">Requires admin approval</span>
          </div>
        </div>
      </section>

      {/* Fuel Logs Table Card */}
      <section className="bg-white rounded-2xl border border-[#ebeef8] overflow-hidden flex flex-col shrink-0">
        <div className="px-lg py-md border-b border-[#f1f3fe] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FuelIcon className="text-[#1d4fd5]" size={20} />
            <h4 className="text-headline-sm font-headline-sm text-black font-bold">Fuel Logs</h4>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-[#7d8399] hover:text-[#1d4fd5] hover:bg-[#f1f3fe] rounded-lg transition-all cursor-pointer" title="Filter">
              <Filter size={18} />
            </button>
            <button className="p-2 text-[#7d8399] hover:text-[#1d4fd5] hover:bg-[#f1f3fe] rounded-lg transition-all cursor-pointer" title="Download CSV">
              <Download size={18} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#ebeef8]">
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Vehicle</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Date</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Liters</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Cost (₹)</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3fe]">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-4 font-body-md text-on-surface font-semibold">VAN-05</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">05 JUL 2026</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">42 L</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">3,150</td>
                <td className="px-lg py-4">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-xs bg-[#e6fbf2] text-green-700">Verified</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-4 font-body-md text-on-surface font-semibold">TRUCK-11</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">06 JUL 2026</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">110 L</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">8,400</td>
                <td className="px-lg py-4">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-xs bg-[#e6fbf2] text-green-700">Verified</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-4 font-body-md text-on-surface font-semibold">MINI-03</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">06 JUL 2026</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">28 L</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">2,050</td>
                <td className="px-lg py-4">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-xs bg-[#fffaf0] text-amber-700 border border-amber-200 font-medium">Pending Approval</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#f8f9fc] border-t border-[#ebeef8] font-semibold">
                <td className="px-lg py-4 font-body-md text-on-surface" colSpan={3}>Total Fuel (Verified)</td>
                <td className="px-lg py-4 font-mono-md text-on-surface" colSpan={2}>₹ 11,550</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Other Expenses (Toll / Misc) Table Card */}
      <section className="bg-white rounded-2xl border border-[#ebeef8] overflow-hidden flex flex-col shrink-0">
        <div className="px-lg py-md border-b border-[#f1f3fe] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="text-[#1d4fd5]" size={20} />
            <h4 className="text-headline-sm font-headline-sm text-black font-bold">Other Expenses (Toll / Misc)</h4>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low border-b border-[#ebeef8]">
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Trip ID</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Vehicle</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Toll (₹)</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Other (₹)</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Maint. Linked</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Total (₹)</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3fe]">
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-4 font-body-md text-[#1d4fd5] font-semibold cursor-pointer hover:underline font-mono-md">TR001</td>
                <td className="px-lg py-4 font-body-md text-on-surface font-semibold">VAN-05</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">120</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">0</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">—</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">120</td>
                <td className="px-lg py-4">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-xs bg-[#e6fbf2] text-green-700">Available</span>
                </td>
              </tr>
              <tr className="hover:bg-surface-container-low/50 transition-colors">
                <td className="px-lg py-4 font-body-md text-[#1d4fd5] font-semibold cursor-pointer hover:underline font-mono-md">TR002</td>
                <td className="px-lg py-4 font-body-md text-on-surface font-semibold">TRX-12</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">340</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">180</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">19,000</td>
                <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">19,520</td>
                <td className="px-lg py-4">
                  <span className="px-2.5 py-1 rounded-full font-semibold text-xs bg-[#eff4ff] text-blue-700">Completed</span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#f8f9fc] border-t border-[#ebeef8] font-semibold">
                <td className="px-lg py-4 font-body-md text-on-surface" colSpan={5}>TOTAL OPERATIONAL COST (AUTO)</td>
                <td className="px-lg py-4 font-mono-md text-on-surface" colSpan={2}>₹ 34,070</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Grid: Monthly Cost Distribution & Recent Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-md shrink-0">
        {/* Monthly Cost Distribution (Bar Chart) */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between">
          <h4 className="text-headline-sm font-headline-sm text-black font-bold mb-8">Monthly Cost Distribution</h4>
          
          <div className="flex-1 flex items-end justify-around gap-6 h-[220px] pb-4">
            {/* Fuel Bar */}
            <div className="flex flex-col items-center gap-3 w-16">
              <div className="w-full bg-[#1d4fd5] rounded-t-md transition-all hover:opacity-90 cursor-pointer duration-500" style={{ height: '140px' }} title="Fuel: ₹ 11,550"></div>
              <span className="text-[12px] font-bold text-[#7d8399] uppercase tracking-wider">FUEL</span>
            </div>

            {/* Maint Bar */}
            <div className="flex flex-col items-center gap-3 w-16">
              <div className="w-full bg-[#E8A33D] rounded-t-md transition-all hover:opacity-90 cursor-pointer duration-500" style={{ height: '90px' }} title="Maint: ₹ 19,000"></div>
              <span className="text-[12px] font-bold text-[#7d8399] uppercase tracking-wider">MAINT.</span>
            </div>

            {/* Tolls Bar */}
            <div className="flex flex-col items-center gap-3 w-16">
              <div className="w-full bg-[#ffd899] rounded-t-md transition-all hover:opacity-90 cursor-pointer duration-500" style={{ height: '35px' }} title="Tolls: ₹ 460"></div>
              <span className="text-[12px] font-bold text-[#7d8399] uppercase tracking-wider">TOLLS</span>
            </div>

            {/* Misc Bar */}
            <div className="flex flex-col items-center gap-3 w-16">
              <div className="w-full bg-[#e2e8f0] rounded-t-md transition-all hover:opacity-90 cursor-pointer duration-500" style={{ height: '15px' }} title="Misc: ₹ 180"></div>
              <span className="text-[12px] font-bold text-[#7d8399] uppercase tracking-wider">MISC</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between">
          <h4 className="text-headline-sm font-headline-sm text-black font-bold mb-6">Recent Transactions</h4>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* NH48 Highway Toll */}
            <div className="flex items-center justify-between p-3 hover:bg-surface-container-low/50 rounded-xl transition-all border border-transparent hover:border-[#ebeef8]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#1d4fd5]">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="text-label-md font-label-md text-black font-bold">NH48 Highway Toll</p>
                  <p className="text-[12px] text-[#7d8399] font-medium mt-0.5">TR001 • Today, 10:45 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-label-md font-bold text-black font-mono-md">₹ 120.00</p>
              </div>
            </div>

            {/* Fuel Refill */}
            <div className="flex items-center justify-between p-3 hover:bg-surface-container-low/50 rounded-xl transition-all border border-transparent hover:border-[#ebeef8]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#e6fbf2] rounded-xl flex items-center justify-center text-green-600">
                  <FuelIcon size={20} />
                </div>
                <div>
                  <p className="text-label-md font-label-md text-black font-bold">Fuel Refill - Indian Oil</p>
                  <p className="text-[12px] text-[#7d8399] font-medium mt-0.5">VAN-05 • Yesterday</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-label-md font-bold text-black font-mono-md">₹ 3,150.00</p>
              </div>
            </div>

            {/* Tyre Replacement */}
            <div className="flex items-center justify-between p-3 hover:bg-[#fff9f0] rounded-xl transition-all border border-transparent hover:border-[#ffe8cc]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#fff5f5] rounded-xl flex items-center justify-center text-amber-600">
                  <Wrench size={20} className="text-[#E8A33D]" />
                </div>
                <div>
                  <p className="text-label-md font-label-md text-black font-bold">Tyre Replacement</p>
                  <p className="text-[12px] text-[#7d8399] font-medium mt-0.5">TRX-12 • 06 JUL 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-label-md font-bold text-black font-mono-md font-semibold">₹ 19,000.00</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
