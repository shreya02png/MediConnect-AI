import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Trash2,
  User,
  Phone,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut
} from 'lucide-react';

export default function Dashboard({ onNavigateToDoctors, onLogout }) {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // FETCH APPOINTMENTS
  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('https://your-n8n-domain.com/webhook/appointments');
      const data = await res.json();
      setAppointments(data);
    } catch (err) {
      console.error('Error fetching clinical registry:', err);

      // FALLBACK MOCK DATA
      setAppointments([
        {
          appointment_id: 'APT-1778709907678',
          patient_name: 'Saloni',
          age: '25',
          phone: '9876543210',
          telegram_chat_id: '7113563905',
          doctor: 'Dr. Ravi Sharma',
          department: 'Gastroenterology',
          date: '22 May 2026',
          time: '10:00 AM',
          status: 'Confirmed',
          booked_on: '2026-05-14T10:05:00'
        },
        {
          appointment_id: 'APT-1778709907679',
          patient_name: 'Rahul Kumar',
          age: '32',
          phone: '9123456789',
          telegram_chat_id: '6224574811',
          doctor: 'Dr. Anjali Verma',
          department: 'Cardiology',
          date: '22 May 2026',
          time: '11:30 AM',
          status: 'Confirmed',
          booked_on: '2026-05-14T11:15:00'
        },
        {
          appointment_id: 'APT-1778709907680',
          patient_name: 'Amit Patel',
          age: '45',
          phone: '9811223344',
          telegram_chat_id: '8335685922',
          doctor: 'Dr. Rajesh Patel',
          department: 'Pediatrics',
          date: '23 May 2026',
          time: '04:00 PM',
          status: 'Cancelled',
          booked_on: '2026-05-15T09:00:00'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchAppointments();
  }, []);

  // DATE FILTER LOGIC
  const filteredAppointments = appointments.filter((apt) => {
    if (!selectedDate) return true;

    const selected = new Date(selectedDate);
    const formattedSelectedDate = selected.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const cleanSelectedDate = formattedSelectedDate.replace(',', '').trim();
    const cleanAppointmentDate = apt.date.replace(',', '').trim();

    return cleanAppointmentDate === cleanSelectedDate;
  });

  // HANDLE DATE CHANGE
  const handleDateChange = (e) => {
    const rawValue = e.target.value;
    setSelectedDate(rawValue);
  };

  // CANCEL APPOINTMENT
  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm(`Are you sure you want to cancel appointment ${appointmentId}?`)) return;

    setActionLoading(appointmentId);
    setNotification({ message: '', type: '' });

    try {
      const res = await fetch(
        'https://your-n8n-domain.com/webhook/appointments/cancel',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ appointment_id: appointmentId })
        }
      );

      const data = await res.json();

      if (data.success || res.ok) {
        setNotification({
          message: 'Appointment cancelled successfully.',
          type: 'success'
        });

        setAppointments(prev =>
          prev.map(apt =>
            apt.appointment_id === appointmentId
              ? { ...apt, status: 'Cancelled' }
              : apt
          )
        );
      } else {
        setNotification({
          message: 'Failed to process cancel request.',
          type: 'error'
        });
      }
    } catch (err) {
      console.error('Cancel API connection failure:', err);

      setNotification({
        message: 'Demo Mode: Appointment status successfully overwritten to Cancelled.',
        type: 'success'
      });

      setAppointments(prev =>
        prev.map(apt =>
          apt.appointment_id === appointmentId
            ? { ...apt, status: 'Cancelled' }
            : apt
        )
      );
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif'
      }}
      className="min-h-screen bg-slate-50 text-slate-800 antialiased select-none w-full"
    >
      {/* HEADER (Color completely intact) */}
      <header className="border-b border-slate-800/80 bg-[#090d1a]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
              <Calendar className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                City Hospital
              </span>
              <span className="text-[9px] uppercase tracking-widest text-teal-400 font-semibold block cursor-pointer -mt-0.5">
                Admin Management Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToDoctors}
              className="text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Manage Doctors
            </button>
            <button
              onClick={onLogout}
              className="w-9 h-9 border border-slate-800 hover:border-rose-900/60 bg-slate-900/50 hover:bg-rose-950/20 text-slate-400 hover:text-rose-400 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              title="Sign Out System"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* TOP CONTROL BAR (Color completely intact) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-gradient-to-r from-[#090d1a] to-[#0b1329] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Central Operations Roster
            </h1>
            <p className="text-xs text-slate-400">
              View real-time arrivals, sort patient lists, or coordinate scheduling voids.
            </p>
          </div>

          {/* DATE FILTER CONTAINER */}
          <div className="flex items-center gap-2.5 bg-[#05080f] border border-slate-800 rounded-xl px-3.5 py-2 w-full md:w-auto relative">
            <label htmlFor="datePicker" className="cursor-pointer flex items-center">
              <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
            </label>
            <input
              id="datePicker"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="bg-transparent text-xs text-white outline-none font-medium cursor-pointer w-full md:w-auto"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-[10px] uppercase tracking-wider text-slate-500 hover:text-white pl-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* NOTIFICATION FEEDBACK */}
        {notification.message && (
          <div
            className={`border rounded-xl p-4 flex items-center gap-3 text-xs ${
              notification.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-rose-50 border-rose-200 text-rose-700'
            }`}
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="font-medium">{notification.message}</span>
          </div>
        )}

        {/* LOADING INDICATOR */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">
              Syncing database arrays...
            </p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          /* EMPTY FALLBACK CONTAINER */
          <div className="text-center py-20 border border-dashed border-slate-300 rounded-2xl space-y-2 bg-white shadow-sm">
            <FileText className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-500">
              No appointments recorded
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              There are no diagnostic records matching the selected date.
            </p>
          </div>
        ) : (
          /* APPOINTMENT TILES MATRIX */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAppointments.map((apt) => (
              /* CARD THEME MATCHED TO PROVIDED REFERENCE IMAGE BACKGROUNDS AND BORDERS */
              <div
                key={apt.appointment_id}
                className={`bg-[#070b13] border border-slate-900 rounded-2xl p-5 flex flex-col justify-between shadow-[0_15px_30px_-5px_rgba(3,5,10,0.8)] transition-all relative group overflow-hidden ${
                  apt.status === 'Cancelled' ? 'opacity-40' : ''
                }`}
              >
                <div className="space-y-4">
                  
                  {/* TOP BADGES LAYER */}
                  <div className="flex items-center justify-between">
                    {/* Unique Medical Stethoscope Badge Circle Concept */}
                    <div className="w-8 h-8 rounded-xl bg-[#0b1424] border border-[#14233a] flex items-center justify-center">
                      <User className="w-4 h-4 text-teal-400" />
                    </div>

                    {/* Department Tag from image style */}
                    <span className="text-[10px] bg-[#0b1d28] border border-[#0d2a35] font-bold uppercase tracking-wide text-teal-400 px-2.5 py-1 rounded-lg">
                      {apt.department}
                    </span>
                  </div>

                  {/* IDENTIFIER AND STATUS */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-mono text-slate-400 tracking-wider">
                      Ref: {apt.appointment_id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-bold ${
                        apt.status === 'Cancelled'
                          ? 'bg-rose-950/30 text-rose-400 border border-rose-900/30'
                          : 'bg-emerald-950/30 text-emerald-400 border border-emerald-900/30'
                      }`}
                    >
                      {apt.status === 'Cancelled' ? (
                        <XCircle className="w-2.5 h-2.5" />
                      ) : (
                        <CheckCircle className="w-2.5 h-2.5" />
                      )}
                      {apt.status}
                    </span>
                  </div>

                  {/* PATIENT PROFILE INHERITED LAYOUT */}
                  <div>
                    <h2 className="text-lg font-bold text-white tracking-tight">
                      {apt.patient_name}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Age: {apt.age}</p>
                  </div>

                  {/* INFO FIELDS OVER CROSS LINE */}
                  <div className="border-t border-slate-800/50 pt-3 grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Phone</span>
                      <span className="text-slate-200 font-medium flex items-center gap-1 mt-0.5">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" /> {apt.phone}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Telegram ID</span>
                      <span className="text-slate-200 font-medium truncate block mt-0.5">
                        {apt.telegram_chat_id}
                      </span>
                    </div>
                  </div>

                  {/* ASSIGNED DOCTOR STRIP */}
                  <div className="bg-[#05080f] border border-slate-900 p-3 rounded-xl space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">Assigned Doctor</span>
                    <span className="text-xs font-semibold text-teal-400 block">{apt.doctor}</span>
                  </div>

                  {/* DATE + TIME SECTION */}
                  <div className="flex items-center gap-2 border-t border-slate-800/50 pt-3">
                    <span className="text-xs font-medium text-slate-300 bg-[#05080f] border border-slate-900 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      {apt.date}
                    </span>
                    <span className="text-xs font-medium text-slate-300 bg-[#05080f] border border-slate-900 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                      {apt.time}
                    </span>
                  </div>

                </div>

                {/* CANCEL TRIGGER AT BOTTOM */}
                {apt.status !== 'Cancelled' && (
                  <div className="pt-4 mt-4 border-t border-slate-800/50">
                    <button
                      type="button"
                      disabled={actionLoading === apt.appointment_id}
                      onClick={() => handleCancelAppointment(apt.appointment_id)}
                      className="w-full bg-[#05080f] hover:bg-rose-950/20 border border-slate-900 hover:border-rose-900/50 text-slate-300 hover:text-rose-400 text-xs font-semibold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {actionLoading === apt.appointment_id ? (
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-3.5 h-3.5" />
                          Cancel Appointment
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}