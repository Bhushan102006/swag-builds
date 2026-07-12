import React, { useState } from 'react';
import { Eye, EyeOff, ChevronDown, ArrowRight, Shield, Lock, BarChart3, LayoutGrid } from 'lucide-react';

interface SignupProps {
  onSignup: (role: string, email: string, fullName: string) => void;
  onSwitchToLogin: () => void;
}

export default function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !role || !agreedToTerms) {
      setHasError(true);
      return;
    }
    setHasError(false);
    onSignup(role, email, fullName);
  };

  return (
    <div className="flex h-screen w-full bg-background font-body-md text-on-surface overflow-hidden">
      {/* Left Branding Section */}
      <section className="hidden lg:flex flex-col justify-between w-[30%] bg-gradient-to-br from-[#111827] to-[#1f2937] p-xl relative overflow-hidden border-r border-[#1f2937]">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-sm mb-xl">
            <LayoutGrid className="text-white" size={24} />
            <h1 className="font-headline-md text-headline-sm text-white font-bold tracking-tight">TransitOps</h1>
          </div>
          <div className="mt-20">
            <h2 className="font-display-lg text-4xl text-white mb-md leading-tight tracking-tight font-extrabold">
              TransitOps
            </h2>
            <p className="font-body-lg text-body-lg text-slate-300 mt-sm max-w-[340px] leading-relaxed">
              Empower your logistics ecosystem with industrial-grade precision and real-time operational intelligence.
            </p>
            <ul className="space-y-6 mt-xl">
              <li className="flex items-start gap-md group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="text-blue-400" size={18} />
                </div>
                <div>
                  <span className="font-label-md text-body-lg text-white font-semibold block">Full operational control</span>
                  <span className="font-label-sm text-body-md text-slate-400 block mt-1 leading-relaxed">Unified command center for every vehicle and route in your fleet.</span>
                </div>
              </li>
              <li className="flex items-start gap-md group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Lock className="text-blue-400" size={18} />
                </div>
                <div>
                  <span className="font-label-md text-body-lg text-white font-semibold block">Secure role-based access</span>
                  <span className="font-label-sm text-body-md text-slate-400 block mt-1 leading-relaxed">Granular permissions tailored to your organization's hierarchy.</span>
                </div>
              </li>
              <li className="flex items-start gap-md group">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <BarChart3 className="text-blue-400" size={18} />
                </div>
                <div>
                  <span className="font-label-md text-body-lg text-white font-semibold block">Real-time fleet tracking</span>
                  <span className="font-label-sm text-body-md text-slate-400 block mt-1 leading-relaxed">High-fidelity telemetry data streamed directly to your dashboard.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 border-t border-slate-800 pt-lg">
          <p className="font-label-sm text-label-sm text-slate-400">
            © 2024 TransitOps Fleet Systems. Built for industrial reliability.
          </p>
        </div>
      </section>

      {/* Right Signup Form Section */}
      <main className="flex-1 flex items-center justify-center p-md bg-surface-bright overflow-y-auto">
        <div className="w-full max-w-[460px] py-xl">
          <div className="mb-lg text-center lg:text-left">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-xs">Create your account</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Enter your details to get started with the platform.</p>
          </div>
          <form className="space-y-lg" onSubmit={handleSignup}>
            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="fullname">FULL NAME</label>
              <input
                type="text"
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className={`w-full px-md py-3 rounded-lg border ${hasError && !fullName ? 'border-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="signup-email">EMAIL</label>
              <input
                type="email"
                id="signup-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@transitops.io"
                className={`w-full px-md py-3 rounded-lg border ${hasError && !email ? 'border-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all`}
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="phone">PHONE NUMBER (OPTIONAL)</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 "
                className="w-full px-md py-3 rounded-lg border border-outline-variant bg-surface-container-low font-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all"
              />
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="signup-password">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full px-md py-3 rounded-lg border ${hasError && !password ? 'border-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="space-y-xs">
              <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider" htmlFor="signup-role">SELECT ROLE</label>
              <div className="relative">
                <select
                  id="signup-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className={`w-full px-md py-3 rounded-lg border ${hasError && !role ? 'border-error' : 'border-outline-variant'} bg-surface-container-low font-body-md text-on-surface focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 appearance-none cursor-pointer transition-all`}
                >
                  <option value="" disabled>Select your operational role</option>
                  <option value="dispatcher">Dispatcher</option>
                  <option value="fleet_manager">Fleet Manager</option>
                  <option value="safety_officer">Safety Officer</option>
                  <option value="financial_analyst">Financial Analyst</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none" size={20} />
              </div>
            </div>

            <div className="flex items-start gap-sm">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-outline-variant text-secondary focus:ring-secondary cursor-pointer mt-0.5"
              />
              <label htmlFor="terms" className="font-body-md text-body-md text-on-surface-variant cursor-pointer select-none leading-tight">
                I agree to the <a href="#" className="text-secondary hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-secondary hover:underline font-medium">Privacy Policy</a>.
              </label>
            </div>

            {hasError && (
              <div className="flex items-start gap-sm p-md bg-error-container/50 border border-error rounded-lg">
                <div className="text-error mt-0.5">!</div>
                <div>
                  <p className="font-label-md text-label-md text-on-error-container">Missing required fields</p>
                  <p className="font-label-sm text-label-sm text-on-error-container opacity-80">Please fill in all required fields and agree to the terms.</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-depot-amber text-primary-container font-button-md text-button-md py-3.5 rounded-lg font-bold hover:shadow-[0_0_15px_rgba(232,163,61,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-sm"
            >
              Sign Up <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center mt-lg font-body-md text-body-md text-on-surface-variant">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-on-surface font-bold hover:underline cursor-pointer bg-transparent border-none"
            >
              Sign In
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}
