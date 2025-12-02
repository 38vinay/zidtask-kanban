// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import DarkModeToggle from './DarkModeToggle';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { darkMode } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '20px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      background: scrolled 
        ? (darkMode ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)') 
        : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      transition: 'all 0.3s ease'
    }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="/" className="d-flex align-items-center gap-2 text-decoration-none">
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
            <span style={{ 
              fontSize: '22px', 
              fontWeight: '700',
              color: darkMode ? '#fff' : '#000'
            }}>ZidTask</span>
          </Link>
          
          <div className="d-none d-md-flex align-items-center gap-4">
            <a href="#features" style={{ 
              color: darkMode ? '#fff' : '#000', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '500'
            }}>Features</a>
            <a href="#how-to-use" style={{ 
              color: darkMode ? '#aaa' : '#666', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '500'
            }}>How To Use</a>
            <a href="#faq" style={{ 
              color: darkMode ? '#aaa' : '#666', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '500'
            }}>FAQs</a>
            <a href="#support" style={{ 
              color: darkMode ? '#aaa' : '#666', 
              textDecoration: 'none', 
              fontSize: '14px',
              fontWeight: '500'
            }}>Support</a>
          </div>

          <div className="d-flex align-items-center gap-3">
            <button 
              onClick={() => navigate('/login')}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: darkMode ? '#fff' : '#000',
                padding: '8px 20px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
              Login
            </button>
            <DarkModeToggle />
            <button 
              className="d-md-none btn p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ color: darkMode ? '#fff' : '#000' }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="d-md-none mt-3 pt-3" style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div className="d-flex flex-column gap-3">
              <a href="#features" style={{ color: darkMode ? '#fff' : '#000', textDecoration: 'none' }}>Features</a>
              <a href="#pricing" style={{ color: darkMode ? '#fff' : '#000', textDecoration: 'none' }}>Pricing</a>
              <a href="#faq" style={{ color: darkMode ? '#fff' : '#000', textDecoration: 'none' }}>FAQs</a>
              <a href="#support" style={{ color: darkMode ? '#fff' : '#000', textDecoration: 'none' }}>Support</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;