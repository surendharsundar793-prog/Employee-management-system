import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, Sun, Moon, Database, RefreshCw, AlertCircle, X } from 'lucide-react';
import './App.css';
import { getEmployees } from './Component/EmployeeService';
import Dashboard from './Component/Dashboard';
import EmployeeList from './Component/EmployeeList';
import AddEmployee from './Component/AddEmployee';
import UpdateEmployee from './Component/UpdateEmployee';

function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEmployees();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the backend server. Please verify that the API server is running on http://localhost:8080.");
      showToast("Backend connection failed", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <aside className="sidebar">
          <div>
            <Link to="/" className="sidebar-logo">
              <Database size={24} />
              <span>EMS Portal</span>
            </Link>
            
            <nav className="sidebar-menu">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? "sidebar-item-link active" : "sidebar-item-link"}
                end
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink 
                to="/employees" 
                className={({ isActive }) => isActive ? "sidebar-item-link active" : "sidebar-item-link"}
              >
                <Users size={18} />
                <span>Employee Directory</span>
              </NavLink>

              <NavLink 
                to="/add" 
                className={({ isActive }) => isActive ? "sidebar-item-link active" : "sidebar-item-link"}
              >
                <UserPlus size={18} />
                <span>Add Employee</span>
              </NavLink>
            </nav>
          </div>

          <div className="sidebar-footer">
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>
              v1.0.0 • Connected to API
            </div>
          </div>
        </aside>

        <main className="main-content">
          {error ? (
            <div className="page-fade-in card" style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center', border: '1px solid var(--danger-glow)' }}>
              <AlertCircle size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
              <h2 style={{ marginBottom: '8px' }}>Server Connection Failure</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
                {error}
              </p>
              <button className="btn btn-primary" onClick={loadData}>
                <RefreshCw size={16} />
                Retry Connection
              </button>
            </div>
          ) : loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', padding: '40px 0' }}>
              <div className="skeleton" style={{ width: '40%', height: '36px' }}></div>
              <div className="skeleton" style={{ width: '60%', height: '20px' }}></div>
              <div className="stats-grid" style={{ marginTop: '20px' }}>
                <div className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
                <div className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
                <div className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
                <div className="skeleton" style={{ height: '120px', borderRadius: '12px' }}></div>
              </div>
              <div className="skeleton" style={{ width: '100%', height: '300px', borderRadius: '14px', marginTop: '20px' }}></div>
            </div>
          ) : (
            <Routes>
              <Route 
                path="/" 
                element={<Dashboard employees={employees} />} 
              />
              <Route 
                path="/employees" 
                element={
                  <EmployeeList 
                    employees={employees} 
                    onRefresh={loadData} 
                    showToast={showToast} 
                  />
                } 
              />
              <Route 
                path="/add" 
                element={
                  <AddEmployee 
                    onRefresh={loadData} 
                    showToast={showToast} 
                  />
                } 
              />
              <Route 
                path="/update/:empid" 
                element={
                  <UpdateEmployee 
                    employees={employees} 
                    onRefresh={loadData} 
                    showToast={showToast} 
                  />
                } 
              />
            </Routes>
          )}
        </main>

        <div className="toast-container">
          {toasts.map((t) => (
            <div key={t.id} className={`toast ${t.type}`}>
              <span>{t.message}</span>
              <button className="toast-close" onClick={() => removeToast(t.id)}>
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
