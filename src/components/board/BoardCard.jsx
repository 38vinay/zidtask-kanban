// src/components/board/BoardCard.jsx
import React, { useState } from 'react';
import { MoreVertical, Trash2, Edit2, Star, StarOff, Users, LayoutGrid, Clock } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { formatDate } from '../../Utils/helpers';
import { AvatarGroup } from '../common/Avatar';

const BoardCard = ({ 
  board, 
  onClick, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}) => {
  const { darkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);
  const [isFavorite, setIsFavorite] = useState(board.isFavorite || false);

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(board.id, !isFavorite);
    }
  };

  const totalTasks = board.columns?.reduce((sum, col) => 
    sum + (col.tasks?.length || 0), 0
  ) || 0;

  const completedTasks = board.columns?.reduce((sum, col) => {
    const doneTasks = col.tasks?.filter(task => 
      col.name.toLowerCase().includes('done') || 
      col.name.toLowerCase().includes('complete')
    ).length || 0;
    return sum + doneTasks;
  }, 0) || 0;

  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div
      onClick={onClick}
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
      {/* Color Header */}
      <div style={{
        height: '8px',
        background: board.color || '#3b82f6',
        position: 'relative'
      }}>
        {/* Progress Overlay */}
        {totalTasks > 0 && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '100%',
            width: `${progress}%`,
            background: 'rgba(16, 185, 129, 0.5)',
            transition: 'width 0.3s ease'
          }} />
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '20px' }}>
        {/* Header with Title and Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '12px'
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: darkMode ? '#fff' : '#1e293b',
              margin: '0 0 4px 0',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {board.name}
            </h3>
            {board.description && (
              <p style={{
                fontSize: '13px',
                color: darkMode ? '#94a3b8' : '#64748b',
                margin: 0,
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
                {board.description}
              </p>
            )}
          </div>

          <div style={{
            display: 'flex',
            gap: '4px',
            marginLeft: '12px'
          }}>
            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                color: isFavorite ? '#f59e0b' : (darkMode ? '#64748b' : '#94a3b8'),
                transition: 'all 0.2s ease'
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
              {isFavorite ? <Star size={16} fill="currentColor" /> : <StarOff size={16} />}
            </button>

            {/* Menu Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  borderRadius: '6px',
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

              {/* Dropdown Menu */}
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
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowMenu(false);
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
                        onEdit(board);
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
                      Edit Board
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(board.id, board.name);
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
                      Delete Board
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {totalTasks > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: darkMode ? '#94a3b8' : '#64748b',
              marginBottom: '6px'
            }}>
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div style={{
              width: '100%',
              height: '6px',
              background: darkMode 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(0, 0, 0, 0.1)',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: progress === 100
                  ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>
        )}

        {/* Members */}
        {board.members && board.members.length > 0 && (
          <div style={{ marginBottom: '16px' }}>
            <AvatarGroup users={board.members} max={4} size="sm" />
          </div>
        )}

        {/* Stats Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '16px',
          borderTop: `1px solid ${darkMode 
            ? 'rgba(59, 130, 246, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)'}`,
          fontSize: '13px',
          color: darkMode ? '#94a3b8' : '#64748b'
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

          {board.updatedAt && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>Updated {formatDate(board.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardCard;