import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DoctorManagement from './pages/DoctorManagement';

export default function App() {
  // Global View Router State Tracker: 'home' | 'login' | 'dashboard' | 'doctors'
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="w-full min-h-screen bg-[#060a13]">
      {/* PAGE 1: PUBLIC HOMEPAGE */}
      {currentPage === 'home' && (
        <Home onNavigateToLogin={() => setCurrentPage('login')} />
      )}
      
      {/* PAGE 2: SECURITY STAFF PORTAL */}
      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={() => setCurrentPage('dashboard')} 
          onNavigateToHome={() => setCurrentPage('home')} 
        />
      )}

      {/* PAGE 3: APPOINTMENTS CONTROL DASHBOARD */}
      {currentPage === 'dashboard' && (
        <Dashboard 
          onNavigateToDoctors={() => setCurrentPage('doctors')} 
          onLogout={() => setCurrentPage('home')}
        />
      )}

      {/* PAGE 4: ACTIVE DOCTORS MANAGEMENT */}
      {currentPage === 'doctors' && (
        <DoctorManagement 
          onNavigateToDashboard={() => setCurrentPage('dashboard')} 
          onLogout={() => setCurrentPage('home')}
        />
      )}
    </div>
  );
}