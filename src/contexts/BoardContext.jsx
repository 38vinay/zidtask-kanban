// src/contexts/BoardContext.jsx
import React, { createContext, useContext, useState } from 'react';

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoard must be used within BoardProvider');
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [currentBoard, setCurrentBoard] = useState(null);

  const createBoard = (boardData) => {
    const newBoard = {
      id: Date.now(),
      ...boardData,
      columns: [],
      createdAt: new Date()
    };
    setBoards([...boards, newBoard]);
    return newBoard;
  };

  const updateBoard = (boardId, updates) => {
    setBoards(boards.map(board => 
      board.id === boardId ? { ...board, ...updates } : board
    ));
  };

  const deleteBoard = (boardId) => {
    setBoards(boards.filter(board => board.id !== boardId));
  };

  const value = {
    boards,
    currentBoard,
    setCurrentBoard,
    createBoard,
    updateBoard,
    deleteBoard
  };

  return (
    <BoardContext.Provider value={value}>
      {children}
    </BoardContext.Provider>
  );
};