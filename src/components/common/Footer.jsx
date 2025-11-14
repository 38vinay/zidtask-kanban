// src/components/common/Footer.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer style={{
      padding: '60px 0 30px',
      borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
      background: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.02)'
    }}>
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <div style={{
                width: '35px',
                height: '35px',
                background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#fff'
              }}>Z</div>
              <span style={{ fontSize: '22px', fontWeight: '700' }}>ZidTask</span>
            </div>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '20px', maxWidth: '300px' }}>
              Simplify your workflow with powerful kanban boards and real-time collaboration tools.
            </p>
            {/* Social Media Icons */}
          </div>

          <div className="col-lg-2 col-md-3 col-6">
            <h6 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '20px' }}>Product</h6>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/features" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>
                  Features
                </Link>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <Link to="/pricing" style={{ color: '#999', textDecoration: 'none', fontSize: '14px' }}>
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Additional Footer Columns */}
        </div>

        <div style={{
          borderTop: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          paddingTop: '30px',
          textAlign: 'center'
        }}>
          <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
            © 2024 ZidTask Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;