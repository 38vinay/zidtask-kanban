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
        border: 'none',
        color: darkMode ? '#60a5fa' : '#1e40af',
        padding: '8px 12px',
        borderRadius: '8px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 64, 175, 0.2)';
        e.currentTarget.style.transform = 'scale(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default DarkModeToggle;