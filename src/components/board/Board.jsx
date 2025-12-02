// src/components/board/Board.jsx - Complete Kanban Board Implementation
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { Plus, ArrowLeft, Settings, Users, Search, Filter } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { boardService, taskService } from '../../services/localDB';
import Column from '../column/Column';
import CardModal from '../card/CardModal';
import CreateColumn from '../column/CreateColumn';

const Board = ({ boardId, onBack, isRestricted = false }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const { success, error: showError } = useToast();

  const [board, setBoard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [showCreateColumn, setShowCreateColumn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Load board data
  useEffect(() => {
    loadBoard();
  }, [boardId]);

  const loadBoard = () => {
    setLoading(true);
    try {
      const boardData = boardService.getById(boardId);
      if (boardData) {
        setBoard(boardData);
      } else {
        showError('Board not found');
        onBack();
      }
    } catch (err) {
      showError('Failed to load board');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle drag and drop
  const handleDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    // Dragging columns
    if (type === 'column') {
      const newColumns = Array.from(board.columns);
      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);

      const updatedBoard = { ...board, columns: newColumns };
      setBoard(updatedBoard);
      boardService.update(boardId, updatedBoard);
      success('Column reordered');
      return;
    }

    // Dragging tasks
    if (source.droppableId === destination.droppableId) {
      // Same column reorder
      const column = board.columns.find(col => col.id === source.droppableId);
      const newTasks = Array.from(column.tasks);
      const [removed] = newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, removed);

      const newColumns = board.columns.map(col =>
        col.id === source.droppableId ? { ...col, tasks: newTasks } : col
      );

      const updatedBoard = { ...board, columns: newColumns };
      setBoard(updatedBoard);
      boardService.update(boardId, updatedBoard);
    } else {
      // Move between columns
      const sourceColumn = board.columns.find(col => col.id === source.droppableId);
      const destColumn = board.columns.find(col => col.id === destination.droppableId);

      const sourceTasks = Array.from(sourceColumn.tasks);
      const destTasks = Array.from(destColumn.tasks);

      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      const newColumns = board.columns.map(col => {
        if (col.id === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.id === destination.droppableId) {
          return { ...col, tasks: destTasks };
        }
        return col;
      });

      const updatedBoard = { ...board, columns: newColumns };
      setBoard(updatedBoard);
      boardService.update(boardId, updatedBoard);
      success('Task moved');
    }
  };

  // Add new task
  const handleAddTask = (columnId, taskData) => {
    try {
      const newTask = taskService.create(boardId, columnId, taskData);
      if (newTask) {
        loadBoard();
        success('Task created');
      }
    } catch (err) {
      showError('Failed to create task');
      console.error(err);
    }
  };

  // Update task
  const handleUpdateTask = (columnId, taskId, updates) => {
    try {
      taskService.update(boardId, columnId, taskId, updates);
      loadBoard();
      success('Task updated');
    } catch (err) {
      showError('Failed to update task');
      console.error(err);
    }
  };

  // Delete task
  const handleDeleteTask = (columnId, taskId) => {
    try {
      taskService.delete(boardId, columnId, taskId);
      loadBoard();
      success('Task deleted');
    } catch (err) {
      showError('Failed to delete task');
      console.error(err);
    }
  };

  // Add comment
  const handleAddComment = (columnId, taskId, comment) => {
    try {
      taskService.addComment(boardId, columnId, taskId, comment);
      loadBoard();
      success('Comment added');
    } catch (err) {
      showError('Failed to add comment');
      console.error(err);
    }
  };

  // Add attachment
  const handleAddAttachment = (columnId, taskId, attachment) => {
    try {
      taskService.addAttachment(boardId, columnId, taskId, attachment);
      loadBoard();
      success('Attachment added');
    } catch (err) {
      showError('Failed to add attachment');
      console.error(err);
    }
  };

  // Add column
  const handleAddColumn = (columnData) => {
    try {
      boardService.addColumn(boardId, columnData);
      loadBoard();
      setShowCreateColumn(false);
      success('Column created');
    } catch (err) {
      showError('Failed to create column');
      console.error(err);
    }
  };

  // Delete column
  const handleDeleteColumn = (columnId) => {
    try {
      boardService.deleteColumn(boardId, columnId);
      loadBoard();
      success('Column deleted');
    } catch (err) {
      showError('Failed to delete column');
      console.error(err);
    }
  };

  // Edit column
  const handleEditColumn = (columnId) => {
    const column = board.columns.find(col => col.id === columnId);
    if (column) {
      const newName = prompt('Enter new column name:', column.name);
      if (newName && newName.trim()) {
        try {
          boardService.updateColumn(boardId, columnId, { name: newName.trim() });
          loadBoard();
          success('Column updated');
        } catch (err) {
          showError('Failed to update column');
          console.error(err);
        }
      }
    }
  };

  // Task click handler
  const handleTaskClick = (task, columnId) => {
    setSelectedTask(task);
    setSelectedColumnId(columnId);
  };

  // Filter tasks by search
  const filterBoard = () => {
    if (!searchQuery.trim()) return board;

    const filteredColumns = board.columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }));

    return { ...board, columns: filteredColumns };
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: darkMode ? '#0a0f1e' : '#f8fafc'
      }}>
        <div style={{
          textAlign: 'center'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(59, 130, 246, 0.2)',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '14px'
          }}>Loading board...</p>
        </div>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!board) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: darkMode ? '#0a0f1e' : '#f8fafc'
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: darkMode ? '#94a3b8' : '#64748b',
            fontSize: '16px'
          }}>Board not found</p>
          <button
            onClick={onBack}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
              border: 'none',
              borderRadius: '8px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const displayBoard = filterBoard();

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#0a0f1e' : '#f8fafc',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Board Header */}
      <div style={{
        padding: '20px 32px',
        background: darkMode
          ? 'rgba(30, 64, 175, 0.05)'
          : 'rgba(255, 255, 255, 0.8)',
        borderBottom: `1px solid ${darkMode
          ? 'rgba(59, 130, 246, 0.2)'
          : 'rgba(30, 64, 175, 0.1)'}`,
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {/* Left side */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={onBack}
              style={{
                padding: '8px',
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: darkMode ? '#fff' : '#1e293b'
              }}
            >
              <ArrowLeft size={20} />
            </button>

            <div>
              <h1 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: darkMode ? '#fff' : '#1e293b',
                margin: 0
              }}>
                {board.name}
              </h1>
              {board.description && (
                <p style={{
                  fontSize: '14px',
                  color: darkMode ? '#94a3b8' : '#64748b',
                  margin: '4px 0 0 0'
                }}>
                  {board.description}
                </p>
              )}
            </div>
          </div>

          {/* Right side */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: darkMode ? '#64748b' : '#94a3b8'
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks..."
                style={{
                  padding: '8px 12px 8px 38px',
                  background: darkMode
                    ? 'rgba(255, 255, 255, 0.05)'
                    : 'rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${darkMode
                    ? 'rgba(59, 130, 246, 0.3)'
                    : 'rgba(30, 64, 175, 0.2)'}`,
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#1e293b',
                  fontSize: '14px',
                  outline: 'none',
                  width: '200px'
                }}
              />
            </div>

            {/* Board Actions */}
            <button
              style={{
                padding: '8px 12px',
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: darkMode ? '#fff' : '#1e293b',
                fontSize: '14px'
              }}
            >
              <Users size={16} />
              Members
            </button>

            <button
              style={{
                padding: '8px 12px',
                background: darkMode
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: darkMode ? '#fff' : '#1e293b',
                fontSize: '14px'
              }}
            >
              <Settings size={16} />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <div style={{
        flex: 1,
        padding: '24px 32px',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" type="column" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display: 'flex',
                  gap: '20px',
                  minHeight: 'calc(100vh - 200px)',
                  paddingBottom: '20px'
                }}
              >
                {displayBoard.columns.map((column, index) => (
                  <Column
                    key={column.id}
                    column={column}
                    boardId={boardId}
                    index={index}
                    onAddTask={handleAddTask}
                    onDeleteColumn={handleDeleteColumn}
                    onEditColumn={handleEditColumn}
                    onTaskClick={handleTaskClick}
                    isRestricted={isRestricted}
                  />
                ))}

                {provided.placeholder}

                {/* Add Column Button */}
                {!isRestricted && (
                  <div style={{
                    width: '320px',
                    minWidth: '320px'
                  }}>
                    {showCreateColumn ? (
                      <CreateColumn
                        onSubmit={handleAddColumn}
                        onCancel={() => setShowCreateColumn(false)}
                      />
                    ) : (
                      <button
                        onClick={() => setShowCreateColumn(true)}
                        style={{
                          width: '100%',
                          padding: '16px',
                          background: darkMode
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.02)',
                          border: `2px dashed ${darkMode
                            ? 'rgba(59, 130, 246, 0.3)'
                            : 'rgba(30, 64, 175, 0.2)'}`,
                          borderRadius: '12px',
                          color: darkMode ? '#60a5fa' : '#3b82f6',
                          fontSize: '14px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = darkMode
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'rgba(219, 234, 254, 0.3)';
                          e.currentTarget.style.borderColor = '#3b82f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = darkMode
                            ? 'rgba(255, 255, 255, 0.03)'
                            : 'rgba(0, 0, 0, 0.02)';
                          e.currentTarget.style.borderColor = darkMode
                            ? 'rgba(59, 130, 246, 0.3)'
                            : 'rgba(30, 64, 175, 0.2)';
                        }}
                      >
                        <Plus size={18} />
                        Add Column
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Task Modal */}
      {selectedTask && (
        <CardModal
          task={selectedTask}
          columnId={selectedColumnId}
          onClose={() => {
            setSelectedTask(null);
            setSelectedColumnId(null);
          }}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          onAddComment={handleAddComment}
          onAddAttachment={handleAddAttachment}
        />
      )}
    </div>
  );
};

export default Board;