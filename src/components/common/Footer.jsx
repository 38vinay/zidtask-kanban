// src/components/common/Footer.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer style={{
      padding: '60px 0 30px',
      borderTop: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)'}`,
      background: darkMode ? 'rgba(10, 15, 30, 0.5)' : 'rgba(248, 250, 252, 0.8)'
    }}>
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-4 fade-in">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="pulse" style={{
                width: '35px',
                height: '35px',
                background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)'
              }}>Z</div>
              <span style={{ fontSize: '22px', fontWeight: '700' }}>ZidTask</span>
            </div>
            <p style={{ 
              color: darkMode ? '#94a3b8' : '#64748b', 
              fontSize: '14px', 
              marginBottom: '20px', 
              maxWidth: '300px' 
            }}>
              Simplify your workflow with powerful kanban boards and real-time collaboration tools.
            </p>
            {/* Social Media Icons */}
            <div className="d-flex gap-3">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social, idx) => (
                <a key={idx} href="#" className="hover-scale transition-all" style={{
                  width: '36px',
                  height: '36px',
                  background: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 64, 175, 0.1)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                  textDecoration: 'none',
                  border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.2)'}`,
                  fontSize: '12px'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)';
                  e.currentTarget.style.color = '#fff';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 64, 175, 0.1)';
                  e.currentTarget.style.color = '#3b82f6';
                }}>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-2 col-md-3 col-6 slide-in-left delay-100">
            <h6 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: darkMode ? '#fff' : '#1e40af'
            }}>Product</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Features', 'Pricing', 'Integrations', 'Updates'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link to={`/${item.toLowerCase()}`} className="transition-all" style={{ 
                    color: darkMode ? '#94a3b8' : '#64748b', 
                    textDecoration: 'none', 
                    fontSize: '14px' 
                  }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} 
                     onMouseLeave={(e) => e.target.style.color = darkMode ? '#94a3b8' : '#64748b'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6 slide-in-left delay-200">
            <h6 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: darkMode ? '#fff' : '#1e40af'
            }}>Company</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['About', 'Blog', 'Careers', 'Press Kit'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link to={`/${item.toLowerCase()}`} className="transition-all" style={{ 
                    color: darkMode ? '#94a3b8' : '#64748b', 
                    textDecoration: 'none', 
                    fontSize: '14px' 
                  }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} 
                     onMouseLeave={(e) => e.target.style.color = darkMode ? '#94a3b8' : '#64748b'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6 slide-in-right delay-100">
            <h6 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: darkMode ? '#fff' : '#1e40af'
            }}>Resources</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Documentation', 'Help Center', 'Community', 'Contact'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="transition-all" style={{ 
                    color: darkMode ? '#94a3b8' : '#64748b', 
                    textDecoration: 'none', 
                    fontSize: '14px' 
                  }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} 
                     onMouseLeave={(e) => e.target.style.color = darkMode ? '#94a3b8' : '#64748b'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-6 slide-in-right delay-200">
            <h6 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              marginBottom: '20px',
              color: darkMode ? '#fff' : '#1e40af'
            }}>Legal</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'].map((item, idx) => (
                <li key={idx} style={{ marginBottom: '12px' }}>
                  <Link to={`/${item.toLowerCase().replace(/ /g, '-')}`} className="transition-all" style={{ 
                    color: darkMode ? '#94a3b8' : '#64748b', 
                    textDecoration: 'none', 
                    fontSize: '14px' 
                  }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} 
                     onMouseLeave={(e) => e.target.style.color = darkMode ? '#94a3b8' : '#64748b'}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)'}`,
          paddingTop: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <p style={{ color: darkMode ? '#64748b' : '#94a3b8', fontSize: '14px', margin: 0 }}>
            © 2024 ZidTask Inc. All rights reserved.
          </p>
          <div className="d-flex gap-4">
            {['Status', 'Sitemap', 'Accessibility'].map((item, idx) => (
              <a key={idx} href="#" className="transition-all" style={{ 
                color: darkMode ? '#64748b' : '#94a3b8', 
                textDecoration: 'none', 
                fontSize: '14px' 
              }} onMouseEnter={(e) => e.target.style.color = '#3b82f6'} 
                 onMouseLeave={(e) => e.target.style.color = darkMode ? '#64748b' : '#94a3b8'}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;