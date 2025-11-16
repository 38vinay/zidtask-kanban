// src/components/card/Comments.jsx
import React, { useState } from 'react';
import { Send, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../common/Avatar';
import { formatDate } from '../../Utils/helpers';

const Comments = ({ comments = [], onAddComment, onEditComment, onDeleteComment }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [menuOpenFor, setMenuOpenFor] = useState(null);

  const handleSubmit = () => {
    if (newComment.trim() && onAddComment) {
      onAddComment({
        text: newComment.trim(),
        author: {
          id: user.id,
          name: user.name,
          avatar: user.avatar
        }
      });
      setNewComment('');
    }
  };

  const handleEdit = (comment) => {
    setEditingId(comment.id);
    setEditText(comment.text);
    setMenuOpenFor(null);
  };

  const handleSaveEdit = (commentId) => {
    if (editText.trim() && onEditComment) {
      onEditComment(commentId, editText.trim());
      setEditingId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const handleDelete = (commentId) => {
    if (confirm('Delete this comment?') && onDeleteComment) {
      onDeleteComment(commentId);
      setMenuOpenFor(null);
    }
  };

  return (
    <div>
      {/* Comment List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '24px'
      }}>
        {comments.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.03)' 
              : 'rgba(0, 0, 0, 0.02)',
            borderRadius: '12px',
            border: `1px dashed ${darkMode 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(30, 64, 175, 0.2)'}`
          }}>
            <p style={{
              fontSize: '14px',
              color: darkMode ? '#64748b' : '#94a3b8',
              margin: 0
            }}>
              No comments yet. Start the conversation!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              style={{
                display: 'flex',
                gap: '12px',
                position: 'relative'
              }}
            >
              {/* Avatar */}
              <Avatar user={comment.author} size="md" />

              {/* Comment Content */}
              <div style={{ flex: 1 }}>
                {/* Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{
                      fontSize: '14px',
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

                  {/* Comment Menu (only for comment author) */}
                  {comment.author.id === user.id && (
                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={() => setMenuOpenFor(menuOpenFor === comment.id ? null : comment.id)}
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
                        <MoreVertical size={14} />
                      </button>

                      {menuOpenFor === comment.id && (
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
                            onClick={() => setMenuOpenFor(null)}
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
                              minWidth: '120px',
                              overflow: 'hidden'
                            }}
                          >
                            <button
                              onClick={() => handleEdit(comment)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
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
                              <Edit2 size={12} />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(comment.id)}
                              style={{
                                width: '100%',
                                padding: '8px 12px',
                                background: 'transparent',
                                border: 'none',
                                textAlign: 'left',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '13px',
                                color: '#ef4444'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <Trash2 size={12} />
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Comment Text */}
                {editingId === comment.id ? (
                  <div>
                    <textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        minHeight: '80px',
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
                        fontFamily: 'inherit',
                        marginBottom: '8px'
                      }}
                    />
                    <div style={{
                      display: 'flex',
                      gap: '8px'
                    }}>
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        style={{
                          padding: '6px 12px',
                          background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                          border: 'none',
                          borderRadius: '6px',
                          color: '#fff',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          padding: '6px 12px',
                          background: darkMode 
                            ? 'rgba(255, 255, 255, 0.05)' 
                            : 'rgba(0, 0, 0, 0.05)',
                          border: 'none',
                          borderRadius: '6px',
                          color: darkMode ? '#94a3b8' : '#64748b',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{
                    padding: '12px',
                    background: darkMode 
                      ? 'rgba(255, 255, 255, 0.03)' 
                      : 'rgba(0, 0, 0, 0.02)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: darkMode ? '#e2e8f0' : '#475569',
                    lineHeight: '1.6',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}>
                    {comment.text}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Input */}
      <div style={{
        display: 'flex',
        gap: '12px',
        paddingTop: '24px',
        borderTop: `1px solid ${darkMode 
          ? 'rgba(59, 130, 246, 0.1)' 
          : 'rgba(0, 0, 0, 0.05)'}`
      }}>
        <Avatar user={user} size="md" />
        
        <div style={{ flex: 1 }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                handleSubmit();
              }
            }}
            placeholder="Write a comment... (Ctrl+Enter to submit)"
            style={{
              width: '100%',
              minHeight: '80px',
              padding: '12px',
              background: darkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${darkMode 
                ? 'rgba(59, 130, 246, 0.3)' 
                : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '10px',
              color: darkMode ? '#fff' : '#1e293b',
              fontSize: '14px',
              resize: 'vertical',
              outline: 'none',
              fontFamily: 'inherit',
              marginBottom: '10px',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#3b82f6';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = darkMode 
                ? 'rgba(59, 130, 246, 0.3)' 
                : 'rgba(30, 64, 175, 0.2)';
              e.target.style.boxShadow = 'none';
            }}
          />
          
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={handleSubmit}
              disabled={!newComment.trim()}
              style={{
                padding: '10px 20px',
                background: newComment.trim()
                  ? 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)'
                  : darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '8px',
                color: newComment.trim() ? '#fff' : (darkMode ? '#64748b' : '#94a3b8'),
                fontSize: '14px',
                fontWeight: '500',
                cursor: newComment.trim() ? 'pointer' : 'not-allowed',
                opacity: newComment.trim() ? 1 : 0.5,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (newComment.trim()) {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(231, 76, 140, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Send size={16} />
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;