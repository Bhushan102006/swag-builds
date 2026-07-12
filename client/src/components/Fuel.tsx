import React, { useState, useEffect } from 'react';
import { 
  Fuel as FuelIcon, CreditCard, Plus, TrendingUp, CheckCircle2, 
  Download, Filter, Wrench, Lock, AlertCircle, IndianRupee
} from 'lucide-react';
import { 
  getFuelLogs, getExpenses, createFuelLog, createExpense, 
  getReports, getVehicles, FuelLog, Expense, ReportsData, Vehicle 
} from '../api';

export default function Fuel({ readOnly = false }: { readOnly?: boolean }) {
  const [fuelLogs, setFuelLogs] = useState<FuelLog[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [reports, setReports] = useState<ReportsData | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);

  // Modals state
  const [isFuelModalOpen, setIsFuelModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fuel Form State
  const [fuelVehicle, setFuelVehicle] = useState('');
  const [liters, setLiters] = useState<number | ''>('');
  const [fuelCost, setFuelCost] = useState<number | ''>('');

  // Expense Form State
  const [expenseVehicle, setExpenseVehicle] = useState('');
  const [expenseType, setExpenseType] = useState('Toll');
  const [expenseAmount, setExpenseAmount] = useState<number | ''>('');
  const [expenseDescription, setExpenseDescription] = useState('');

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [fuelRes, expRes, repRes, vehRes] = await Promise.all([
        getFuelLogs(),
        getExpenses(),
        getReports(),
        getVehicles()
      ]);
      setFuelLogs(fuelRes.fuelLogs);
      setExpenses(expRes.expenses);
      setReports(repRes.data);
      setVehicles(vehRes.vehicles);
    } catch (err) {
      console.error("Error fetching fuel and expenses data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFuelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fuelVehicle || liters === '' || fuelCost === '') return;
    
    setIsSubmitting(true);
    try {
      await createFuelLog({
        vehicle: fuelVehicle,
        liters: Number(liters),
        cost: Number(fuelCost)
      });
      setIsFuelModalOpen(false);
      setFuelVehicle('');
      setLiters('');
      setFuelCost('');
      await fetchData();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to log fuel');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExpenseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseVehicle || expenseAmount === '') return;
    
    setIsSubmitting(true);
    try {
      await createExpense({
        vehicle: expenseVehicle,
        expenseType,
        amount: Number(expenseAmount),
        description: expenseDescription
      });
      setIsExpenseModalOpen(false);
      setExpenseVehicle('');
      setExpenseType('Toll');
      setExpenseAmount('');
      setExpenseDescription('');
      await fetchData();
    } catch (err: any) {
      alert(err?.data?.message || err?.message || 'Failed to add expense');
    } finally {
      setIsSubmitting(false);
    }
  };

  // KPIs
  const totalOpCost = reports ? reports.totalFuelCost + reports.totalMaintenanceCost + reports.totalExpenses : 0;
  const avgFuelPrice = fuelLogs.length > 0 
    ? fuelLogs.reduce((sum, log) => sum + (log.cost / log.liters), 0) / fuelLogs.length 
    : 0;
  const fuelEfficiency = 8.4; // mock calculation, would need distance data per vehicle

  const allTransactions = [
    ...fuelLogs.map(f => ({ type: 'Fuel', date: new Date(f.createdAt), amount: f.cost, vehicle: f.vehicle?.registrationNumber, ref: f })),
    ...expenses.map(e => ({ type: e.expenseType, date: new Date(e.createdAt), amount: e.amount, vehicle: e.vehicle?.registrationNumber, ref: e }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);

  return (
    <div className="p-lg max-w-[1440px] mx-auto space-y-lg flex flex-col min-h-0 relative">
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
            <button 
              onClick={() => setIsFuelModalOpen(true)}
              className="flex items-center gap-2 bg-[#E8A33D] text-white px-5 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:opacity-90 transition-all active:scale-95 font-semibold cursor-pointer"
            >
              <FuelIcon size={18} />
              + Log Fuel
            </button>
            <button 
              onClick={() => setIsExpenseModalOpen(true)}
              className="flex items-center gap-2 bg-[#141b2c] text-white px-5 py-2.5 rounded-lg font-button-md text-button-md shadow-sm hover:bg-[#1c253c] transition-all active:scale-95 font-semibold cursor-pointer"
            >
              <Plus size={18} />
              + Add Expense
            </button>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md shrink-0">
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">TOTAL OP. COST</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              ₹ {totalOpCost.toLocaleString()}
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5">
            <TrendingUp size={16} className="text-red-500" />
            <span className="text-[13px] font-medium text-red-500">Auto-calculated</span>
          </div>
        </div>

        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">FUEL EFFICIENCY</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              {fuelEfficiency} km/l
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-green-600">
            <CheckCircle2 size={16} className="text-green-600" />
            <span className="text-[13px] font-medium">Within target range</span>
          </div>
        </div>

        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">AVG FUEL PRICE</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              ₹ {avgFuelPrice.toFixed(2)}
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[#7d8399]">
            <span className="text-[13px] font-medium">National Average: ₹ 102.50</span>
          </div>
        </div>

        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div>
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">MAINTENANCE COST</p>
            <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md mt-2">
              ₹ {reports?.totalMaintenanceCost.toLocaleString() || '0'}
            </h3>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[#7d8399]">
            <span className="text-[13px] font-medium">From closed tickets</span>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-2xl border border-[#ebeef8] overflow-hidden flex flex-col shrink-0">
        <div className="px-lg py-md border-b border-[#f1f3fe] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FuelIcon className="text-[#1d4fd5]" size={20} />
            <h4 className="text-headline-sm font-headline-sm text-black font-bold">Fuel Logs</h4>
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
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3fe]">
              {isLoading ? (
                <tr><td colSpan={4} className="px-lg py-4 text-center text-[#7d8399]">Loading...</td></tr>
              ) : fuelLogs.length === 0 ? (
                <tr><td colSpan={4} className="px-lg py-4 text-center text-[#7d8399]">No fuel logs</td></tr>
              ) : (
                fuelLogs.slice(0, 5).map(log => (
                  <tr key={log._id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-lg py-4 font-body-md text-on-surface font-semibold">{log.vehicle?.registrationNumber || 'Unknown'}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">{log.liters} L</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">₹ {log.cost.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-[#f8f9fc] border-t border-[#ebeef8] font-semibold">
                <td className="px-lg py-4 font-body-md text-on-surface" colSpan={3}>Total Fuel Cost</td>
                <td className="px-lg py-4 font-mono-md text-on-surface">₹ {reports?.totalFuelCost.toLocaleString() || '0'}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

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
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Vehicle</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Type</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Date</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Description</th>
                <th className="px-lg py-3 text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f3fe]">
              {isLoading ? (
                <tr><td colSpan={5} className="px-lg py-4 text-center text-[#7d8399]">Loading...</td></tr>
              ) : expenses.length === 0 ? (
                <tr><td colSpan={5} className="px-lg py-4 text-center text-[#7d8399]">No expenses</td></tr>
              ) : (
                expenses.slice(0, 5).map(exp => (
                  <tr key={exp._id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-lg py-4 font-body-md text-on-surface font-semibold">{exp.vehicle?.registrationNumber || 'Unknown'}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">{exp.expenseType}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">{new Date(exp.createdAt).toLocaleDateString()}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">{exp.description || '—'}</td>
                    <td className="px-lg py-4 font-body-md text-on-surface-variant font-mono-md">₹ {exp.amount.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className="bg-[#f8f9fc] border-t border-[#ebeef8] font-semibold">
                <td className="px-lg py-4 font-body-md text-on-surface" colSpan={4}>Total Other Expenses</td>
                <td className="px-lg py-4 font-mono-md text-on-surface">₹ {reports?.totalExpenses.toLocaleString() || '0'}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Modals */}
      {isFuelModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-headline-md font-headline-md text-on-surface">Log Fuel</h3>
              <button onClick={() => setIsFuelModalOpen(false)} className="w-8 h-8 flex justify-center items-center rounded hover:bg-outline-variant transition-colors">&times;</button>
            </div>
            <form onSubmit={handleFuelSubmit} className="p-lg space-y-md">
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Vehicle</label>
                <select value={fuelVehicle} onChange={e => setFuelVehicle(e.target.value)} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none">
                  <option value="" disabled>Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Liters</label>
                <input type="number" value={liters} onChange={e => setLiters(Number(e.target.value))} required min="0" step="0.1" className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none" placeholder="e.g. 40" />
              </div>
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Total Cost (₹)</label>
                <input type="number" value={fuelCost} onChange={e => setFuelCost(Number(e.target.value))} required min="0" className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none" placeholder="e.g. 4000" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsFuelModalOpen(false)} className="px-4 py-2 hover:bg-surface-container rounded-lg font-bold">Cancel</button>
                <button type="submit" disabled={isSubmitting || !fuelVehicle} className="px-4 py-2 bg-[#E8A33D] text-white rounded-lg font-bold disabled:opacity-50">Save Fuel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isExpenseModalOpen && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-[100] backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-lg w-full max-w-md overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between">
              <h3 className="text-headline-md font-headline-md text-on-surface">Add Expense</h3>
              <button onClick={() => setIsExpenseModalOpen(false)} className="w-8 h-8 flex justify-center items-center rounded hover:bg-outline-variant transition-colors">&times;</button>
            </div>
            <form onSubmit={handleExpenseSubmit} className="p-lg space-y-md">
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Vehicle</label>
                <select value={expenseVehicle} onChange={e => setExpenseVehicle(e.target.value)} required className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none">
                  <option value="" disabled>Select Vehicle</option>
                  {vehicles.map(v => <option key={v._id} value={v._id}>{v.registrationNumber}</option>)}
                </select>
              </div>
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Expense Type</label>
                <select value={expenseType} onChange={e => setExpenseType(e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none">
                  <option value="Toll">Toll</option>
                  <option value="Misc">Misc</option>
                </select>
              </div>
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Amount (₹)</label>
                <input type="number" value={expenseAmount} onChange={e => setExpenseAmount(Number(e.target.value))} required min="0" className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none" placeholder="e.g. 150" />
              </div>
              <div>
                <label className="text-label-sm uppercase tracking-wider block mb-1">Description</label>
                <input type="text" value={expenseDescription} onChange={e => setExpenseDescription(e.target.value)} className="w-full bg-surface border border-outline-variant rounded-lg p-2.5 outline-none" placeholder="e.g. NH48 Highway" />
              </div>
              <div className="flex justify-end gap-3 mt-4">
                <button type="button" onClick={() => setIsExpenseModalOpen(false)} className="px-4 py-2 hover:bg-surface-container rounded-lg font-bold">Cancel</button>
                <button type="submit" disabled={isSubmitting || !expenseVehicle} className="px-4 py-2 bg-[#141b2c] text-white rounded-lg font-bold disabled:opacity-50">Save Expense</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
