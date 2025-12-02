// src/components/dashboard/user/ActivityChart.jsx
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const ActivityChart = ({ stats }) => {
  const { darkMode } = useTheme();

  // Mock activity data for the week
  const activityData = [
    { day: 'Mon', tasks: 12, percentage: 60 },
    { day: 'Tue', tasks: 18, percentage: 90 },
    { day: 'Wed', tasks: 8, percentage: 40 },
    { day: 'Thu', tasks: 15, percentage: 75 },
    { day: 'Fri', tasks: 20, percentage: 100 },
    { day: 'Sat', tasks: 5, percentage: 25 },
    { day: 'Sun', tasks: 3, percentage: 15 }
  ];

  const getBarColor = (percentage) => {
    if (percentage >= 80) return 'linear-gradient(to top, #10b981 0%, #059669 100%)';
    if (percentage >= 50) return 'linear-gradient(to top, #3b82f6 0%, #2563eb 100%)';
    return 'linear-gradient(to top, rgba(231, 76, 140, 0.5) 0%, rgba(168, 85, 247, 0.5) 100%)';
  };

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
          Weekly Activity
        </h3>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 10px',
          background: 'rgba(16, 185, 129, 0.1)',
          color: '#10b981',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '600'
        }}>
          <TrendingUp size={12} />
          +23%
        </div>
      </div>

      {/* Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '20px',
        padding: '12px',
        background: darkMode 
          ? 'rgba(59, 130, 246, 0.1)' 
          : 'rgba(219, 234, 254, 0.3)',
        borderRadius: '8px'
      }}>
        <div>
          <div style={{
            fontSize: '12px',
            color: darkMode ? '#94a3b8' : '#64748b',
            marginBottom: '4px'
          }}>
            Total Tasks
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#1e293b'
          }}>
            {stats.totalTasks}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '12px',
            color: darkMode ? '#94a3b8' : '#64748b',
            marginBottom: '4px'
          }}>
            Completion Rate
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#10b981'
          }}>
            {stats.totalTasks > 0 
              ? Math.round((stats.completed / stats.totalTasks) * 100) 
              : 0}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '140px',
        gap: '8px',
        marginBottom: '12px'
      }}>
        {activityData.map((data, idx) => (
          <div
            key={idx}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              position: 'relative'
            }}
          >
            {/* Bar */}
            <div
              style={{
                width: '100%',
                height: `${data.percentage}%`,
                background: getBarColor(data.percentage),
                borderRadius: '6px 6px 0 0',
                position: 'relative',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scaleY(1.05)';
                e.currentTarget.style.filter = 'brightness(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scaleY(1)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              {/* Tooltip on hover */}
              <div style={{
                position: 'absolute',
                top: '-30px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: darkMode ? '#1e293b' : '#fff',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#1e293b',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                opacity: 0,
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}>
                {data.tasks} tasks
              </div>
            </div>

            {/* Day Label */}
            <div style={{
              fontSize: '11px',
              fontWeight: '600',
              color: darkMode ? '#64748b' : '#94a3b8',
              textTransform: 'uppercase'
            }}>
              {data.day}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        paddingTop: '16px',
        borderTop: `1px solid ${darkMode 
          ? 'rgba(59, 130, 246, 0.1)' 
          : 'rgba(0, 0, 0, 0.05)'}`
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: darkMode ? '#94a3b8' : '#64748b'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            borderRadius: '3px'
          }} />
          High
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: darkMode ? '#94a3b8' : '#64748b'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            borderRadius: '3px'
          }} />
          Medium
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          color: darkMode ? '#94a3b8' : '#64748b'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
            borderRadius: '3px'
          }} />
          Low
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;