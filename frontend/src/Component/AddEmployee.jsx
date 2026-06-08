import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { addEmployee } from './EmployeeService';

const AddEmployee = ({ onRefresh, showToast }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    department: '',
    salary: '',
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setEmployee({ ...employee, [id]: value });
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const validate = () => {
    const errs = {};
    if (!employee.name.trim()) errs.name = 'Name is required';
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!employee.email.trim()) {
      errs.email = 'Email is required';
    } else if (!emailPattern.test(employee.email)) {
      errs.email = 'Enter a valid email address';
    }

    if (!employee.address.trim()) errs.address = 'Address is required';
    if (!employee.department.trim()) errs.department = 'Department is required';
    
    if (!employee.salary) {
      errs.salary = 'Salary is required';
    } else if (Number(employee.salary) <= 0) {
      errs.salary = 'Salary must be a positive number';
    }

    if (!employee.gender) errs.gender = 'Gender is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Don't leave any fields empty.", 'error');
      return;
    }

    setLoading(true);
    try {
      await addEmployee({
        ...employee,
        salary: Number(employee.salary)
      });
      showToast('New employee added successfully!', 'success');
      onRefresh();
      navigate('/');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to save employee records.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in form-container">
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" className="btn btn-secondary" style={{ padding: '8px 16px', display: 'inline-flex', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
          <ArrowLeft size={16} />
          Back to List
        </Link>
        <h1>Add New Employee</h1>
        <p className="subtitle">Register a new employee record in the database system</p>
      </div>

      <div className="card">
        <h2 className="card-title">
          <UserPlus size={20} className="text-accent" />
          Employee Information
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-input"
                id="name"
                placeholder="e.g. John Doe"
                value={employee.name}
                onChange={handleChange}
                style={errors.name ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.name && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                type="email"
                className="form-input"
                id="email"
                placeholder="e.g. john.doe@company.com"
                value={employee.email}
                onChange={handleChange}
                style={errors.email ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.email && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="department">Department</label>
              <input
                type="text"
                className="form-input"
                id="department"
                placeholder="e.g. Engineering, Sales"
                value={employee.department}
                onChange={handleChange}
                style={errors.department ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.department && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.department}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="salary">Salary (INR)</label>
              <input
                type="number"
                className="form-input"
                id="salary"
                placeholder="e.g. 75000"
                value={employee.salary}
                onChange={handleChange}
                style={errors.salary ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.salary && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.salary}
                </span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="gender">Gender</label>
              <select
                className="form-select"
                id="gender"
                value={employee.gender}
                onChange={handleChange}
                style={errors.gender ? { borderColor: 'var(--danger)' } : {}}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.gender && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.gender}
                </span>
              )}
            </div>

            <div className="form-group full-width">
              <label className="form-label" htmlFor="address">Address</label>
              <input
                type="text"
                className="form-input"
                id="address"
                placeholder="e.g. 123 Main St, Bangalore"
                value={employee.address}
                onChange={handleChange}
                style={errors.address ? { borderColor: 'var(--danger)' } : {}}
              />
              {errors.address && (
                <span style={{ color: 'var(--danger)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <AlertCircle size={12} /> {errors.address}
                </span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;