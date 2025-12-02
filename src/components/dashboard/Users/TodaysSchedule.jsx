// src/components/dashboard/user/TodaysSchedule.jsx
import React, { useState } from 'react';
import { Calendar, Plus, Clock, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { formatDate } from '../../../Utils/helpers';
import { boardService, taskService } from '../../../services/localDB';
import { useToast } from '../../../contexts/ToastContext';

const TodaysSchedule = ({ boards, onRefresh }) => {
  const { darkMode } = useTheme();
  const { success, error: showError } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    boardId: '',
    columnId: '',
    priority: 'medium',
    dueDate: new Date().toISOString().split('T')[0]
  });

  // Get today's tasks
  const getTodaysTasks = () => {
    const today = new Date(selectedDate);
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
                boardId: board.id,
                columnId: column.id,
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

  const handleAddTask = () => {
    if (!newTask.title || !newTask.boardId || !newTask.columnId) {
      showError('Please fill in all required fields');
      return;
    }

    try {
      taskService.create(newTask.boardId, newTask.columnId, {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate
      });

      success('Task added to schedule');
      setShowAddModal(false);
      setNewTask({
        title: '',
        description: '',
        boardId: '',
        columnId: '',
        priority: 'medium',
        dueDate: new Date().toISOString().split('T')[0]
      });
      onRefresh();
    } catch (err) {
      showError('Failed to add task');
      console.error(err);
    }
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const getAvailableColumns = () => {
    if (!newTask.boardId) return [];
    const board = boards.find(b => b.id === newTask.boardId);
    return board?.columns || [];
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
          {/* Date Display with Navigation */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              style={{
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
              }}
            >
              <Calendar size={14} />
              {formatDate(selectedDate)}
            </button>

            {showDatePicker && (
              <>
                <div
                  style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 10
                  }}
                  onClick={() => setShowDatePicker(false)}
                />
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: darkMode ? '#1e293b' : '#fff',
                  border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '8px',
                  padding: '8px',
                  zIndex: 20,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  minWidth: '150px'
                }}>
                  <button
                    onClick={() => { handleDateChange(-1); setShowDatePicker(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: darkMode ? '#fff' : '#1e293b',
                      fontSize: '13px',
                      borderRadius: '4px'
                    }}
                  >
                    ← Previous Day
                  </button>
                  <button
                    onClick={() => { setSelectedDate(new Date()); setShowDatePicker(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: darkMode ? '#fff' : '#1e293b',
                      fontSize: '13px',
                      borderRadius: '4px'
                    }}
                  >
                    Today
                  </button>
                  <button
                    onClick={() => { handleDateChange(1); setShowDatePicker(false); }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'transparent',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: darkMode ? '#fff' : '#1e293b',
                      fontSize: '13px',
                      borderRadius: '4px'
                    }}
                  >
                    Next Day →
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Add New Button */}
          <button
            onClick={() => setShowAddModal(true)}
            style={{
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
            }}
          >
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
                  Due {selectedDate.toDateString() === new Date().toDateString() ? 'today' : formatDate(selectedDate)}
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

      {/* Add Task Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: darkMode ? '#1e293b' : '#fff',
            borderRadius: '16px',
            padding: '24px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#1e293b',
                margin: 0
              }}>
                Add Scheduled Task
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Description
                </label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Enter task description"
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Board *
                </label>
                <select
                  value={newTask.boardId}
                  onChange={(e) => setNewTask({ ...newTask, boardId: e.target.value, columnId: '' })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="">Select a board</option>
                  {boards.map(board => (
                    <option key={board.id} value={board.id}>{board.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Column *
                </label>
                <select
                  value={newTask.columnId}
                  onChange={(e) => setNewTask({ ...newTask, columnId: e.target.value })}
                  disabled={!newTask.boardId}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none',
                    opacity: !newTask.boardId ? 0.5 : 1
                  }}
                >
                  <option value="">Select a column</option>
                  {getAvailableColumns().map(column => (
                    <option key={column.id} value={column.id}>{column.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Priority
                </label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: darkMode ? '#fff' : '#1e293b'
                }}>
                  Due Date
                </label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : '#e2e8f0'}`,
                    background: darkMode ? 'rgba(255, 255, 255, 0.05)' : '#fff',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '8px'
              }}>
                <button
                  onClick={handleAddTask}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add Task
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysSchedule;