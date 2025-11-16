// src/components/card/CardModal.jsx
import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Tag, 
  Paperclip, 
  MessageSquare,
  CheckSquare,
  Trash2,
  AlertCircle,
  Clock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Avatar, { AvatarGroup } from '../common/Avatar';
import { formatDate } from '../../Utils/helpers';
import { PRIORITY_LEVELS, LABEL_COLORS } from '../../Utils/constants';

const CardModal = ({ 
  task, 
  columnId,
  onClose, 
  onUpdate, 
  onDelete,
  onAddComment,
  onAddAttachment 
}) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  
  const [editedTask, setEditedTask] = useState(task);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [showLabelMenu, setShowLabelMenu] = useState(false);

  const handleSave = () => {
    onUpdate(columnId, task.id, editedTask);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        text: newComment.trim(),
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }
      };
      onAddComment(columnId, task.id, comment);
      setNewComment('');
    }
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      const updatedChecklist = [
        ...(editedTask.checklist || []),
        {
          id: `checklist_${Date.now()}`,
          text: newChecklistItem.trim(),
          completed: false
        }
      ];
      setEditedTask({ ...editedTask, checklist: updatedChecklist });
      setNewChecklistItem('');
      onUpdate(columnId, task.id, { ...editedTask, checklist: updatedChecklist });
    }
  };

  const handleToggleChecklistItem = (itemId) => {
    const updatedChecklist = editedTask.checklist.map(item =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    );
    setEditedTask({ ...editedTask, checklist: updatedChecklist });
    onUpdate(columnId, task.id, { ...editedTask, checklist: updatedChecklist });
  };

  const handleDeleteChecklistItem = (itemId) => {
    const updatedChecklist = editedTask.checklist.filter(item => item.id !== itemId);
    setEditedTask({ ...editedTask, checklist: updatedChecklist });
    onUpdate(columnId, task.id, { ...editedTask, checklist: updatedChecklist });
  };

  const completedChecklist = editedTask.checklist?.filter(item => item.completed).length || 0;
  const totalChecklist = editedTask.checklist?.length || 0;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          background: darkMode ? '#1e293b' : '#fff',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '24px',
          borderBottom: `1px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.2)' 
            : 'rgba(0, 0, 0, 0.1)'}`,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ flex: 1 }}>
            {isEditingTitle ? (
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                onBlur={() => {
                  setIsEditingTitle(false);
                  handleSave();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingTitle(false);
                    handleSave();
                  }
                }}
                autoFocus
                style={{
                  width: '100%',
                  padding: '8px',
                  fontSize: '20px',
                  fontWeight: '600',
                  background: darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)',
                  border: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : 'rgba(30, 64, 175, 0.2)'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#1e293b',
                  outline: 'none'
                }}
              />
            ) : (
              <h2
                onClick={() => setIsEditingTitle(true)}
                style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  margin: 0,
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {editedTask.title}
              </h2>
            )}
          </div>
          
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              color: darkMode ? '#94a3b8' : '#64748b',
              display: 'flex',
              alignItems: 'center'
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
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: '24px'
          }}>
            {/* Main Content */}
            <div>
              {/* Description */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MessageSquare size={16} />
                  Description
                </h3>
                {isEditingDescription ? (
                  <textarea
                    value={editedTask.description || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    onBlur={() => {
                      setIsEditingDescription(false);
                      handleSave();
                    }}
                    placeholder="Add a description..."
                    autoFocus
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '12px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${darkMode 
                        ? 'rgba(59, 130, 246, 0.3)' 
                        : 'rgba(30, 64, 175, 0.2)'}`,
                      borderRadius: '8px',
                      color: darkMode ? '#fff' : '#1e293b',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingDescription(true)}
                    style={{
                      padding: '12px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.03)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      minHeight: '60px',
                      color: editedTask.description 
                        ? (darkMode ? '#fff' : '#1e293b')
                        : (darkMode ? '#64748b' : '#94a3b8'),
                      fontSize: '14px',
                      lineHeight: '1.6'
                    }}
                  >
                    {editedTask.description || 'Add a description...'}
                  </div>
                )}
              </div>

              {/* Checklist */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckSquare size={16} />
                  Checklist {totalChecklist > 0 && `(${completedChecklist}/${totalChecklist})`}
                </h3>

                {totalChecklist > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '6px',
                      fontSize: '12px',
                      color: darkMode ? '#94a3b8' : '#64748b'
                    }}>
                      <span>{Math.round(checklistProgress)}%</span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${checklistProgress}%`,
                        height: '100%',
                        background: checklistProgress === 100 
                          ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                          : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                )}

                {editedTask.checklist?.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.03)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      borderRadius: '8px',
                      marginBottom: '8px'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleChecklistItem(item.id)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#3b82f6'
                      }}
                    />
                    <span style={{
                      flex: 1,
                      fontSize: '14px',
                      color: item.completed 
                        ? (darkMode ? '#64748b' : '#94a3b8')
                        : (darkMode ? '#fff' : '#1e293b'),
                      textDecoration: item.completed ? 'line-through' : 'none'
                    }}>
                      {item.text}
                    </span>
                    <button
                      onClick={() => handleDeleteChecklistItem(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '4px',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '12px'
                }}>
                  <input
                    type="text"
                    value={newChecklistItem}
                    onChange={(e) => setNewChecklistItem(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleAddChecklistItem();
                      }
                    }}
                    placeholder="Add checklist item..."
                    style={{
                      flex: 1,
                      padding: '10px',
                      background: darkMode 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'rgba(0, 0, 0, 0.02)',
                      border: `1px solid ${darkMode 
                        ? 'rgba(59, 130, 246, 0.3)' 
                        : 'rgba(30, 64, 175, 0.2)'}`,
                      borderRadius: '8px',
                      color: darkMode ? '#fff' : '#1e293b',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={handleAddChecklistItem}
                    style={{
                      padding: '10px 16px',
                      background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <MessageSquare size={16} />
                  Comments
                </h3>

                {editedTask.comments?.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      marginBottom: '16px'
                    }}
                  >
                    <Avatar user={comment.author} size="sm" />
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '4px'
                      }}>
                        <span style={{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: darkMode ? '#fff' : '#1e293b'
                        }}>
                          {comment.author.name}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: darkMode ? '#64748b' : '#94a3b8'
                        }}>
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: darkMode ? '#94a3b8' : '#64748b',
                        margin: 0,
                        lineHeight: '1.5'
                      }}>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}

                <div style={{
                  display: 'flex',
                  gap: '12px',
                  marginTop: '16px'
                }}>
                  <Avatar user={user} size="sm" />
                  <div style={{ flex: 1 }}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      style={{
                        width: '100%',
                        minHeight: '60px',
                        padding: '10px',
                        background: darkMode 
                          ? 'rgba(255, 255, 255, 0.05)' 
                          : 'rgba(0, 0, 0, 0.02)',
                        border: `1px solid ${darkMode 
                          ? 'rgba(59, 130, 246, 0.3)' 
                          : 'rgba(30, 64, 175, 0.2)'}`,
                        borderRadius: '8px',
                        color: darkMode ? '#fff' : '#1e293b',
                        fontSize: '14px',
                        resize: 'vertical',
                        outline: 'none',
                        fontFamily: 'inherit'
                      }}
                    />
                    <button
                      onClick={handleAddComment}
                      style={{
                        marginTop: '8px',
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Add Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <h3 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: darkMode ? '#fff' : '#1e293b',
                marginBottom: '16px'
              }}>
                Actions
              </h3>

              {/* Priority */}
              <div style={{ marginBottom: '12px', position: 'relative' }}>
                <button
                  onClick={() => setShowPriorityMenu(!showPriorityMenu)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: darkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${darkMode 
                      ? 'rgba(59, 130, 246, 0.3)' 
                      : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                  }}
                >
                  <AlertCircle size={16} />
                  Priority: {editedTask.priority || 'None'}
                </button>

                {showPriorityMenu && (
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
                      onClick={() => setShowPriorityMenu(false)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      marginTop: '4px',
                      background: darkMode ? '#1e293b' : '#fff',
                      border: `1px solid ${darkMode 
                        ? 'rgba(59, 130, 246, 0.2)' 
                        : 'rgba(0, 0, 0, 0.1)'}`,
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      zIndex: 20,
                      overflow: 'hidden'
                    }}>
                      {PRIORITY_LEVELS.map((priority) => (
                        <button
                          key={priority.value}
                          onClick={() => {
                            setEditedTask({ ...editedTask, priority: priority.value });
                            onUpdate(columnId, task.id, { ...editedTask, priority: priority.value });
                            setShowPriorityMenu(false);
                          }}
                          style={{
                            width: '100%',
                            padding: '10px 12px',
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
                          <div style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: priority.color
                          }} />
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Due Date */}
              <div style={{ marginBottom: '12px' }}>
                <button
                  onClick={() => {
                    const date = prompt('Enter due date (YYYY-MM-DD):');
                    if (date) {
                      setEditedTask({ ...editedTask, dueDate: date });
                      onUpdate(columnId, task.id, { ...editedTask, dueDate: date });
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    background: darkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${darkMode 
                      ? 'rgba(59, 130, 246, 0.3)' 
                      : 'rgba(30, 64, 175, 0.2)'}`,
                    borderRadius: '8px',
                    color: darkMode ? '#fff' : '#1e293b',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    textAlign: 'left'
                  }}
                >
                  <Calendar size={16} />
                  {editedTask.dueDate ? formatDate(editedTask.dueDate) : 'Add due date'}
                </button>
              </div>

              {/* Delete Task */}
              <button
                onClick={() => {
                  if (confirm('Delete this task?')) {
                    onDelete(columnId, task.id);
                    onClose();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  borderRadius: '8px',
                  color: '#ef4444',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  justifyContent: 'center'
                }}
              >
                <Trash2 size={16} />
                Delete Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;