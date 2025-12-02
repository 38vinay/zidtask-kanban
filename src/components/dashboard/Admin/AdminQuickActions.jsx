// src/components/dashboard/user/QuickActions.jsx
import React, { useState } from 'react';
import { Plus, X, Zap, LayoutGrid, CheckSquare, Users } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const QuickActions = ({ onCreateTask, onCreateBoard }) => {
  const { darkMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <CheckSquare size={20} />,
      label: 'Create Task',
      color: '#3b82f6',
      onClick: onCreateTask
    },
    {
      icon: <LayoutGrid size={20} />,
      label: 'New Board',
      color: '#8b5cf6',
      onClick: onCreateBoard
    },
    {
      icon: <Users size={20} />,
      label: 'Invite Team',
      color: '#10b981',
      onClick: () => console.log('Invite team')
    }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(231, 76, 140, 0.4)',
          transition: 'all 0.3s ease',
          zIndex: 1000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(231, 76, 140, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(231, 76, 140, 0.4)';
        }}
      >
        <div style={{
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}>
          {isOpen ? <X size={24} /> : <Zap size={24} />}
        </div>
      </button>

      {/* Action Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(2px)',
              zIndex: 999,
              animation: 'fadeIn 0.3s ease'
            }}
          />

          {/* Actions List */}
          <div style={{
            position: 'fixed',
            bottom: '100px',
            right: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            zIndex: 1000
          }}>
            {actions.map((action, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  animation: `slideInRight 0.3s ease ${idx * 0.1}s both`
                }}
              >
                {/* Label */}
                <div style={{
                  padding: '8px 16px',
                  background: darkMode 
                    ? 'rgba(30, 64, 175, 0.9)' 
                    : 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  whiteSpace: 'nowrap'
                }}>
                  {action.label}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => {
                    action.onClick();
                    setIsOpen(false);
                  }}
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: action.color,
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 4px 12px ${action.color}40`,
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = `0 6px 16px ${action.color}60`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = `0 4px 12px ${action.color}40`;
                  }}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default QuickActions;