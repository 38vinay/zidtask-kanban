// src/components/landing/Testimonials.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Testimonials = () => {
  const { darkMode } = useTheme();

  const testimonials = [
    {
      role: 'Admins',
      icon: '⚙️',
      color: '#1e40af',
      features: ['Customize workflows', 'Manage team permissions', 'Monitor overall progress', 'Generate detailed reports']
    },
    {
      role: 'Managers',
      icon: '👔',
      color: '#3b82f6',
      features: ['Assign and prioritize tasks', 'Track team performance', 'Set deadlines & milestones', 'Review task progress']
    },
    {
      role: 'Employees',
      icon: '💼',
      color: '#60a5fa',
      features: ['View assigned tasks', 'Update task status', 'Collaborate with team', 'Track personal progress']
    }
  ];

  return (
    <section id="roles" style={{ 
      padding: '80px 0', 
      background: darkMode ? 'rgba(30, 64, 175, 0.05)' : 'rgba(219, 234, 254, 0.2)' 
    }}>
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '15px' }}>
            Features For <span className="gradient-text">Roles</span>
          </h2>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
            Tailored elements for admins and managers to drive teams while<br />
            empowering employees with seamless task management
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonials.map((role, idx) => (
            <div key={idx} className={`col-lg-4 col-md-6 stagger-item`} style={{
              animationDelay: `${idx * 0.2}s`
            }}>
              <div className="hover-lift" style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.15)' 
                  : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                borderRadius: '20px',
                padding: '35px 25px',
                height: '100%',
                transform: idx === 1 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: idx === 1 ? '0 12px 30px rgba(59, 130, 246, 0.3)' : 'none'
              }}>
                <div className="pulse" style={{ 
                  fontSize: '48px', 
                  marginBottom: '20px', 
                  textAlign: 'center',
                  filter: 'drop-shadow(0 4px 8px rgba(30, 64, 175, 0.3))'
                }}>
                  {role.icon}
                </div>
                <h4 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '20px',
                  textAlign: 'center',
                  color: role.color
                }}>{role.role}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {role.features.map((feature, fIdx) => (
                    <li key={fIdx} className="fade-in" style={{
                      color: darkMode ? '#94a3b8' : '#64748b',
                      fontSize: '14px',
                      marginBottom: '12px',
                      paddingLeft: '24px',
                      position: 'relative',
                      animationDelay: `${(idx * 0.2) + (fIdx * 0.1)}s`
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: role.color,
                        fontWeight: 'bold',
                        fontSize: '16px'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;