// src/components/landing/Testimonials.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Testimonials = () => {
  const { darkMode } = useTheme();

  const testimonials = [
    {
      role: 'Admins',
      icon: '⚙️',
      color: '#ff9500',
      features: ['Customize workflows', 'Manage team permissions', 'Monitor overall progress']
    },
    {
      role: 'Managers',
      icon: '👔',
      color: '#a855f7',
      features: ['Assign and prioritize tasks', 'Track team performance', 'Set deadlines']
    },
    {
      role: 'Employees',
      icon: '💼',
      color: '#10b981',
      features: ['View assigned tasks', 'Update task status', 'Collaborate with team']
    }
  ];

  return (
    <section style={{ 
      padding: '80px 0', 
      background: darkMode ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)' 
    }}>
      <div className="container">
        <div className="text-center mb-5">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '15px' }}>
            Features For <span style={{ color: '#e74c8c' }}>Roles</span>
          </h2>
        </div>

        <div className="row g-4 justify-content-center">
          {testimonials.map((role, idx) => (
            <div key={idx} className="col-lg-4 col-md-6">
              <div style={{
                background: darkMode ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '20px',
                padding: '35px 25px',
                height: '100%'
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>
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
                    <li key={fIdx} style={{
                      color: '#999',
                      fontSize: '14px',
                      marginBottom: '12px',
                      paddingLeft: '24px',
                      position: 'relative'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: role.color,
                        fontWeight: 'bold'
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