import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Edit3,
  CheckCircle,
  XCircle,
  Clock,
  Stethoscope,
  ArrowLeft,
  LogOut,
  Save,
  X,
  Plus,
  AlertCircle
} from 'lucide-react';

// ===============================
// BASE URL
// ===============================
const BASE_URL = import.meta.env.VITE_API_URL;

export default function DoctorManagement({ onNavigateToDashboard, onLogout }) {
  const [doctors, setDoctors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

  // Form input fields
  const [currentDoctorId, setCurrentDoctorId] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Gastroenterology');
  const [timeSlots, setTimeSlots] = useState('');
  const [status, setStatus] = useState('Active');

  // ===============================
  // FETCH ALL DOCTORS API
  // ===============================
  const fetchDoctors = async () => {
    setIsLoading(true);
    try {
      // API CALL
      const res = await fetch(`${BASE_URL}/webhook/doctors`);
      const data = await res.json();

      // MAP API RESPONSE TO CURRENT UI STRUCTURE
      const formattedDoctors = Array.isArray(data)
        ? data.map((doc) => ({
            doctor_id: doc.doctor_id || doc['Doctor ID'],
            name: doc.doctor_name || doc['Doctor Name'],
            department: doc.department || doc['Department'],
            time_slots: doc.available_slots || doc['Available Slots'],
            status: doc.status || doc['Status']
          }))
        : [];

      setDoctors(formattedDoctors);
    } catch (err) {
      console.error('Error fetching clinical doctor roster:', err);

      // FALLBACK MOCK DATA
      setDoctors([
        {
          doctor_id: 'DOC-001',
          name: 'Dr. Ravi Sharma',
          department: 'Gastroenterology',
          time_slots: 'Mon 10AM, Mon 2PM, Wed 11AM',
          status: 'Active'
        },
        {
          doctor_id: 'DOC-002',
          name: 'Dr. Anjali Verma',
          department: 'Cardiology',
          time_slots: 'Mon 9AM, Wed 11AM, Fri 3PM',
          status: 'Active'
        },
        {
          doctor_id: 'DOC-003',
          name: 'Dr. Rajesh Patel',
          department: 'Pediatrics',
          time_slots: 'Tue 10AM, Thu 4PM',
          status: 'Active'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ===============================
  // INITIAL LOAD
  // ===============================
  useEffect(() => {
    fetchDoctors();
  }, []);

  // ===============================
  // OPEN ADD MODAL
  // ===============================
  const openAddModal = () => {
    setModalMode('add');
    setCurrentDoctorId('');
    setName('');
    setDepartment('Gastroenterology');
    setTimeSlots('');
    setStatus('Active');
    setIsModalOpen(true);
  };

  // ===============================
  // OPEN EDIT MODAL
  // ===============================
  const openEditModal = (doctor) => {
    setModalMode('edit');
    setCurrentDoctorId(doctor.doctor_id);
    setName(doctor.name);
    setDepartment(doctor.department);
    setTimeSlots(doctor.time_slots);
    setStatus(doctor.status);
    setIsModalOpen(true);
  };

  // ===============================
  // HANDLE FORM SUBMIT
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !timeSlots) {
      setNotification({
        message: 'Please fill out all operational fields.',
        type: 'error'
      });
      return;
    }

    setFormLoading(true);
    setNotification({ message: '', type: '' });

    const endpoint = modalMode === 'add' ? 'add' : 'update';

    const payload =
      modalMode === 'add'
        ? {
            name,
            specialization: department,
            time_slots: timeSlots,
            status
          }
        : {
            doctor_id: currentDoctorId,
            time_slots: timeSlots,
            status
          };

    try {
      const res = await fetch(
        `${BASE_URL}/webhook/doctors/${endpoint}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (res.ok) {
        setNotification({
          message: `Doctor ${
            modalMode === 'add' ? 'added' : 'updated'
          } successfully.`,
          type: 'success'
        });
        setIsModalOpen(false);
        // REFRESH LIVE DATA
        fetchDoctors();
      } else {
        setNotification({
          message: 'Submission could not be accepted by server.',
          type: 'error'
        });
      }
    } catch (err) {
      console.error('API communication failure:', err);

      // FALLBACK DEMO MODE
      if (modalMode === 'add') {
        const mockNewDoc = {
          doctor_id: `DOC-00${doctors.length + 1}`,
          name,
          department,
          time_slots: timeSlots,
          status
        };

        setDoctors(prev => [...prev, mockNewDoc]);
        setNotification({
          message: 'Demo Mode: Doctor created and saved locally.',
          type: 'success'
        });
      } else {
        setDoctors(prev =>
          prev.map(doc =>
            doc.doctor_id === currentDoctorId
              ? { ...doc, time_slots: timeSlots, status }
              : doc
          )
        );

        setNotification({
          message: 'Demo Mode: Doctor attributes successfully modified locally.',
          type: 'success'
        });
      }
      setIsModalOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Segoe UI", Roboto, sans-serif'
      }}
      className="min-h-screen bg-slate-50 text-slate-800 antialiased select-none w-full relative"
    >
      {/* HEADER SECTION (Color completely intact) */}
      <header className="border-b border-slate-800/80 bg-[#090d1a]/90 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-teal-500 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/20">
              <Stethoscope className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                City Hospital
              </span>
              <span className="text-[9px] uppercase tracking-widest text-teal-400 font-semibold block -mt-0.5">
                Specialist Matrix Management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onNavigateToDashboard}
              className="text-xs font-semibold text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 bg-slate-900/40 px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 " />
              Back to Appointments
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
        {/* ACTION HEADER BAR (Color completely intact) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-[#090d1a] to-[#0b1329] border border-slate-800/80 p-6 rounded-2xl shadow-xl">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Staff Roster Directory
            </h1>
            <p className="text-xs text-slate-400">
              Add medical profiles, track channel availability, and rewrite hours fields.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-xl shadow-teal-500/10 active:scale-[0.99] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            Add New Specialist
          </button>
        </div>

        {/* FEEDBACK POPUP */}
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

        {/* DOCTOR GRID */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-8 h-8 border-2 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            <p className="text-xs text-slate-500 font-medium">
              Querying specialist arrays...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doc) => (
              /* CARD INNER BACKGROUND AND BORDERS INTACT AS REQUESTED */
              <div
                key={doc.doctor_id}
                className="bg-gradient-to-br from-[#090d1a] to-[#05080f] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                      {doc.doctor_id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        doc.status === 'Active'
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/30'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {doc.status === 'Active' ? (
                        <CheckCircle className="w-2.5 h-2.5" />
                      ) : (
                        <XCircle className="w-2.5 h-2.5" />
                      )}
                      {doc.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-widest text-teal-400">
                      {doc.department}
                    </div>
                    <h3 className="text-base font-bold text-white">
                      {doc.name}
                    </h3>
                  </div>

                  {/* TIME SLOTS */}
                  <div className="space-y-2 bg-[#05080f]/60 p-3 rounded-xl border border-slate-900">
                    <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Clock className="w-3 h-3" />
                      Allocated Time Blocks:
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {doc.time_slots ? (
                        doc.time_slots.split(',').map((slot, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-[#090d1a] border border-slate-800 text-slate-300 px-2 py-0.5 rounded-md"
                          >
                            {slot.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-[11px] text-slate-600 italic">
                          No assigned hours logs.
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* EDIT BUTTON */}
                <div className="pt-4 mt-5 border-t border-slate-800/60">
                  <button
                    type="button"
                    onClick={() => openEditModal(doc)}
                    className="w-full bg-slate-900/80 hover:bg-teal-500 border border-slate-800 hover:border-teal-500 text-slate-300 hover:text-slate-950 text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit Profile & Slots
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ===============================
          DYNAMIC MODAL POPUP COMPONENT 
          (Adapted for clean Light Mode container)
         =============================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-teal-600" />
                <h2 className="text-sm font-bold tracking-tight text-slate-800 uppercase">
                  {modalMode === 'add' ? 'Register New Specialist' : 'Modify Specialist Allocation'}
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              {/* Doctor Name */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Specialist Practitioner Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={modalMode === 'edit'}
                  placeholder="e.g. Dr. Sarah Connor"
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all ${
                    modalMode === 'edit' 
                      ? 'border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed' 
                      : 'border-slate-200'
                  }`}
                />
              </div>

              {/* Department Option */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Medical Department Specialization
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={modalMode === 'edit'}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border bg-slate-50 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all cursor-pointer ${
                    modalMode === 'edit' 
                      ? 'border-slate-200 text-slate-400 bg-slate-100 cursor-not-allowed' 
                      : 'border-slate-200'
                  }`}
                >
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>

              {/* Allocated Time Blocks */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Allocated Time Blocks (Comma Separated)
                </label>
                <input
                  type="text"
                  value={timeSlots}
                  onChange={(e) => setTimeSlots(e.target.value)}
                  placeholder="e.g. Mon 10AM, Wed 2PM, Fri 4PM"
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                />
              </div>

              {/* Operational Status Toggle */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Matrix Roster Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 focus:outline-none focus:border-teal-500 focus:bg-white transition-all cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              {/* Form Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-4 py-2 border border-slate-200 hover:border-slate-300 bg-slate-50 rounded-xl transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="bg-teal-500 hover:bg-teal-600 disabled:bg-teal-200 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-md shadow-teal-500/10 cursor-pointer"
                >
                  {formLoading ? (
                    <div className="w-3.5 h-3.5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                  ) : (
                    <Save className="w-3.5 h-3.5" />
                  )}
                  {modalMode === 'add' ? 'Commit Entry' : 'Apply Changes'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}