// src/components/card/Card.jsx
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { 
  Calendar, 
  MessageSquare, 
  Paperclip, 
  CheckSquare,
  AlertCircle 
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { AvatarGroup } from '../common/Avatar';
import { formatDate } from '../../Utils/helpers';

const Card = ({ task, index, onClick }) => {
  const { darkMode } = useTheme();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return '#dc2626';
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#94a3b8';
    }
  };

  const completedChecklist = task.checklist?.filter(item => item.completed).length || 0;
  const totalChecklist = task.checklist?.length || 0;
  const hasChecklist = totalChecklist > 0;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick && onClick(task)}
          style={{
            marginBottom: '12px',
            background: darkMode 
              ? 'rgba(30, 64, 175, 0.1)' 
              : '#fff',
            border: `1px solid ${darkMode 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(30, 64, 175, 0.1)'}`,
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: snapshot.isDragging 
              ? '0 8px 24px rgba(0, 0, 0, 0.15)' 
              : 'none',
            transform: snapshot.isDragging ? 'rotate(2deg)' : 'none',
            ...provided.draggableProps.style
          }}
          onMouseEnter={(e) => {
            if (!snapshot.isDragging) {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = darkMode 
                ? '0 4px 12px rgba(59, 130, 246, 0.2)' 
                : '0 4px 12px rgba(30, 64, 175, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            if (!snapshot.isDragging) {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }
          }}
        >
          {/* Labels */}
          {task.labels && task.labels.length > 0 && (
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
              marginBottom: '10px'
            }}>
              {task.labels.map((label, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '3px 8px',
                    background: `${label.color}20`,
                    color: label.color,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600'
                  }}
                >
                  {label.name}
                </span>
              ))}
            </div>
          )}

          {/* Priority Badge */}
          {task.priority && task.priority !== 'none' && (
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '3px 8px',
              background: `${getPriorityColor(task.priority)}15`,
              borderRadius: '4px',
              marginBottom: '10px'
            }}>
              <AlertCircle 
                size={12} 
                color={getPriorityColor(task.priority)} 
              />
              <span style={{
                fontSize: '11px',
                fontWeight: '600',
                color: getPriorityColor(task.priority),
                textTransform: 'capitalize'
              }}>
                {task.priority}
              </span>
            </div>
          )}

          {/* Task Title */}
          <h4 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: darkMode ? '#fff' : '#1e293b',
            margin: '0 0 8px 0',
            lineHeight: '1.4'
          }}>
            {task.title}
          </h4>

          {/* Task Description (if exists) */}
          {task.description && (
            <p style={{
              fontSize: '13px',
              color: darkMode ? '#94a3b8' : '#64748b',
              margin: '0 0 10px 0',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {task.description}
            </p>
          )}

          {/* Task Meta Information */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '12px',
            gap: '8px'
          }}>
            {/* Left side - Icons */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              {/* Due Date */}
              {task.dueDate && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: isOverdue ? '#ef4444' : darkMode ? '#94a3b8' : '#64748b',
                  background: isOverdue 
                    ? 'rgba(239, 68, 68, 0.1)' 
                    : 'transparent',
                  padding: isOverdue ? '3px 6px' : '0',
                  borderRadius: '4px'
                }}>
                  <Calendar size={12} />
                  <span>{formatDate(task.dueDate)}</span>
                </div>
              )}

              {/* Comments Count */}
              {task.comments && task.comments.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}>
                  <MessageSquare size={12} />
                  <span>{task.comments.length}</span>
                </div>
              )}

              {/* Attachments Count */}
              {task.attachments && task.attachments.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: darkMode ? '#94a3b8' : '#64748b'
                }}>
                  <Paperclip size={12} />
                  <span>{task.attachments.length}</span>
                </div>
              )}

              {/* Checklist Progress */}
              {hasChecklist && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '12px',
                  color: completedChecklist === totalChecklist 
                    ? '#10b981' 
                    : darkMode ? '#94a3b8' : '#64748b',
                  background: completedChecklist === totalChecklist 
                    ? 'rgba(16, 185, 129, 0.1)' 
                    : 'transparent',
                  padding: completedChecklist === totalChecklist ? '3px 6px' : '0',
                  borderRadius: '4px'
                }}>
                  <CheckSquare size={12} />
                  <span>{completedChecklist}/{totalChecklist}</span>
                </div>
              )}
            </div>

            {/* Right side - Assignees */}
            {task.assignees && task.assignees.length > 0 && (
              <AvatarGroup users={task.assignees} size="sm" max={3} />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;