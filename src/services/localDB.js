// src/services/localDB.js - Core data management service

/**
 * LocalDB - A simple localStorage wrapper with JSON support
 * This provides a consistent API for data persistence
 */
export const localDB = {
  /**
   * Get data from localStorage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {*} Parsed data or default value
   */
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  /**
   * Set data in localStorage
   * @param {string} key - Storage key
   * @param {*} value - Data to store
   * @returns {boolean} Success status
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      return false;
    }
  },

  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
      return false;
    }
  },

  /**
   * Clear all localStorage data
   * @returns {boolean} Success status
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Check if key exists in localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Existence status
   */
  has(key) {
    return localStorage.getItem(key) !== null;
  },

  /**
   * Get all keys from localStorage
   * @returns {string[]} Array of keys
   */
  keys() {
    return Object.keys(localStorage);
  }
};

/**
 * Board Service - Manages board operations
 */
export const boardService = {
  STORAGE_KEY: 'zidtask_boards',

  /**
   * Get all boards
   */
  getAll() {
    return localDB.get(this.STORAGE_KEY, []);
  },

  /**
   * Get board by ID
   */
  getById(id) {
    const boards = this.getAll();
    return boards.find(board => board.id === id);
  },

  /**
   * Create new board
   */
  create(boardData) {
    const boards = this.getAll();
    const newBoard = {
      id: `board_${Date.now()}`,
      name: boardData.name,
      description: boardData.description || '',
      color: boardData.color || '#3b82f6',
      columns: boardData.columns || [
        { id: 'col_1', name: 'To Do', color: '#6b7280', tasks: [] },
        { id: 'col_2', name: 'In Progress', color: '#f59e0b', tasks: [] },
        { id: 'col_3', name: 'Done', color: '#10b981', tasks: [] }
      ],
      members: boardData.members || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    boards.push(newBoard);
    localDB.set(this.STORAGE_KEY, boards);
    return newBoard;
  },

  /**
   * Update board
   */
  update(id, updates) {
    const boards = this.getAll();
    const index = boards.findIndex(board => board.id === id);
    
    if (index !== -1) {
      boards[index] = {
        ...boards[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localDB.set(this.STORAGE_KEY, boards);
      return boards[index];
    }
    return null;
  },

  /**
   * Delete board
   */
  delete(id) {
    const boards = this.getAll();
    const filtered = boards.filter(board => board.id !== id);
    localDB.set(this.STORAGE_KEY, filtered);
    return true;
  },

  /**
   * Add column to board
   */
  addColumn(boardId, columnData) {
    const board = this.getById(boardId);
    if (!board) return null;

    const newColumn = {
      id: `col_${Date.now()}`,
      name: columnData.name,
      color: columnData.color || '#6b7280',
      tasks: []
    };

    board.columns.push(newColumn);
    return this.update(boardId, board);
  },

  /**
   * Update column
   */
  updateColumn(boardId, columnId, updates) {
    const board = this.getById(boardId);
    if (!board) return null;

    const columnIndex = board.columns.findIndex(col => col.id === columnId);
    if (columnIndex === -1) return null;

    board.columns[columnIndex] = {
      ...board.columns[columnIndex],
      ...updates
    };

    return this.update(boardId, board);
  },

  /**
   * Delete column
   */
  deleteColumn(boardId, columnId) {
    const board = this.getById(boardId);
    if (!board) return null;

    board.columns = board.columns.filter(col => col.id !== columnId);
    return this.update(boardId, board);
  },

  /**
   * Reorder columns
   */
  reorderColumns(boardId, columnIds) {
    const board = this.getById(boardId);
    if (!board) return null;

    const reorderedColumns = columnIds.map(id => 
      board.columns.find(col => col.id === id)
    ).filter(Boolean);

    board.columns = reorderedColumns;
    return this.update(boardId, board);
  }
};

/**
 * Task Service - Manages task operations
 */
export const taskService = {
  /**
   * Create new task
   */
  create(boardId, columnId, taskData) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    const newTask = {
      id: `task_${Date.now()}`,
      title: taskData.title,
      description: taskData.description || '',
      priority: taskData.priority || 'medium',
      labels: taskData.labels || [],
      assignees: taskData.assignees || [],
      dueDate: taskData.dueDate || null,
      attachments: [],
      comments: [],
      checklist: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    column.tasks.push(newTask);
    boardService.update(boardId, board);
    return newTask;
  },

  /**
   * Update task
   */
  update(boardId, columnId, taskId, updates) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    const taskIndex = column.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return null;

    column.tasks[taskIndex] = {
      ...column.tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    boardService.update(boardId, board);
    return column.tasks[taskIndex];
  },

  /**
   * Delete task
   */
  delete(boardId, columnId, taskId) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    column.tasks = column.tasks.filter(task => task.id !== taskId);
    boardService.update(boardId, board);
    return true;
  },

  /**
   * Move task between columns
   */
  move(boardId, sourceColumnId, destColumnId, taskId, newIndex) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const sourceColumn = board.columns.find(col => col.id === sourceColumnId);
    const destColumn = board.columns.find(col => col.id === destColumnId);
    
    if (!sourceColumn || !destColumn) return null;

    const taskIndex = sourceColumn.tasks.findIndex(task => task.id === taskId);
    if (taskIndex === -1) return null;

    const [task] = sourceColumn.tasks.splice(taskIndex, 1);
    destColumn.tasks.splice(newIndex, 0, task);

    boardService.update(boardId, board);
    return board;
  },

  /**
   * Add comment to task
   */
  addComment(boardId, columnId, taskId, comment) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    const task = column.tasks.find(t => t.id === taskId);
    if (!task) return null;

    const newComment = {
      id: `comment_${Date.now()}`,
      text: comment.text,
      author: comment.author,
      createdAt: new Date().toISOString()
    };

    if (!task.comments) task.comments = [];
    task.comments.push(newComment);

    boardService.update(boardId, board);
    return newComment;
  },

  /**
   * Add attachment to task
   */
  addAttachment(boardId, columnId, taskId, attachment) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    const task = column.tasks.find(t => t.id === taskId);
    if (!task) return null;

    const newAttachment = {
      id: `attachment_${Date.now()}`,
      name: attachment.name,
      url: attachment.url,
      type: attachment.type,
      size: attachment.size,
      uploadedAt: new Date().toISOString()
    };

    if (!task.attachments) task.attachments = [];
    task.attachments.push(newAttachment);

    boardService.update(boardId, board);
    return newAttachment;
  },

  /**
   * Toggle checklist item
   */
  toggleChecklistItem(boardId, columnId, taskId, itemId) {
    const board = boardService.getById(boardId);
    if (!board) return null;

    const column = board.columns.find(col => col.id === columnId);
    if (!column) return null;

    const task = column.tasks.find(t => t.id === taskId);
    if (!task || !task.checklist) return null;

    const item = task.checklist.find(i => i.id === itemId);
    if (!item) return null;

    item.completed = !item.completed;
    boardService.update(boardId, board);
    return item;
  }
};

export default localDB;