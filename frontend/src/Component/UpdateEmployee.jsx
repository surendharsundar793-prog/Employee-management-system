import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit3, ArrowLeft, AlertCircle } from 'lucide-react';
import { updateEmployee } from './EmployeeService';

const UpdateEmployee = ({ employees, onRefresh, showToast }) => {
  const { empid } = useParams();
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
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (employees && employees.length > 0) {
      const match = employees.find(emp => emp.empid === Number(empid));
      if (match) {
        setEmployee({
          name: match.name || '',
          email: match.email || '',
          address: match.address || '',
          department: match.department || '',
          salary: match.salary !== undefined ? match.salary.toString() : '',
          gender: match.gender || ''
        });
        setLoading(false);
      } else {
        showToast(`Employee with ID #${empid} not found.`, 'error');
        navigate('/');
      }
    }
  }, [empid, employees, navigate, showToast]);

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
      showToast('Please fix the errors in the form.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await updateEmployee(Number(empid), {
        empid: Number(empid),
        ...employee,
        salary: Number(employee.salary)
      });
      showToast('Employee details updated successfully!', 'success');
      onRefresh();
      navigate('/');
    } catch (err) {
      console.error(err);
      showToast(err.response?.data?.message || 'Failed to update employee records.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="skeleton skeleton-circle" style={{ margin: '0 auto 16px' }}></div>
          <div className="skeleton" style={{ width: '120px', margin: '0 auto 8px' }}></div>
          <div className="skeleton" style={{ width: '200px', margin: '0 auto' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-fade-in form-container">
      <div style={{ marginBottom: '24px' }}>
        <Link to="/" className="btn btn-secondary" style={{ padding: '8px 16px', display: 'inline-flex', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
          <ArrowLeft size={16} />
          Back to List
        </Link>
        <h1>Update Employee Profile</h1>
        <p className="subtitle">Modify the records of #{empid} - {employee.name}</p>
      </div>

      <div className="card">
        <h2 className="card-title">
          <Edit3 size={20} className="text-accent" />
          Edit Details
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-input"
                id="name"
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
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update Details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;