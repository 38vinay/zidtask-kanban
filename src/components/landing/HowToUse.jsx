// src/components/landing/HowToUse.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const HowToUse = () => {
  const { darkMode } = useTheme();

  const steps = [
    {
      step: '1',
      title: 'Create Boards',
      desc: 'Create a board and set the workflow method • Setup according to your workflow and add team members',
      align: 'left'
    },
    {
      step: '2',
      title: 'Login',
      desc: 'Create a ZidTask and set some workflows • Login and go ahead you may enjoy workspace zone no adventure',
      align: 'right'
    },
    {
      step: '3',
      title: 'Create & View cards',
      desc: 'Once you started add cards so to there teams • Add cards with details so everyone in the progress all track with our real time',
      align: 'left'
    },
    {
      step: '4',
      title: 'Upload Progress',
      desc: 'Move cards between lists to reflect progress • Sync everything and manage multiple projects • Use them as you have already in one',
      align: 'right'
    }
  ];

  return (
    <section id="how-to-use" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '15px' }}>
            How To <span className="gradient-text">Use</span>
          </h2>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
            Get started in three simple steps • Begin now, track later, and update anytime
          </p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {steps.map((item, idx) => (
            <div key={idx} className="stagger-item" style={{
              position: 'relative',
              marginBottom: idx < 3 ? '60px' : '0',
              animationDelay: `${idx * 0.2}s`
            }}>
              <div className="row align-items-center">
                <div className={`col-md-6 ${item.align === 'right' ? 'order-md-2' : ''}`}>
                  <div className="hover-lift" style={{
                    background: darkMode 
                      ? 'rgba(30, 64, 175, 0.15)' 
                      : 'rgba(219, 234, 254, 0.4)',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '16px',
                    padding: '30px',
                    position: 'relative'
                  }}>
                    <div className="pulse" style={{
                      position: 'absolute',
                      top: '-15px',
                      left: '30px',
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      fontSize: '18px',
                      color: '#fff',
                      boxShadow: '0 4px 12px rgba(30, 64, 175, 0.4)'
                    }}>{item.step}</div>
                    <h5 style={{ 
                      fontSize: '20px', 
                      fontWeight: '600', 
                      marginBottom: '12px', 
                      marginTop: '10px',
                      color: darkMode ? '#fff' : '#1e40af'
                    }}>
                      {item.title}
                    </h5>
                    <p style={{ 
                      color: darkMode ? '#94a3b8' : '#64748b', 
                      fontSize: '14px', 
                      lineHeight: '1.6', 
                      margin: 0 
                    }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  {idx < 3 && (
                    <div style={{
                      height: '80px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                      <div className="glow" style={{
                        width: '2px',
                        height: '100%',
                        background: 'linear-gradient(180deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
                        position: 'relative'
                      }}>
                        <div className="pulse" style={{
                          position: 'absolute',
                          bottom: '-6px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '12px',
                          height: '12px',
                          background: '#3b82f6',
                          borderRadius: '50%',
                          boxShadow: '0 0 12px rgba(59, 130, 246, 0.6)'
                        }}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToUse;