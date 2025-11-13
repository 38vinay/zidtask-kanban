// src/components/common/DarkModeToggle.jsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      onClick={toggleDarkMode}
      className="transition-all"
      style={{
        background: darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)',
        border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)'}`,
        color: darkMode ? '#60a5fa' : '#1e40af',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)';
        e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)';
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
      }}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.3s ease'
      }}>
        {darkMode ? (
          <Sun size={18} style={{ 
            animation: 'rotate 0.5s ease-in-out'
          }} />
        ) : (
          <Moon size={18} style={{ 
            animation: 'rotate 0.5s ease-in-out'
          }} />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;