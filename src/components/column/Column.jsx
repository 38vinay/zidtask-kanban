// src/components/column/Column.jsx
import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { MoreVertical, Plus, Trash2, Edit2 } from 'lucide-react';
import Card from '../card/Card';
import { useTheme } from '../../contexts/ThemeContext';

const Column = ({ 
  column, 
  boardId, 
  index,
  onAddTask,
  onDeleteColumn,
  onEditColumn,
  onTaskClick
}) => {
  const { darkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, { title: newTaskTitle.trim() });
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            width: '320px',
            minWidth: '320px',
            display: 'flex',
            flexDirection: 'column',
            background: darkMode 
              ? 'rgba(30, 64, 175, 0.05)' 
              : 'rgba(248, 250, 252, 0.8)',
            borderRadius: '12px',
            border: `1px solid ${darkMode 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(30, 64, 175, 0.1)'}`,
            maxHeight: 'calc(100vh - 200px)',
            ...provided.draggableProps.style
          }}
        >
          {/* Column Header */}
          <div
            {...provided.dragHandleProps}
            style={{
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: `1px solid ${darkMode 
                ? 'rgba(59, 130, 246, 0.1)' 
                : 'rgba(30, 64, 175, 0.05)'}`,
              cursor: 'grab'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: column.color,
                  flexShrink: 0
                }}
              />
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#1e293b',
                margin: 0
              }}>
                {column.name}
              </h3>
              <span style={{
                padding: '2px 8px',
                background: darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)',
                borderRadius: '10px',
                fontSize: '12px',
                fontWeight: '600',
                color: darkMode ? '#60a5fa' : '#1e40af'
              }}>
                {column.tasks?.length || 0}
              </span>
            </div>

            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowMenu(!showMenu)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <MoreVertical size={16} />
              </button>

              {showMenu && (
                <>
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 10
                    }}
                    onClick={() => setShowMenu(false)}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '4px',
                      background: darkMode ? '#1e293b' : '#fff',
                      border: `1px solid ${darkMode 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(0, 0, 0, 0.1)'}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 20,
                      minWidth: '150px',
                      overflow: 'hidden'
                    }}
                  >
                    <button
                      onClick={() => {
                        onEditColumn(column.id);
                        setShowMenu(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: darkMode ? '#fff' : '#1e293b'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = darkMode 
                          ? 'rgba(59, 130, 246, 0.1)' 
                          : 'rgba(0, 0, 0, 0.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Edit2 size={14} />
                      Edit Column
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete column "${column.name}"?`)) {
                          onDeleteColumn(column.id);
                        }
                        setShowMenu(false);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        background: 'transparent',
                        border: 'none',
                        textAlign: 'left',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        color: '#ef4444'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Trash2 size={14} />
                      Delete Column
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tasks List */}
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  flex: 1,
                  padding: '12px',
                  overflowY: 'auto',
                  background: snapshot.isDraggingOver 
                    ? darkMode 
                      ? 'rgba(59, 130, 246, 0.05)' 
                      : 'rgba(219, 234, 254, 0.3)'
                    : 'transparent',
                  minHeight: '100px'
                }}
              >
                {column.tasks?.map((task, index) => (
                  <Card
                    key={task.id}
                    task={task}
                    index={index}
                    onClick={() => onTaskClick(task, column.id)}
                  />
                ))}
                {provided.placeholder}

                {column.tasks?.length === 0 && !showAddTask && (
                  <div style={{
                    textAlign: 'center',
                    padding: '30px 20px',
                    color: darkMode ? '#64748b' : '#94a3b8',
                    fontSize: '14px'
                  }}>
                    No tasks yet
                  </div>
                )}
              </div>
            )}
          </Droppable>

          {/* Add Task */}
          <div style={{ padding: '12px' }}>
            {showAddTask ? (
              <div style={{
                background: darkMode 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.02)',
                borderRadius: '8px',
                padding: '12px',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.3)' 
                  : 'rgba(30, 64, 175, 0.2)'}`
              }}>
                <textarea
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddTask();
                    } else if (e.key === 'Escape') {
                      setShowAddTask(false);
                      setNewTaskTitle('');
                    }
                  }}
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '14px',
                    color: darkMode ? '#fff' : '#1e293b',
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit'
                  }}
                />
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '8px'
                }}>
                  <button
                    onClick={handleAddTask}
                    style={{
                      flex: 1,
                      padding: '8px 16px',
                      background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => {
                      setShowAddTask(false);
                      setNewTaskTitle('');
                    }}
                    style={{
                      padding: '8px 16px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.05)',
                      border: 'none',
                      borderRadius: '6px',
                      color: darkMode ? '#94a3b8' : '#64748b',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddTask(true)}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: 'transparent',
                  border: `1px dashed ${darkMode 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : 'rgba(30, 64, 175, 0.2)'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#60a5fa' : '#3b82f6',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(219, 234, 254, 0.3)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = darkMode 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : 'rgba(30, 64, 175, 0.2)';
                }}
              >
                <Plus size={16} />
                Add Task
              </button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Column;