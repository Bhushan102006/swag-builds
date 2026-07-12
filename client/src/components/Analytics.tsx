import React, { useState } from 'react';
import { 
  Download, 
  Fuel, 
  Calendar, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CheckCircle,
  CheckCircle2, 
  AlertTriangle,
  FileText,
  Lock
} from 'lucide-react';

export default function Analytics({ readOnly = false }: { readOnly?: boolean }) {
  const [activeFilter, setActiveFilter] = useState<'30days' | 'quarterly' | 'annual'>('30days');

  // SVG dimensions for the circular progress donut
  const radius = 30;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const utilizationPercent = 81;
  const strokeDashoffset = circumference - (utilizationPercent / 100) * circumference;
  return (
    <div className="p-lg max-w-[1440px] mx-auto space-y-lg">
      {/* Title & Filters */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-md">
        <div>
          <h2 className="text-display-lg font-display-lg text-primary tracking-tight font-bold flex items-center gap-3">
            Reports & Analytics
            {readOnly && <span className="text-[12px] bg-surface-container-high text-outline px-3 py-1 rounded-full font-bold uppercase tracking-widest flex items-center gap-1 leading-none"><Lock size={12} /> View Only</span>}
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant mt-1">Real-time performance monitoring and fleet health overview.</p>
        </div>
        <div className="flex items-center gap-sm">
          <div className="flex bg-[#ebeef8] p-1 rounded-xl border border-outline-variant">
            <button 
              onClick={() => setActiveFilter('30days')}
              className={`px-4 py-1.5 rounded-lg text-label-md font-label-md transition-all cursor-pointer ${
                activeFilter === '30days' 
                  ? 'bg-white shadow-sm text-black font-semibold' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => setActiveFilter('quarterly')}
              className={`px-4 py-1.5 rounded-lg text-label-md font-label-md transition-all cursor-pointer ${
                activeFilter === 'quarterly' 
                  ? 'bg-white shadow-sm text-black font-semibold' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Quarterly
            </button>
            <button 
              onClick={() => setActiveFilter('annual')}
              className={`px-4 py-1.5 rounded-lg text-label-md font-label-md transition-all cursor-pointer ${
                activeFilter === 'annual' 
                  ? 'bg-white shadow-sm text-black font-semibold' 
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Annual
            </button>
          </div>
          <button className="flex items-center gap-2 bg-white border border-outline-variant px-4 py-2 rounded-xl text-button-md font-button-md hover:bg-[#f1f3fe] transition-colors shadow-sm font-semibold cursor-pointer">
            <Download size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* 4 KPI Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-md">
        {/* Fuel Efficiency */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#1d4fd5]">
              <Fuel size={20} />
            </div>
            <span className="text-[12px] font-semibold text-green-600 bg-[#e6fbf2] px-2.5 py-1 rounded-full">+4.2%</span>
          </div>
          <div className="mt-6">
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Fuel Efficiency</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h3 className="text-[32px] font-bold text-black tracking-tight">8.4</h3>
              <span className="text-label-md font-label-md text-[#7d8399] font-medium ml-1">km/l</span>
            </div>
          </div>
        </div>

        {/* Fleet Utilization */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#1d4fd5]">
              <Calendar size={20} />
            </div>
            <span className="text-[12px] font-semibold text-green-600 bg-[#e6fbf2] px-2.5 py-1 rounded-full">+2.1%</span>
          </div>
          <div className="mt-6">
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Fleet Utilization</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h3 className="text-[32px] font-bold text-black tracking-tight">81%</h3>
            </div>
          </div>
        </div>

        {/* Operational Cost */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#1d4fd5]">
              <CreditCard size={20} />
            </div>
            <span className="text-[12px] font-semibold text-red-500 bg-[#ffebee] px-2.5 py-1 rounded-full">-1.8%</span>
          </div>
          <div className="mt-6">
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Operational Cost</p>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-label-md font-label-md text-[#7d8399] font-medium">$</span>
              <h3 className="text-[32px] font-bold text-black tracking-tight font-mono-md ml-1 inline-block">34,070</h3>
            </div>
          </div>
        </div>

        {/* Vehicle ROI */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between hover:border-[#1d4fd5]/30 hover:shadow-md transition-all">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 bg-[#eff4ff] rounded-xl flex items-center justify-center text-[#1d4fd5]">
              <TrendingUp size={20} />
            </div>
            <span className="text-[12px] font-semibold text-green-600 bg-[#e6fbf2] px-2.5 py-1 rounded-full">+0.5%</span>
          </div>
          <div className="mt-6">
            <p className="text-label-sm font-label-sm text-[#7d8399] uppercase tracking-wider font-semibold">Vehicle ROI</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h3 className="text-[32px] font-bold text-black tracking-tight">14.2%</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Chart & Costliest Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-md">
        {/* Monthly Revenue Chart - span 2 */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] lg:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-headline-sm font-headline-sm text-black font-bold">Monthly Revenue</h4>
            <div className="flex items-center gap-4 text-label-sm font-label-sm text-[#7d8399] font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#1d4fd5]"></span>
                <span>Gross Profit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#cbd5e1]"></span>
                <span>Expense Target</span>
              </div>
            </div>
          </div>
          
          {/* Custom SVG Line Chart */}
          <div className="flex-1 min-h-[260px] relative">
            <svg 
              className="w-full h-full min-h-[260px]" 
              viewBox="0 0 600 240" 
              preserveAspectRatio="none"
            >
              {/* Grids */}
              <line x1="40" y1="40" x2="560" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="90" x2="560" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="140" x2="560" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="190" x2="560" y2="190" stroke="#f1f5f9" strokeWidth="1" />

              {/* Area Under Gross Profit Line */}
              <defs>
                <linearGradient id="grossProfitGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1d4fd5" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1d4fd5" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path 
                d="M 40 180 C 80 170, 80 150, 120 150 C 160 150, 160 170, 200 165 C 240 160, 240 110, 280 100 C 320 90, 320 70, 360 75 C 400 80, 400 130, 440 120 C 480 110, 480 60, 520 50 L 520 200 L 40 200 Z" 
                fill="url(#grossProfitGrad)" 
              />

              {/* Expense Target Line (Dashed) */}
              <path 
                d="M 40 190 C 80 180, 80 160, 120 155 C 160 150, 160 145, 200 140 C 240 135, 240 125, 280 115 C 320 105, 320 95, 360 92 C 400 90, 400 105, 440 100 C 480 95, 480 85, 520 80" 
                fill="none" 
                stroke="#cbd5e1" 
                strokeWidth="2.5" 
                strokeDasharray="6 4" 
              />

              {/* Gross Profit Line */}
              <path 
                d="M 40 180 C 80 170, 80 150, 120 150 C 160 150, 160 170, 200 165 C 240 160, 240 110, 280 100 C 320 90, 320 70, 360 75 C 400 80, 400 130, 440 120 C 480 110, 480 60, 520 50" 
                fill="none" 
                stroke="#1d4fd5" 
                strokeWidth="3.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Interactive Dots & Tooltips */}
              <circle cx="520" cy="50" r="5" fill="#1d4fd5" stroke="#ffffff" strokeWidth="2" />
              <circle cx="440" cy="120" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="360" cy="75" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="280" cy="100" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="200" cy="165" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="120" cy="150" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
              <circle cx="40" cy="180" r="4" fill="#1d4fd5" stroke="#ffffff" strokeWidth="1.5" />
            </svg>
          </div>

          {/* X Axis Labels */}
          <div className="flex justify-between px-6 pt-4 border-t border-[#f1f5f9] text-[12px] font-semibold text-[#7d8399]">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>

        {/* Top Costliest Vehicles - span 1 */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between">
          <div>
            <h4 className="text-headline-sm font-headline-sm text-black font-bold mb-6">Top Costliest Vehicles</h4>
            <div className="space-y-6">
              {/* Truck 11 */}
              <div>
                <div className="flex justify-between items-center text-label-md font-label-md font-semibold text-black mb-2">
                  <span>TRUCK-11</span>
                  <span>$12,450</span>
                </div>
                <div className="w-full h-2.5 bg-[#f1f3fe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1d4fd5] rounded-full transition-all duration-500" style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Mini 03 */}
              <div>
                <div className="flex justify-between items-center text-label-md font-label-md font-semibold text-black mb-2">
                  <span>MINI-03</span>
                  <span>$8,920</span>
                </div>
                <div className="w-full h-2.5 bg-[#f1f3fe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#1d4fd5] rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
                </div>
              </div>

              {/* Van 05 */}
              <div>
                <div className="flex justify-between items-center text-label-md font-label-md font-semibold text-black mb-2">
                  <span>VAN-05</span>
                  <span>$5,100</span>
                </div>
                <div className="w-full h-2.5 bg-[#f1f3fe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2d3748] rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
                </div>
              </div>

              {/* Van 08 */}
              <div>
                <div className="flex justify-between items-center text-label-md font-label-md font-semibold text-black mb-2">
                  <span>VAN-08</span>
                  <span>$4,250</span>
                </div>
                <div className="w-full h-2.5 bg-[#f1f3fe] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2d3748] rounded-full transition-all duration-500" style={{ width: '28%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-6 border-t border-[#f1f5f9] text-center">
            <button className="text-secondary font-semibold hover:text-[#1d4fd5]/80 text-label-md transition-colors cursor-pointer">
              View Breakdown Reports
            </button>
          </div>
        </div>
      </div>

      {/* Operational Health & Strategy Insight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
        {/* Operational Health */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] flex flex-col justify-between">
          <h4 className="text-headline-sm font-headline-sm text-black font-bold mb-6">Operational Health</h4>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            {/* Scheduled Maintenance Compliance */}
            <div className="p-md rounded-2xl bg-[#f0f9f4] border border-[#d1ebd9] flex items-center gap-4 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-[#dcfce7] flex items-center justify-center text-green-600 shrink-0">
                <CheckCircle2 size={22} className="text-[#10b981]" />
              </div>
              <div>
                <p className="text-label-md font-label-md text-black font-bold">Scheduled Maintenance Compliance</p>
                <p className="text-label-sm font-label-sm text-[#7d8399] font-medium mt-0.5">94% of fleet on schedule (+2% vs LW)</p>
              </div>
            </div>

            {/* High Fuel Variance Detected */}
            <div className="p-md rounded-2xl bg-[#fff5f5] border border-[#fed7d7] flex items-center gap-4 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-full bg-[#ffe4e4] flex items-center justify-center text-[#ef4444] shrink-0">
                <AlertTriangle size={22} className="text-[#ef4444]" />
              </div>
              <div>
                <p className="text-label-md font-label-md text-black font-bold">High Fuel Variance Detected</p>
                <p className="text-label-sm font-label-sm text-[#7d8399] font-medium mt-0.5">TRUCK-11 consumed 15% more fuel than average.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Strategy Insight */}
        <div className="bg-white p-lg rounded-2xl border border-[#ebeef8] relative flex flex-col justify-between min-h-[220px]">
          <div>
            <h4 className="text-headline-sm font-headline-sm text-black font-bold mb-6">Strategy Insight</h4>
            
            {/* Donut Progress & Text */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pr-12">
              {/* SVG Donut Progress */}
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-20 h-20 -rotate-90">
                  {/* Track */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke="#f1f3fe"
                    strokeWidth={strokeWidth}
                  />
                  {/* Arc */}
                  <circle
                    cx="40"
                    cy="40"
                    r={radius}
                    fill="transparent"
                    stroke="#1d4fd5"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute text-[15px] font-bold text-black">81%</span>
              </div>
              
              {/* Insight Text */}
              <div className="flex-1">
                <p className="text-label-md font-label-md text-black leading-relaxed font-medium">
                  Your current fleet utilization is <span className="font-bold text-black">optimal</span>. Increasing workload by another 5% will maximize ROI without increasing maintenance overhead.
                </p>
                <p className="text-label-sm font-label-sm text-[#1d4fd5] italic font-semibold mt-2">
                  Predicted ROI at 86% utilization: 16.8%
                </p>
              </div>
            </div>
          </div>

          {/* Floating Blue Icon on Card Right */}
          <div className="absolute right-6 top-16 w-11 h-11 bg-[#1d4fd5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1d4fd5]/30 cursor-pointer hover:bg-[#1d4fd5]/90 transition-all">
            <FileText size={20} />
          </div>

          {/* Full-width Black Button */}
          <div className="mt-6">
            <button className="w-full bg-[#000000] hover:bg-[#1e2538] text-white py-3 px-4 rounded-xl text-button-md font-button-md transition-all font-semibold shadow-sm cursor-pointer">
              Generate Detailed ROI Projection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
