// src/components/board/BoardList.jsx - Enhanced Board Management
import React, { useState, useEffect } from 'react';
import { Plus, LayoutGrid, Clock, Users, Trash2, Edit2, MoreVertical } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { boardService } from '../../services/localDB';
import { formatDate } from '../../Utils/helpers';
import { BOARD_COLORS } from '../../Utils/constants';

const BoardList = ({ onSelectBoard }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { success, error: showError } = useToast();

  const [boards, setBoards] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState('#3b82f6');
  const [menuOpenFor, setMenuOpenFor] = useState(null);

  useEffect(() => {
    loadBoards();
  }, []);

  const loadBoards = () => {
    const allBoards = boardService.getAll();
    setBoards(allBoards);
  };

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) {
      showError('Board name is required');
      return;
    }

    try {
      const newBoard = boardService.create({
        name: newBoardName.trim(),
        description: newBoardDescription.trim(),
        color: selectedColor,
        members: [user]
      });

      loadBoards();
      setShowCreateModal(false);
      setNewBoardName('');
      setNewBoardDescription('');
      setSelectedColor('#3b82f6');
      success('Board created successfully');
    } catch (err) {
      showError('Failed to create board');
      console.error(err);
    }
  };

  const handleDeleteBoard = (boardId, boardName) => {
    if (confirm(`Delete board "${boardName}"? This action cannot be undone.`)) {
      try {
        boardService.delete(boardId);
        loadBoards();
        success('Board deleted');
      } catch (err) {
        showError('Failed to delete board');
        console.error(err);
      }
    }
  };

  const handleEditBoard = (board) => {
    const newName = prompt('Enter new board name:', board.name);
    if (newName && newName.trim()) {
      try {
        boardService.update(board.id, { name: newName.trim() });
        loadBoards();
        success('Board updated');
      } catch (err) {
        showError('Failed to update board');
        console.error(err);
      }
    }
  };

  return (
    <div style={{
      padding: '32px',
      minHeight: '100vh',
      background: darkMode ? '#0a0f1e' : '#f8fafc'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '32px',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: darkMode ? '#fff' : '#1e293b',
            margin: '0 0 8px 0'
          }}>
            My Boards
          </h1>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#94a3b8' : '#64748b',
            margin: 0
          }}>
            Manage your projects and tasks efficiently
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
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
          Create Board
        </button>
      </div>

      {/* Boards Grid */}
      {boards.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          background: darkMode 
            ? 'rgba(30, 64, 175, 0.05)' 
            : 'rgba(248, 250, 252, 0.8)',
          borderRadius: '16px',
          border: `2px dashed ${darkMode 
            ? 'rgba(59, 130, 246, 0.3)' 
            : 'rgba(30, 64, 175, 0.2)'}`
        }}>
          <LayoutGrid 
            size={64} 
            style={{
              color: darkMode ? '#64748b' : '#94a3b8',
              margin: '0 auto 20px'
            }}
          />
          <h3 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: darkMode ? '#fff' : '#1e293b',
            marginBottom: '8px'
          }}>
            No boards yet
          </h3>
          <p style={{
            fontSize: '14px',
            color: darkMode ? '#94a3b8' : '#64748b',
            marginBottom: '24px'
          }}>
            Create your first board to get started with task management
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Plus size={18} />
            Create Your First Board
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {boards.map((board) => {
            const totalTasks = board.columns?.reduce((sum, col) => 
              sum + (col.tasks?.length || 0), 0
            ) || 0;

            return (
              <div
                key={board.id}
                style={{
                  background: darkMode 
                    ? 'rgba(30, 64, 175, 0.1)' 
                    : '#fff',
                  border: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.2)' 
                    : 'rgba(30, 64, 175, 0.1)'}`,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onClick={() => onSelectBoard(board.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = darkMode 
                    ? '0 8px 24px rgba(59, 130, 246, 0.2)' 
                    : '0 8px 24px rgba(30, 64, 175, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Color Bar */}
                <div style={{
                  height: '6px',
                  background: board.color || '#3b82f6'
                }} />

                {/* Card Content */}
                <div style={{ padding: '20px' }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '12px'
                  }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: darkMode ? '#fff' : '#1e293b',
                      margin: 0,
                      flex: 1
                    }}>
                      {board.name}
                    </h3>

                    <div style={{ position: 'relative' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setMenuOpenFor(menuOpenFor === board.id ? null : board.id);
                        }}
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
                      >
                        <MoreVertical size={16} />
                      </button>

                      {menuOpenFor === board.id && (
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setMenuOpenFor(null);
                            }}
                          />
                          <div
                            onClick={(e) => e.stopPropagation()}
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
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditBoard(board);
                                setMenuOpenFor(null);
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
                              Rename
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteBoard(board.id, board.name);
                                setMenuOpenFor(null);
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
                              Delete
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {board.description && (
                    <p style={{
                      fontSize: '14px',
                      color: darkMode ? '#94a3b8' : '#64748b',
                      margin: '0 0 16px 0',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {board.description}
                    </p>
                  )}

                  {/* Stats */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    fontSize: '13px',
                    color: darkMode ? '#94a3b8' : '#64748b',
                    paddingTop: '16px',
                    borderTop: `1px solid ${darkMode 
                      ? 'rgba(59, 130, 246, 0.1)' 
                      : 'rgba(0, 0, 0, 0.05)'}`
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <LayoutGrid size={14} />
                      <span>{board.columns?.length || 0} columns</span>
                    </div>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Clock size={14} />
                      <span>{totalTasks} tasks</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Board Modal */}
      {showCreateModal && (
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
          onClick={() => setShowCreateModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '500px',
              background: darkMode ? '#1e293b' : '#fff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}
          >
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: darkMode ? '#fff' : '#1e293b',
              marginBottom: '24px'
            }}>
              Create New Board
            </h2>

            {/* Board Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e293b',
                marginBottom: '8px'
              }}>
                Board Name *
              </label>
              <input
                type="text"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                placeholder="e.g., Product Development"
                autoFocus
                style={{
                  width: '100%',
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
                  outline: 'none'
                }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e293b',
                marginBottom: '8px'
              }}>
                Description (Optional)
              </label>
              <textarea
                value={newBoardDescription}
                onChange={(e) => setNewBoardDescription(e.target.value)}
                placeholder="What is this board about?"
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
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#1e293b',
                  fontSize: '14px',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Color Selection */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: darkMode ? '#fff' : '#1e293b',
                marginBottom: '12px'
              }}>
                Board Color
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '12px'
              }}>
                {BOARD_COLORS.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    style={{
                      width: '100%',
                      aspectRatio: '1',
                      background: color.value,
                      border: selectedColor === color.value 
                        ? '3px solid #fff'
                        : 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      boxShadow: selectedColor === color.value 
                        ? '0 0 0 2px #3b82f6'
                        : 'none',
                      transition: 'all 0.2s ease'
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={handleCreateBoard}
                disabled={!newBoardName.trim()}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  background: newBoardName.trim()
                    ? 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)'
                    : darkMode 
                      ? 'rgba(255, 255, 255, 0.05)' 
                      : 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '10px',
                  color: newBoardName.trim() ? '#fff' : (darkMode ? '#64748b' : '#94a3b8'),
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: newBoardName.trim() ? 'pointer' : 'not-allowed',
                  opacity: newBoardName.trim() ? 1 : 0.5
                }}
              >
                Create Board
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setNewBoardName('');
                  setNewBoardDescription('');
                  setSelectedColor('#3b82f6');
                }}
                style={{
                  padding: '12px 24px',
                  background: darkMode 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : 'rgba(0, 0, 0, 0.05)',
                  border: 'none',
                  borderRadius: '10px',
                  color: darkMode ? '#94a3b8' : '#64748b',
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
      )}
    </div>
  );
};

export default BoardList;