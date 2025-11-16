// src/components/dashboard/user/TodaysSchedule.jsx
import React, { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { formatDate } from '../../../Utils/helpers';

const TodaysSchedule = ({ boards, onRefresh }) => {
  const { darkMode } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get today's tasks
  const getTodaysTasks = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tasks = [];
    boards.forEach(board => {
      board.columns?.forEach(column => {
        column.tasks?.forEach(task => {
          if (task.dueDate) {
            const taskDate = new Date(task.dueDate);
            taskDate.setHours(0, 0, 0, 0);
            
            if (taskDate.getTime() === today.getTime()) {
              tasks.push({
                ...task,
                boardName: board.name,
                columnName: column.name,
                boardColor: board.color
              });
            }
          }
        });
      });
    });
    
    return tasks;
  };

  const todaysTasks = getTodaysTasks();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#94a3b8';
    }
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
      padding: '24px',
      minHeight: '400px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '600',
          color: darkMode ? '#fff' : '#1e293b',
          margin: 0
        }}>
          Today's Schedule
        </h3>

        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Date Display */}
          <button style={{
            padding: '8px 12px',
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)',
            border: `1px solid ${darkMode 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(30, 64, 175, 0.2)'}`,
            borderRadius: '8px',
            color: darkMode ? '#fff' : '#1e293b',
            fontSize: '13px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Calendar size={14} />
            {formatDate(selectedDate)}
          </button>

          {/* Add New Button */}
          <button style={{
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Plus size={14} />
            Add New
          </button>
        </div>
      </div>

      {/* Tasks List */}
      {todaysTasks.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          color: darkMode ? '#64748b' : '#94a3b8'
        }}>
          <Calendar size={48} style={{ 
            opacity: 0.5, 
            marginBottom: '16px',
            display: 'block',
            margin: '0 auto 16px'
          }} />
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            marginBottom: '8px',
            color: darkMode ? '#94a3b8' : '#64748b'
          }}>
            No scheduled tasks for today
          </h4>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#64748b' : '#94a3b8'
          }}>
            Your schedule is clear! Add tasks to get started.
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {todaysTasks.map((task, idx) => (
            <div
              key={task.id}
              style={{
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderLeft: `4px solid ${task.boardColor}`,
                borderRadius: '10px',
                padding: '16px',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(59, 130, 246, 0.1)' 
                  : 'rgba(219, 234, 254, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = darkMode 
                  ? 'rgba(255, 255, 255, 0.03)' 
                  : 'rgba(0, 0, 0, 0.02)';
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: darkMode ? '#fff' : '#1e293b',
                    marginBottom: '4px'
                  }}>
                    {task.title}
                  </h4>
                  <div style={{
                    fontSize: '12px',
                    color: darkMode ? '#64748b' : '#94a3b8'
                  }}>
                    {task.boardName} • {task.columnName}
                  </div>
                </div>

                {task.priority && (
                  <div style={{
                    padding: '4px 8px',
                    background: `${getPriorityColor(task.priority)}20`,
                    color: getPriorityColor(task.priority),
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'capitalize'
                  }}>
                    {task.priority}
                  </div>
                )}
              </div>

              {task.description && (
                <p style={{
                  fontSize: '13px',
                  color: darkMode ? '#94a3b8' : '#64748b',
                  marginBottom: '12px',
                  lineHeight: '1.5',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {task.description}
                </p>
              )}

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '12px',
                color: darkMode ? '#64748b' : '#94a3b8'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  <Clock size={12} />
                  Due today
                </div>

                {task.assignees && task.assignees.length > 0 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: 'auto'
                  }}>
                    {task.assignees.slice(0, 3).map((assignee, i) => (
                      <div
                        key={i}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '10px',
                          fontWeight: '600',
                          color: '#fff',
                          marginLeft: i > 0 ? '-8px' : '0',
                          border: `2px solid ${darkMode ? '#1e293b' : '#fff'}`
                        }}
                      >
                        {assignee.name?.charAt(0) || '?'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;