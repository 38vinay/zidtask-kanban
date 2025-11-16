// src/components/dashboard/user/TaskOverview.jsx
import React from 'react';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const TaskOverview = ({ boards }) => {
  const { darkMode } = useTheme();

  // Calculate board statistics
  const getBoardStats = () => {
    return boards.slice(0, 3).map(board => {
      const totalTasks = board.columns?.reduce((sum, col) => 
        sum + (col.tasks?.length || 0), 0
      ) || 0;

      const completedTasks = board.columns?.reduce((sum, col) => {
        if (col.name.toLowerCase().includes('done') || 
            col.name.toLowerCase().includes('complete')) {
          return sum + (col.tasks?.length || 0);
        }
        return sum;
      }, 0) || 0;

      const progress = totalTasks > 0 
        ? Math.round((completedTasks / totalTasks) * 100) 
        : 0;

      return {
        ...board,
        totalTasks,
        completedTasks,
        progress
      };
    });
  };

  const boardStats = getBoardStats();

  return (
    <div style={{
      background: darkMode 
        ? 'rgba(30, 64, 175, 0.1)' 
        : '#fff',
      border: `1px solid ${darkMode 
        ? 'rgba(59, 130, 246, 0.2)' 
        : 'rgba(30, 64, 175, 0.1)'}`,
      borderRadius: '16px',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: darkMode ? '#fff' : '#1e293b',
          margin: 0
        }}>
          Project Overview
        </h3>

        <button style={{
          padding: '6px 12px',
          background: 'transparent',
          border: 'none',
          color: '#3b82f6',
          fontSize: '12px',
          fontWeight: '500',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          View All
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Board List */}
      {boardStats.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: darkMode ? '#64748b' : '#94a3b8'
        }}>
          <LayoutGrid size={40} style={{ 
            opacity: 0.5, 
            marginBottom: '12px',
            display: 'block',
            margin: '0 auto 12px'
          }} />
          <p style={{
            fontSize: '14px',
            margin: 0
          }}>
            No projects yet
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {boardStats.map((board, idx) => (
            <div
              key={board.id}
              style={{
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '10px',
                padding: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              {/* Board Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '12px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: board.color || '#3b82f6',
                  flexShrink: 0
                }} />
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  margin: 0,
                  flex: 1,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}>
                  {board.name}
                </h4>
                <span style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  color: board.progress === 100 ? '#10b981' : '#3b82f6'
                }}>
                  {board.progress}%
                </span>
              </div>

              {/* Progress Bar */}
              <div style={{
                width: '100%',
                height: '6px',
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '10px'
              }}>
                <div style={{
                  width: `${board.progress}%`,
                  height: '100%',
                  background: board.progress === 100
                    ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                  transition: 'width 0.3s ease'
                }} />
              </div>

              {/* Stats */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                color: darkMode ? '#64748b' : '#94a3b8'
              }}>
                <span>{board.completedTasks}/{board.totalTasks} tasks</span>
                <span>{board.columns?.length || 0} columns</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskOverview;