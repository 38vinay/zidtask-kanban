// src/components/landing/Features.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus, Users, BarChart3 } from 'lucide-react';

const Features = () => {
  const { darkMode } = useTheme();

  const features = [
    { 
      icon: <Plus size={32} />, 
      title: 'Unlimited Lists', 
      desc: 'Create tasks, cards, and lists with unlimited flexibility—scale as you grow!' 
    },
    { 
      icon: <Users size={32} />, 
      title: 'Team Collaboration', 
      desc: 'Bring teams seamlessly together to work on the most mission-critical work' 
    },
    { 
      icon: <BarChart3 size={32} />, 
      title: 'Powerful Tracking', 
      desc: 'Track real-time progress with advanced analytics and powerful insights' 
    }
  ];

  return (
    <section id="features" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 className="gradient-text" style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '15px'
          }}>
            Powerful Features For<br />
            Seamless Collaboration
          </h2>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
            Work smarter together with tools that keep your teams connected
          </p>
        </div>

        <div className="row g-4">
          {features.map((feature, idx) => (
            <div key={idx} className={`col-md-4 stagger-item`}>
              <div className="hover-lift" style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)',
                border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.2)'}`,
                borderRadius: '16px',
                padding: '35px 25px',
                height: '100%',
                cursor: 'pointer'
              }}>
                <div className="glow" style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  color: '#3b82f6'
                }}>
                  {feature.icon}
                </div>
                <h5 style={{ 
                  fontSize: '20px', 
                  fontWeight: '600', 
                  marginBottom: '12px',
                  color: darkMode ? '#fff' : '#1e40af'
                }}>
                  {feature.title}
                </h5>
                <p style={{ 
                  color: darkMode ? '#94a3b8' : '#64748b', 
                  fontSize: '14px', 
                  lineHeight: '1.6', 
                  margin: 0 
                }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;