import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Edit2, Trash2, ShieldAlert, ArrowLeft } from 'lucide-react';
import { deleteEmployee } from './EmployeeService';

const EmployeeList = ({ employees, onRefresh, showToast }) => {
  const [search, setSearch] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  
  const [showModal, setShowModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const departments = [...new Set(employees.map(emp => emp.department).filter(Boolean))];

  const filtered = employees
    .filter(emp => {
      const query = search.toLowerCase();
      const matchSearch = 
        emp.name?.toLowerCase().includes(query) ||
        emp.email?.toLowerCase().includes(query) ||
        emp.department?.toLowerCase().includes(query);
      
      const matchGender = !genderFilter || emp.gender?.toLowerCase() === genderFilter.toLowerCase();
      const matchDept = !deptFilter || emp.department === deptFilter;

      return matchSearch && matchGender && matchDept;
    });

  const handleDeleteClick = (employee) => {
    setSelectedEmp(employee);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedEmp) return;
    setDeleting(true);
    try {
      await deleteEmployee(selectedEmp.empid);
      showToast(`Employee ${selectedEmp.name} deleted successfully!`, 'success');
      onRefresh();
    } catch (err) {
      console.error(err);
      showToast("Failed to delete employee. Please try again.", 'error');
    } finally {
      setDeleting(false);
      setShowModal(false);
      setSelectedEmp(null);
    }
  };

  const getInitials = (name) => {
    if (!name) return 'EE';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getGradient = (id) => {
    const gradients = [
      'linear-gradient(135deg, #6366f1, #a855f7)',
      'linear-gradient(135deg, #ec4899, #f43f5e)',
      'linear-gradient(135deg, #3b82f6, #06b6d4)',
      'linear-gradient(135deg, #10b981, #3b82f6)',
      'linear-gradient(135deg, #f59e0b, #e11d48)'
    ];
    return gradients[id % gradients.length];
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val || 0);
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1>Employee Directory</h1>
          <p className="subtitle">Manage, edit, or filter your team members list</p>
        </div>
        <Link to="/" className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={18} />
          Back to List
        </Link>
      </div>

      <div className="controls-card">
        <div className="search-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, email or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filters-wrapper">
          <select
            className="filter-select"
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select
            className="filter-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-container">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={48} className="empty-state-icon" />
            <h3 className="empty-state-title">No employees found</h3>
            <p className="empty-state-desc">
              Try adjusting your search criteria, clearing the filters, or add a new employee record.
            </p>
            {(search || genderFilter || deptFilter) && (
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  setSearch('');
                  setGenderFilter('');
                  setDeptFilter('');
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee Details</th>
                <th>Address</th>
                <th>Department</th>
                <th>Gender</th>
                <th>Salary</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((employee) => (
                <tr key={employee.empid}>
                  <td style={{ fontWeight: '600', color: 'var(--text-muted)' }}>
                    #{employee.empid}
                  </td>
                  <td>
                    <div className="profile-cell">
                      <div className="avatar" style={{ background: getGradient(employee.empid) }}>
                        {getInitials(employee.name)}
                      </div>
                      <div className="employee-details">
                        <span className="employee-name">{employee.name}</span>
                        <span className="employee-email">{employee.email}</span>
                      </div>
                    </div>
                  </td>
                  <td>{employee.address || 'N/A'}</td>
                  <td>
                    <span className={`badge ${
                      employee.department?.toLowerCase() === 'manager' || employee.department?.toLowerCase() === 'development'
                        ? 'indigo'
                        : employee.department?.toLowerCase() === 'tester'
                        ? 'warning'
                        : 'cyan'
                    }`}>
                      {employee.department || 'Staff'}
                    </span>
                  </td>
                  <td>{employee.gender || 'Not Specified'}</td>
                  <td style={{ fontWeight: '600' }}>
                    {formatCurrency(employee.salary)}
                  </td>
                  <td>
                    <div className="actions-cell" style={{ justifyContent: 'flex-end' }}>
                      <Link 
                        to={`/update/${employee.empid}`} 
                        className="icon-btn edit"
                        title="Edit Employee"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button 
                        className="icon-btn delete" 
                        onClick={() => handleDeleteClick(employee)}
                        title="Delete Employee"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <ShieldAlert size={24} />
              <span>Confirm Delete</span>
            </div>
            <div className="modal-body">
              Are you sure you want to delete employee <strong>{selectedEmp?.name}</strong> (ID: #{selectedEmp?.empid})? This action is permanent and cannot be undone.
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-secondary" 
                onClick={() => { setShowModal(false); setSelectedEmp(null); }}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={confirmDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Employee'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;