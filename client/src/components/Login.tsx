import React, { useState } from 'react';
import { Truck } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string, email: string) => void;
  onSwitchToSignup: () => void;
}

export default function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('dispatcher');
  const [hasError, setHasError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setHasError(true);
      return;
    }
    setHasError(false);
    onLogin(role, email);
  };

  return (
    <div className="flex h-screen w-full bg-background font-body-md text-on-surface overflow-hidden">
      {/* Left Branding Section */}
      <section className="hidden lg:flex flex-col justify-between w-[30%] bg-gradient-to-br from-[#141b2c] to-[#1a2542] p-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-sm mb-xl">
            <div className="w-10 h-10 bg-depot-amber rounded flex items-center justify-center">
              <Truck className="text-primary-container" size={24} />
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md text-on-tertiary tracking-tight">TransitOps</h1>
              <p className="font-label-sm text-label-sm text-on-primary-container uppercase tracking-widest">Smart Transport Operations</p>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="font-display-lg text-display-lg text-on-tertiary mb-md leading-tight">
              One login, four roles. <br />
              <span className="text-on-primary-container opacity-80">Full operational control.</span>
            </h2>
            <ul className="space-y-4 mt-lg">
              <li className="flex items-center gap-md group">
                <div className="w-5 h-5 rounded-full border-2 border-depot-amber flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-depot-amber rounded-full"></div>
                </div>
                <span className="font-body-lg text-body-lg text-on-tertiary opacity-90 group-hover:opacity-100 transition-opacity">Fleet Manager</span>
              </li>
              <li className="flex items-center gap-md group">
                <div className="w-5 h-5 rounded-full border-2 border-depot-amber flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-depot-amber rounded-full"></div>
                </div>
                <span className="font-body-lg text-body-lg text-on-tertiary opacity-90 group-hover:opacity-100 transition-opacity">Dispatcher</span>
              </li>
              <li className="flex items-center gap-md group">
                <div className="w-5 h-5 rounded-full border-2 border-depot-amber flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-depot-amber rounded-full"></div>
                </div>
                <span className="font-body-lg text-body-lg text-on-tertiary opacity-90 group-hover:opacity-100 transition-opacity">Safety Officer</span>
              </li>
              <li className="flex items-center gap-md group">
                <div className="w-5 h-5 rounded-full border-2 border-depot-amber flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-depot-amber rounded-full"></div>
                </div>
                <span className="font-body-lg text-body-lg text-on-tertiary opacity-90 group-hover:opacity-100 transition-opacity">Financial Analyst</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 border-t border-outline-variant/20 pt-lg">
          <p className="font-label-sm text-label-sm text-on-primary-container">
            © 2024 TransitOps. Secure Enterprise Gateway. <br />
            All system access is monitored and logged.
          </p>
        </div>
      </section>

      {/* Right Login Form Section */}
      <main className="flex-1 flex items-center justify-center p-md bg-surface-bright">
        <div className="w-full max-w-[420px] bg-white rounded-xl shadow-sm border border-outline-variant p-xl">
          <div className="mb-xl text-center lg:text-left">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Sign in to your account</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Enter your credentials to continue to the platform.</p>
          </div>
          <form className="space-y-lg" onSubmit={handleLogin}>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="email">EMAIL</label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@transitops.io"
                  className={`w-full px-md py-3 rounded-lg border ${hasError ? 'border-error text-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
                />
              </div>
            </div>

            <div className="space-y-xs">
              <div className="flex justify-between items-center">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="password">PASSWORD</label>
                <a href="#" className="font-label-sm text-label-sm text-secondary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-md py-3 rounded-lg border ${hasError ? 'border-error text-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
                />
              </div>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface" htmlFor="role">ROLE GROUP</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-md py-3 rounded-lg border border-outline-variant bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer transition-all"
              >
                <option value="dispatcher">Dispatcher</option>
                <option value="fleet_manager">Fleet Manager</option>
                <option value="safety_officer">Safety Officer</option>
                <option value="financial_analyst">Financial Analyst</option>
              </select>
            </div>

            {hasError && (
              <div className="flex items-start gap-sm p-md bg-error-container/50 border border-error rounded-lg">
                <div className="text-error mt-0.5">!</div>
                <div>
                  <p className="font-label-md text-label-md text-on-error-container">Invalid credentials</p>
                  <p className="font-label-sm text-label-sm text-on-error-container opacity-80">Please enter email and password.</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-sm">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer" />
              <label htmlFor="remember" className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none">Remember me</label>
            </div>

            <button
              type="submit"
              className="w-full bg-depot-amber text-primary-container font-button-md text-button-md py-3.5 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(232,163,61,0.3)] transition-all active:scale-[0.98] mt-base"
            >
              Sign In
            </button>
          </form>

          <p className="text-center mt-lg font-body-md text-body-md text-on-surface-variant">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-on-surface font-bold hover:underline cursor-pointer bg-transparent border-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
