import React, { useState } from 'react';
import { Bot, Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, CalendarCheck, Stethoscope, MessageSquare } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Structural validation check
    if (!name || !email || !password) {
      setError('Please fill in all registration fields.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate network request processing
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Specific credential evaluation vector
      if (name.trim() === 'Soumya' && email.trim() === 'Soumya@gmail.com' && password === '1234') {
        if (typeof onLoginSuccess === 'function') {
          onLoginSuccess();
        }
      } else {
        setError('Access denied. Invalid credentials filled.');
      }
    } catch (err) {
      setError('Portal communication failure. Please retry.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
      className="min-h-screen bg-[#060a13] flex flex-col md:flex-row antialiased select-none text-slate-100"
    >
      
      {/* LEFT SIDE: Brand Identity & AI Healthcare Metrics Panel */}
      <div className="md:w-1/2 bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border-b md:border-b-0 border-slate-800 shrink-0">
        
        {/* Subtle Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(13,148,136,0.08),transparent_50%)]" />
        
        {/* Top Branding Header */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
            <Bot className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <span className="text-6xl font-bold tracking-tight text-white block">MediBotAI</span>
            <span className="text-[10px] uppercase tracking-widest text-teal-400 font-semibold block -mt-1">Clinical Management</span>
          </div>
        </div>

        {/* Primary Healthcare Context Value Statements */}
        <div className="space-y-4 max-w-md my-auto pt-12 pb-29 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
             Efficient Management.<br />
            Effortless Appointments.<br />
            

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
               Patient Care Simplified.
            </span>
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Monitor real-time patient interactions from the Telegram scheduling assistant. Manage doctor schedules, update dynamic appointment availability, and track daily clinical bookings effortlessly.
          </p>

          {/* Core System Architecture Real-time Status Grid */}
          <div className="grid grid-cols-3 gap-3 pt-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
              <MessageSquare className="w-4 h-4 text-teal-400 mb-1" />
              <span className="text-xs text-slate-400 block">Telegram Bot</span>
              <span className="text-sm font-semibold text-white">Active Agent</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
              <Stethoscope className="w-4 h-4 text-emerald-400 mb-1" />
              <span className="text-xs text-slate-400 block">Availability check</span>
              <span className="text-sm font-semibold text-white">Slot Available</span>
            </div>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 backdrop-blur-sm">
              <CalendarCheck className="w-4 h-4 text-cyan-400 mb-1" />
              <span className="text-xs text-slate-400 block">Appointments</span>
              <span className="text-sm font-semibold text-white">Secure</span>
            </div>
          </div>
        </div>

        {/* Dynamic Compliance Seal Footprint */}
        <div className="flex items-center gap-2 text-xs text-slate-500 relative z-10">
          <ShieldCheck className="w-4 h-4 text-teal-500/70" />
          <span>Patient Data Privacy & Encryption Pipeline Verified</span>
        </div>
      </div>

      {/* RIGHT SIDE: Background color changed to solid White */}
      <div className="md:w-1/2 bg-white flex flex-col justify-center items-center px-4 py-12 md:p-12 border-t md:border-t-0 md:border-l border-slate-200 relative z-10">
        
        {/* LOGIN CARD CONTAINER: Restored original dark gradient identity styling intact */}
        <div className="w-full max-w-[440px] bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-2xl shadow-[#03050a]/60">
          
          {/* Top Utilities Link */}
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">Don't have an account?</span>
            <button type="button" className="border border-slate-700 hover:border-slate-500 text-white font-medium px-4 py-1.5 cursor-pointer rounded-full transition-colors">
              SIGN UP
            </button>
          </div>

          {/* Header Copy Framework */}
          <div className="space-y-1.5">
            <h3 className="text-3xl font-bold tracking-tight text-white">Welcome to MediBot !</h3>
            <p className="text-sm text-slate-400">Register your account</p>
          </div>

          {/* UI System Notification Block */}
          {error && (
            <div className="bg-rose-950/40 border border-rose-900 text-rose-300 text-xs rounded-xl p-3.5 font-medium flex items-start gap-2.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Interactive Core Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-0.5">Name</label>
              <div className="relative shadow-sm">
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#05080f] border border-slate-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all text-white disabled:opacity-50 placeholder-slate-600" 
                  placeholder="Enter your full name" 
                />
              </div>
            </div>

            {/* Email Input Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-0.5">Email</label>
              <div className="relative shadow-sm">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#05080f] border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all text-white disabled:opacity-50 placeholder-slate-600" 
                  placeholder="abc@gmail.com" 
                />
                <Mail className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-400 ml-0.5">Password</label>
              <div className="relative shadow-sm">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="w-full bg-[#05080f] border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 transition-all text-white tracking-wide disabled:opacity-50 placeholder-slate-600" 
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-slate-600 absolute left-3.5 top-3.5" />
                
                {/* Visibility Eye Switch Component */}
                <button
                  type="button"
                  tabIndex="-1"
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-600 hover:text-slate-400 transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Form Execution Pipeline Trigger */}
            <div className="pt-2">
              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/50 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-teal-500/10 active:scale-[0.995]"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                ) : (
                  <>
                    Login <ArrowRight className="w-4 h-4 text-slate-950" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Social Authentication Row */}
          <div className="pt-2 text-center space-y-3">
            <span className="text-xs text-slate-400 block">Create account with</span>
            <div className="flex justify-center items-center gap-4">
              <button className=" cursor-pointer w-10 h-10 rounded-full bg-white text-blue-600 font-bold flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">f</button>
              <button className="w-10 h-10 cursor-pointer rounded-full bg-white text-blue-500 font-bold flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">in</button>
              <button className="w-10 h-10 cursor-pointer rounded-full bg-white text-red-500 font-bold flex items-center justify-center shadow-sm hover:opacity-90 transition-opacity">G</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}