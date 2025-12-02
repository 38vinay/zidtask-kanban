// src/components/dashboard/user/DashboardHeader.jsx
import React from 'react';
import { Plus, UserPlus } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const DashboardHeader = ({ user, onCreateTask, onAssignTask, isRestricted = false }) => {
  const { darkMode } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '32px',
      flexWrap: 'wrap',
      gap: '20px'
    }}>
      {/* Welcome Section */}
      <div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          color: darkMode ? '#fff' : '#1e293b',
          marginBottom: '8px'
        }}>
          {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! 👋
        </h1>
        <p style={{
          fontSize: '14px',
          color: darkMode ? '#94a3b8' : '#64748b',
          margin: 0
        }}>
          Here's what's happening with your projects today
        </p>
      </div>

      {/* Action Buttons */}
      {!isRestricted && (
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={onAssignTask}
            style={{
              padding: '12px 20px',
              background: darkMode
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)',
              border: `1px solid ${darkMode
                ? 'rgba(59, 130, 246, 0.3)'
                : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '10px',
              color: darkMode ? '#fff' : '#1e293b',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = darkMode
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(219, 234, 254, 0.3)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = darkMode
                ? 'rgba(255, 255, 255, 0.05)'
                : 'rgba(0, 0, 0, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <UserPlus size={18} />
            Assign Task
          </button>

          <button
            onClick={onCreateTask}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(231, 76, 140, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(231, 76, 140, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 140, 0.3)';
            }}
          >
            <Plus size={18} />
            Create Task
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;