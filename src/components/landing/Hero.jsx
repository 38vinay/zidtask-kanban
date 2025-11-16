// src/components/landing/Hero.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  return (
    <section style={{
      padding: '140px 0 60px',
      background: darkMode 
        ? 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.15) 0%, transparent 50%)'
        : 'radial-gradient(ellipse at top, rgba(231, 76, 140, 0.1) 0%, transparent 50%)',
      position: 'relative',
      minHeight: '90vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container text-center">
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '700',
          lineHeight: '1.2',
          marginBottom: '20px',
          background: darkMode 
            ? 'linear-gradient(135deg, #fff 0%, #e74c8c 100%)'
            : 'linear-gradient(135deg, #000 0%, #b794a3ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Simplify Work.<br />
          Empower Teams.<br />
          Track Tasks <span style={{ color: '#2d2baaff' }}>Smarter.</span>
        </h1>
        
        <p style={{
          fontSize: '16px',
          color: darkMode ? '#999' : '#666',
          marginBottom: '35px',
          maxWidth: '600px',
          margin: '0 auto 35px'
        }}>
          Streamline your workflow with powerful kanban boards, real-time<br />
          collaboration, and intuitive task tracking—all in one place!
        </p>
        
        <button 
          onClick={() => navigate('/register')}
          style={{
            background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
            border: 'none',
            color: '#fff',
            padding: '14px 40px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(231, 76, 140, 0.3)',
            transition: 'transform 0.3s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Get Started
        </button>

        {/* Kanban Board Preview */}
        <div style={{
          marginTop: '60px',
          position: 'relative',
          maxWidth: '900px',
          margin: '60px auto 0'
        }}>
          <div style={{
            background: darkMode 
              ? 'linear-gradient(135deg, rgba(30, 30, 30, 0.8) 0%, rgba(20, 20, 20, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(250, 250, 250, 0.9) 0%, rgba(240, 240, 240, 0.95) 100%)',
            borderRadius: '20px',
            padding: '20px',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            backdropFilter: 'blur(10px)',
            boxShadow: darkMode 
              ? '0 20px 60px rgba(0, 0, 0, 0.5)'
              : '0 20px 60px rgba(0, 0, 0, 0.1)'
          }}>
            {/* Browser Dots */}
            <div className="d-flex gap-2 mb-3">
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }}></div>
            </div>

            <div className="row g-3">
              {['To Do List', 'In Progress List', 'In Review List', 'Done Done List'].map((col, idx) => (
                <div key={idx} className="col-md-3 col-6">
                  <div style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                    borderRadius: '12px',
                    padding: '15px',
                    border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                  }}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 style={{ fontSize: '12px', margin: 0, fontWeight: '600' }}>{col}</h6>
                      <span style={{
                        background: 'rgba(231, 76, 140, 0.2)',
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '10px',
                        color: '#e74c8c'
                      }}>{idx + 2}</span>
                    </div>
                    
                    {[1, 2].map((card) => (
                      <div key={card} style={{
                        background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                        borderRadius: '8px',
                        padding: '12px',
                        marginBottom: '10px',
                        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
                        boxShadow: darkMode ? 'none' : '0 2px 4px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ fontSize: '11px', marginBottom: '8px', fontWeight: '500' }}>
                          Task Title {card}
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex">
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                              fontSize: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '-5px',
                              border: `2px solid ${darkMode ? '#1a1a1a' : '#f5f5f5'}`
                            }}>👤</div>
                            <div style={{
                              width: '20px',
                              height: '20px',
                              borderRadius: '50%',
                              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)',
                              fontSize: '10px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: '-5px',
                              border: `2px solid ${darkMode ? '#1a1a1a' : '#f5f5f5'}`
                            }}>👤</div>
                          </div>
                          <span style={{ fontSize: '10px', color: '#666' }}>📎 2</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Cards */}
            <div className="row g-3 mt-2">
              <div className="col-md-6">
                <div style={{
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
                }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px' }}>Team Progress</div>
                  <div style={{
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    height: '8px',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      background: 'linear-gradient(90deg, #244f65ff 0%, #120f14ff 100%)',
                      width: '65%',
                      height: '100%'
                    }}></div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div style={{
                  background: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '12px',
                  padding: '20px',
                  border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '11px', color: darkMode ? '#999' : '#666' }}>Total Tasks</div>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#32249aff' }}>142</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;