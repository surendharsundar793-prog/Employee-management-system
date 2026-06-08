import React from 'react';
import { Users, DollarSign, Award, Percent } from 'lucide-react';

const Dashboard = ({ employees }) => {
  const total = employees.length;

  const averageSalary = total > 0
    ? Math.round(employees.reduce((acc, curr) => acc + (Number(curr.salary) || 0), 0) / total)
    : 0;

  const deptCounts = {};
  employees.forEach(emp => {
    if (emp.department) {
      const dept = emp.department.trim();
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    }
  });

  const sortedDepts = Object.entries(deptCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  let maleCount = 0;
  let femaleCount = 0;
  employees.forEach(emp => {
    if (emp.gender) {
      const g = emp.gender.toLowerCase().trim();
      if (g === 'male') maleCount++;
      else if (g === 'female') femaleCount++;
    }
  });

  const malePercent = total > 0 ? Math.round((maleCount / total) * 100) : 50;
  const femalePercent = total > 0 ? Math.round((femaleCount / total) * 100) : 50;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="page-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1>Dashboard Overview</h1>
        <p className="subtitle">Real-time statistics and employee workforce analytics</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Total Employees</span>
            <span className="stat-value">{total}</span>
          </div>
          <div className="stat-icon indigo">
            <Users size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Avg. Annual Salary</span>
            <span className="stat-value">{formatCurrency(averageSalary)}</span>
          </div>
          <div className="stat-icon emerald">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Departments</span>
            <span className="stat-value">{Object.keys(deptCounts).length}</span>
          </div>
          <div className="stat-icon amber">
            <Award size={24} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-label">Gender Diversity</span>
            <span className="stat-value">
              {malePercent}% / {femalePercent}%
            </span>
          </div>
          <div className="stat-icon cyan">
            <Percent size={24} />
          </div>
        </div>
      </div>

      <div className="analytics-section">
        <div className="card">
          <h2 className="card-title">
            <Award size={20} className="text-accent" />
            Top Departments
          </h2>
          {sortedDepts.length === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <p>No department data available yet.</p>
            </div>
          ) : (
            <div className="dept-bar-container">
              {sortedDepts.map(([dept, count]) => {
                const percentage = total > 0 ? (count / total) * 100 : 0;
                return (
                  <div key={dept} className="dept-bar-item">
                    <div className="dept-info">
                      <span className="dept-name">{dept}</span>
                      <span className="dept-count">{count} {count === 1 ? 'employee' : 'employees'} ({Math.round(percentage)}%)</span>
                    </div>
                    <div className="progress-track">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: dept === 'Developer' || dept === 'development' ? 'var(--accent)' : 'var(--info)'
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h2 className="card-title">
            <Users size={20} className="text-accent" />
            Gender Distribution
          </h2>
          {total === 0 ? (
            <div className="empty-state" style={{ padding: '20px' }}>
              <p>No distribution data.</p>
            </div>
          ) : (
            <div className="gender-ring-wrapper">
              <div className="gender-split-bar">
                {maleCount > 0 && (
                  <div className="gender-split-male" style={{ width: `${malePercent}%` }}>
                    {malePercent}% M
                  </div>
                )}
                {femaleCount > 0 && (
                  <div className="gender-split-female" style={{ width: `${femalePercent}%` }}>
                    {femalePercent}% F
                  </div>
                )}
                {maleCount === 0 && femaleCount === 0 && (
                  <div style={{ width: '100%', backgroundColor: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' }}>
                    Not specified
                  </div>
                )}
              </div>
              <div className="gender-legend">
                <div className="legend-item">
                  <div className="legend-color male"></div>
                  <span>Male ({maleCount})</span>
                </div>
                <div className="legend-item">
                  <div className="legend-color female"></div>
                  <span>Female ({femaleCount})</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
