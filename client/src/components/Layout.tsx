import React from 'react';
import { 
  Truck, 
  LayoutDashboard, 
  Users, 
  Map, 
  Wrench, 
  Fuel, 
  BarChart2, 
  Settings,
  Search,
  Bell,
  HelpCircle,
  Route,
  LogOut
} from 'lucide-react';
import { Screen, User } from '../App';

interface LayoutProps {
  children: React.ReactNode;
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  user: User | null;
  onLogout: () => void;
}

export default function Layout({ children, currentScreen, onNavigate, user, onLogout }: LayoutProps) {
  const navItems: { id: Screen; label: string; icon: any }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Fleet', icon: Truck },
  ];

  if (user?.role === 'dispatcher' || user?.role === 'safety_officer') {
    navItems.push({ id: 'trips', label: 'Trips', icon: Route });
  }

  if (user?.role === 'fleet_manager' || user?.role === 'safety_officer') {
    navItems.push({ id: 'drivers', label: 'Drivers', icon: Users });
  }

  navItems.push(
    { id: 'maintenance', label: 'Maintenance', icon: Wrench },
    { id: 'reports', label: 'Analytics', icon: BarChart2 }
  );

  return (
    <div className="bg-background text-on-background font-body-md overflow-hidden h-screen flex">
      {/* SideNavBar */}
      <aside className="w-[260px] bg-[#141b2c] border-r border-[#1e2538] flex flex-col z-50 shrink-0">
        <div className="px-lg py-xl">
          <div className="flex flex-col">
            <h1 className="text-headline-md font-headline-md font-extrabold text-white leading-tight">TransitOps</h1>
            <p className="text-[10px] font-label-sm text-[#7d8399] tracking-[0.18em] uppercase font-bold mt-0.5">Fleet Operations</p>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1 px-3 custom-scrollbar overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-left ${
                  isActive 
                    ? 'border-l-4 border-[#1d4fd5] bg-[#1e2538] text-white rounded-l-none'
                    : 'text-[#7d8399] hover:bg-[#1e2538]/50 hover:text-white group'
                }`}
              >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-[#7d8399] group-hover:text-white'} />
                <span className="text-label-md font-label-md font-medium">{item.label}</span>
              </button>
            );
          })}
          
          <div className="mt-2 border-t border-[#1e2538] pt-2 mb-2">
             <button 
               onClick={() => onNavigate('settings')}
               className={`flex w-full items-center gap-3 px-4 py-3.5 rounded-lg transition-all text-left ${
                 currentScreen === 'settings'
                   ? 'border-l-4 border-[#1d4fd5] bg-[#1e2538] text-white rounded-l-none'
                   : 'text-[#7d8399] hover:bg-[#1e2538]/50 hover:text-white'
               }`}
             >
              <Settings size={20} className={currentScreen === 'settings' ? 'text-white' : 'text-[#7d8399] hover:text-white'} />
              <span className="text-label-md font-label-md font-medium">Settings</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Bottom Profile Card */}
        <div className="p-4 border-t border-[#1e2538] bg-[#141b2c]">
          <div className="flex items-center gap-3 p-3 bg-[#1c2333] rounded-xl border border-[#2a3245]">
            <div className="w-10 h-10 rounded-full bg-[#1d4fd5] flex items-center justify-center text-white font-bold shrink-0">
              {user?.fullName
                ? user.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2)
                : 'RA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-label-md font-label-md text-white font-semibold truncate leading-normal">
                {user?.fullName || 'Admin User'}
              </p>
              <p className="text-[11px] font-label-sm text-[#7d8399] truncate mt-0.5">
                {user?.role === 'dispatcher'
                  ? 'Fleet Dispatcher'
                  : user?.role === 'safety_officer'
                  ? 'Safety Officer'
                  : user?.role === 'fleet_manager'
                  ? 'Fleet Manager'
                  : user?.role === 'financial_analyst'
                  ? 'Financial Analyst'
                  : 'Fleet Manager'}
              </p>
            </div>
            <button
              onClick={onLogout}
              className="p-1.5 text-[#7d8399] hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="h-16 bg-white border-b border-outline-variant flex items-center justify-between px-lg z-40 shrink-0">
          <div className="flex items-center w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-body-lg" size={18} />
              <input 
                type="text" 
                placeholder="Search reports, vehicles, or metrics..." 
                className="w-full pl-10 pr-4 py-2 bg-[#f8f9fc] border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-secondary-container outline-none transition-all placeholder:text-[#7d8399]"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-on-surface-variant hover:text-secondary transition-all">
                <Bell size={20} className="text-[#181c23]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border border-white"></span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-secondary transition-all">
                <HelpCircle size={20} className="text-[#181c23]" />
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <div className="relative flex items-center gap-1 cursor-pointer hover:text-secondary transition-colors py-2 px-1">
              <span className="text-label-md font-label-md font-semibold text-[#181c23]">Profile Settings</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#181c23]">
                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-[#f8f9fc] relative">
          {children}
        </main>
      </div>
    </div>
  );
}
