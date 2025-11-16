// src/components/landing/Support.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { MessageCircle, Mail } from 'lucide-react';

const Support = () => {
  const { darkMode } = useTheme();

  return (
    <section id="support" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="text-center mb-5 fade-in">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '15px' }}>
            Need Help? <span className="gradient-text">We're Here</span>
          </h2>
          <p style={{ color: darkMode ? '#94a3b8' : '#64748b', fontSize: '16px' }}>
            Reach out to our friendly support team if you need any further assistance!
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          <div className="col-md-5">
            <div className="hover-lift scale-in" style={{
              background: darkMode 
                ? 'rgba(30, 64, 175, 0.15)' 
                : 'rgba(219, 234, 254, 0.4)',
              border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              height: '100%',
              cursor: 'pointer'
            }}>
              <div className="glow pulse" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#3b82f6'
              }}>
                <MessageCircle size={32} />
              </div>
              <h5 style={{ 
                fontSize: '22px', 
                fontWeight: '600', 
                marginBottom: '12px',
                color: darkMode ? '#fff' : '#1e40af'
              }}>Help Center</h5>
              <p style={{ 
                color: darkMode ? '#94a3b8' : '#64748b', 
                fontSize: '14px', 
                marginBottom: '20px' 
              }}>
                Find answers to common questions in our extensive help documentation
              </p>
              <button className="transition-all" style={{
                background: 'transparent',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                color: '#3b82f6',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                Visit Help Center
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <div className="hover-lift scale-in delay-200" style={{
              background: darkMode 
                ? 'rgba(30, 64, 175, 0.15)' 
                : 'rgba(219, 234, 254, 0.4)',
              border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '16px',
              padding: '40px 30px',
              textAlign: 'center',
              height: '100%',
              cursor: 'pointer'
            }}>
              <div className="glow pulse delay-100" style={{
                width: '70px',
                height: '70px',
                background: 'linear-gradient(135deg, rgba(30, 64, 175, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                color: '#3b82f6'
              }}>
                <Mail size={32} />
              </div>
              <h5 style={{ 
                fontSize: '22px', 
                fontWeight: '600', 
                marginBottom: '12px',
                color: darkMode ? '#fff' : '#1e40af'
              }}>Contact Us</h5>
              <p style={{ 
                color: darkMode ? '#94a3b8' : '#64748b', 
                fontSize: '14px', 
                marginBottom: '20px' 
              }}>
                Send us an email and we'll get back to you within 24 hours with a solution
              </p>
              <button className="transition-all" style={{
                background: 'transparent',
                border: '1px solid rgba(59, 130, 246, 0.5)',
                color: '#3b82f6',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.transform = 'scale(1.05)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#3b82f6';
                e.currentTarget.style.transform = 'scale(1)';
              }}>
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Support;