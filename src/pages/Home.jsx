import React, { useState, useEffect } from 'react';
import { Bot, Stethoscope, ShieldCheck, ArrowRight, Clock, MapPin, Phone, Star, Activity, Calendar, UserCheck, MessageSquare } from 'lucide-react';

export default function Home({ onNavigateToLogin }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch('https://your-n8n-domain.com/webhook/doctors');
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching clinic database roster:', err);
        // Fallback mock array matching required API structure to guarantee render
        setDoctors([
          { doctor_id: 'DOC-001', name: 'Dr. Ravi Sharma', department: 'Gastroenterology', time_slots: 'Mon 10AM, Mon 2PM, Wed 11AM', status: 'Active', rating: '4.9', fee: '₹800', languages: 'English, Hindi' },
          { doctor_id: 'DOC-002', name: 'Dr. Anjali Verma', department: 'Cardiology', time_slots: 'Mon 9AM, Wed 11AM, Fri 3PM', status: 'Active', rating: '5.0', fee: '₹1,000', languages: 'English, Punjabi' },
          { doctor_id: 'DOC-003', name: 'Dr. Rajesh Patel', department: 'Pediatrics', time_slots: 'Tue 10AM, Thu 4PM', status: 'Active', rating: '4.8', fee: '₹700', languages: 'English, Gujarati, Hindi' }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div 
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif' }}
      className="min-h-screen bg-white text-slate-100 antialiased select-none w-full"
    >
      {/* HEADER NAVBAR */}
      <header className="border-b border-slate-800/80 bg-[#090d1a]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
              <Stethoscope className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-2xl font-bold tracking-tight text-white block">City Hospital</span>
              <span className="text-[9px] uppercase tracking-widest text-teal-400 font-semibold block -mt-0.5">Medical & Care Center</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
              <a href="#booking-steps" className="hover:text-white transition-colors">How it works</a>
              <a href="#slots" className="hover:text-white transition-colors">Specialists</a>
              <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
            </nav>
            <button 
              onClick={onNavigateToLogin}
              className="border border-slate-700 hover:border-slate-500 text-white font-medium text-xs px-4 py-2 rounded-full transition-colors uppercase cursor-pointer tracking-wider bg-[#0b1329]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION - Maintained immersive dark theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] min-h-[calc(100vh-73px)] flex items-center px-6 border-b border-slate-800/60 py-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_40%,rgba(13,148,136,0.12),transparent_60%)]" />
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10 w-full">
          {/* Left Text Block */}
          <div className="space-y-6 max-w-2xl text-left md:w-1/2">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/20 rounded-full px-3 py-1 text-xs text-teal-400 font-medium">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> 24/7 Digital Intake Active
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Book Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                Appointment in Minutes
              </span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed">
              Skip traditional phone queues and tedious confirmation scripts. Instantly connect with City Hospital's digital assistant right through Telegram to query available clinical timings and claim your session instantly.
            </p>
            <div className="pt-2">
              <a 
                href="https://t.me/ApkaApnaBot" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-xl shadow-teal-500/10 active:scale-[0.99]"
              >
                Start Automated Booking <ArrowRight className="w-4 h-4 text-slate-950" />
              </a>
            </div>
          </div>

          {/* Right Visual Panel */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-full max-w-[440px] bg-[#05080f]/80 border border-slate-800 rounded-2xl p-6 shadow-2xl relative backdrop-blur-md">
              <div className="absolute -top-3 -right-3 w-20 h-20 bg-teal-500/10 rounded-full blur-xl" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">City Hospital Telegram Bot</h4>
                  <p className="text-xs text-teal-400/80 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"/> Online & Verified</p>
                </div>
              </div>

              {/* Pseudo Calendar Component mockup */}
              <div className="bg-[#090d1a] border border-slate-800/80 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 border-b border-slate-800 pb-2">
                  <span>Select Desired Slot</span>
                  <span className="text-teal-400 font-medium">May 2026</span>
                </div>
                <div className="grid grid-cols-5 gap-1.5 text-center text-xs pt-1">
                  <div className="p-2 rounded bg-slate-900 text-slate-500">Mon</div>
                  <div className="p-2 rounded bg-slate-900 text-slate-500">Tue</div>
                  <div className="p-2 rounded bg-teal-500/20 border border-teal-500/40 text-teal-400 font-bold">Wed</div>
                  <div className="p-2 rounded bg-slate-900 text-slate-500">Thu</div>
                  <div className="p-2 rounded bg-slate-900 text-slate-500">Fri</div>
                </div>
                <div className="bg-[#05080f] p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Selected: 11:00 AM Slot</span>
                  <span className="text-emerald-400 font-medium">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE BOOKING SETTINGS SECTION - White Background & Slate Text */}
      <section id="booking-steps" className="w-full bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Online Booking Setup</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Securing medical guidance through our automated n8n pipeline takes only three elementary structural actions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
                1
              </div>
              <h3 className="text-lg font-bold text-white">Initialize Bot Interaction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Launch our specific clinic assistant channel directly inside your Telegram interface by selecting the automated booking button.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
                2
              </div>
              <h3 className="text-lg font-bold text-white">Choose Department & Slot</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Review current clinic rosters sorted dynamically straight from our live availability directory.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800 rounded-2xl p-6 relative space-y-4 shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-bold text-lg">
                3
              </div>
              <h3 className="text-lg font-bold text-white">Instant Safe Confirmation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive your custom appointment confirmation code mapped instantly directly to our secure central system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DOCTORS ROSTER - White Background & Slate Text */}
      <section id="slots" className="w-full bg-white border-b border-slate-200 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Meet Our Specialists</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Direct real-time views from our clinic database tracking active specialist rosters.
            </p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {doctors.map((doc) => (
                <div key={doc.doctor_id} className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[420px]">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                        <Stethoscope className="w-5 h-5 text-teal-400" />
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-md font-semibold border border-teal-500/20 uppercase">
                          {doc.department}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{doc.rating || '4.9'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-white">{doc.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Ref: {doc.doctor_id}</p>
                    </div>

                    {/* Additional Clinical Details to enrich card content and balance height */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] py-2 border-t border-b border-slate-700/40">
                      <div>
                        <span className="text-slate-400 block">Est. Fee</span>
                        <span className="text-white font-medium">{doc.fee || '₹500'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Languages</span>
                        <span className="text-white font-medium truncate block" title={doc.languages || 'English'}>
                          {doc.languages || 'English'}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Active Hours:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {doc.time_slots.split(',').map((slot, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-950/60 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-md">
                            {slot.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6">
                    <a href="https://t.me/ApkaApnaBot" target="_blank" rel="noreferrer" className="w-full text-center block text-xs bg-[#05080f]/60 hover:bg-teal-500 border border-slate-800 text-slate-300 hover:text-slate-950 font-semibold py-2.5 rounded-xl transition-all">
                      Request This Slot
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS SECTION - White Background & Slate Text */}
      <section id="testimonials" className="w-full bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Patient Testimonials</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Read stories from individuals who experienced our streamlined healthcare intake pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800/60 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex text-teal-400 gap-0.5"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Booking via Telegram was unbelievably simple. I claimed an open afternoon consultation slot within seconds without waiting on hold."
              </p>
              <div className="text-xs font-bold text-white border-t border-slate-700/40 pt-3">— Ramesh K.</div>
            </div>

            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800/60 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex text-teal-400 gap-0.5"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The dynamic list of active hours helped me locate an available pediatrician immediately. Highly recommended interface design."
              </p>
              <div className="text-xs font-bold text-white border-t border-slate-700/40 pt-3">— Priya M.</div>
            </div>

            <div className="bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] border border-slate-800/60 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex text-teal-400 gap-0.5"><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/><Star className="w-4 h-4 fill-current"/></div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "No login complications or dense input forms. The automated n8n interaction works flawlessly in the background."
              </p>
              <div className="text-xs font-bold text-white border-t border-slate-700/40 pt-3">— David L.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION - Updated background to match primary hero gradient & added 10% height increase */}
      <footer 
        style={{ padding: '5.5rem 1.5rem' }} 
        className="border-t border-slate-800/80 bg-gradient-to-br from-[#090d1a] via-[#0b1329] to-[#042424] text-slate-500 text-xs"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 w-full">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-500" /> City Hospital, Main Healthcare Boulevard
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-500" /> Clinic Desk: +1 (555) 014-7290
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-500/50" />
            <span>Encrypted Patient Channels — © 2026 City Hospital Management</span>
          </div>
        </div>
      </footer>
    </div>
  );
}