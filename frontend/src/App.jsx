import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/dashboard';
import Preloader from './components/Preloader';
import EditorPage from './components/EditorPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboard from './components/admin_area/AdminDashboard';

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  //fetching dashboard data
  const fetchDashboardData = async () => {
    try {
      const res = await fetch('http://localhost:8000/dashboard-data', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setDashboardData(data);
        console.log(data);
      }
    } catch (err) {
      console.log('Failed to fetch dashboard data:', err);
    }
  };


  const handleLogout = () => {
    setIsLoggedIn(false);
    setDashboardData(null);
  };

  useEffect(() => {
    const checkSession = async () => {
      const startTime = Date.now();
      try {
        const res = await fetch('http://localhost:8000/check-session', { credentials: 'include' });
        if (res.ok) {
          setIsLoggedIn(true);
          await fetchDashboardData();
        }
      } catch (err) {
        console.log('Session check failed:', err);
      } finally {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(3000 - elapsed, 0);
        setTimeout(() => setLoading(false), remaining);
      }
    };
    checkSession();
  }, []);

  const handleLoginSuccess = async () => {
    setIsLoggedIn(true);
    await fetchDashboardData();
  };

  if (loading) return <Preloader />;

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Dashboard onLogout={handleLogout} dashboardData={dashboardData} onRefresh={fetchDashboardData} />
      )}
      <ToastContainer position="bottom-right" autoClose={3000} theme="colored" />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;