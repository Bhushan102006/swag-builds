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
      <aside className="w-[260px] bg-primary-container border-r border-outline-variant flex flex-col z-50 shrink-0">
        <div className="px-lg py-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-on-tertiary-container rounded-lg flex items-center justify-center">
              <Truck className="text-on-tertiary" size={24} />
            </div>
            <div>
              <h1 className="text-headline-md font-headline-md font-extrabold text-on-tertiary leading-tight">TransitOps</h1>
              <p className="text-label-sm font-label-sm text-on-primary-container opacity-80 uppercase tracking-widest">Fleet Operations</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-1 px-2 custom-scrollbar overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                currentScreen === item.id 
                  ? 'border-l-4 border-secondary-container bg-on-primary-fixed-variant text-on-tertiary active:scale-[0.99] rounded-l-none'
                  : 'text-on-primary-container opacity-70 hover:bg-on-primary-fixed-variant hover:opacity-100 group'
              }`}
            >
              <item.icon size={20} />
              <span className="text-label-md font-label-md">{item.label}</span>
            </button>
          ))}
          
          <div className="mt-auto mb-4 border-t border-outline-variant/20 pt-4">
             <button 
               onClick={() => onNavigate('settings')}
               className={`flex w-full items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                 currentScreen === 'settings'
                   ? 'border-l-4 border-secondary-container bg-on-primary-fixed-variant text-on-tertiary active:scale-[0.99] rounded-l-none'
                   : 'text-on-primary-container opacity-70 hover:bg-on-primary-fixed-variant hover:opacity-100'
               }`}
             >
              <Settings size={20} />
              <span className="text-label-md font-label-md">Settings</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TopNavBar */}
        <header className="h-16 bg-surface border-b border-outline-variant flex items-center justify-between px-lg z-40 shrink-0">
          <div className="flex items-center gap-gutter w-1/2">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-body-lg" size={20} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-body-md focus:ring-2 focus:ring-secondary-container focus:border-secondary outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-on-surface-variant hover:text-secondary transition-all">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-secondary transition-all">
                <HelpCircle size={20} />
              </button>
            </div>
            <div className="h-8 w-px bg-outline-variant mx-2"></div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 group">
                <div className="text-right">
                  <p className="text-label-md font-label-md text-on-surface">
                    {user?.fullName || 'Alex Mercer'}
                  </p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">
                    {user?.role === 'dispatcher' ? 'Fleet Dispatcher' :
                     user?.role === 'safety_officer' ? 'Safety Officer' :
                     user?.role === 'fleet_manager' ? 'Fleet Manager' :
                     user?.role === 'financial_analyst' ? 'Financial Analyst' : 'System Admin'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary font-bold overflow-hidden border border-outline-variant">
                  {(user?.fullName || 'Alex Mercer')
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .substring(0, 2)}
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-lg transition-all"
                title="Sign Out"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-surface-bright relative">
          {children}
        </main>
      </div>
    </div>
  );
}
