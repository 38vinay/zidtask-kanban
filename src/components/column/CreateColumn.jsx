// src/components/column/CreateColumn.jsx
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const CreateColumn = ({ onSubmit, onCancel }) => {
  const { darkMode } = useTheme();
  const [columnName, setColumnName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6b7280');

  const colors = [
    '#6b7280', '#ef4444', '#f59e0b', '#10b981', 
    '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6'
  ];

  const handleSubmit = () => {
    if (columnName.trim()) {
      onSubmit({
        name: columnName.trim(),
        color: selectedColor
      });
    }
  };

  return (
    <div style={{
      width: '100%',
      background: darkMode 
        ? 'rgba(30, 64, 175, 0.1)' 
        : 'rgba(248, 250, 252, 0.8)',
      border: `1px solid ${darkMode 
        ? 'rgba(59, 130, 246, 0.3)' 
        : 'rgba(30, 64, 175, 0.2)'}`,
      borderRadius: '12px',
      padding: '16px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: darkMode ? '#fff' : '#1e293b',
          margin: 0
        }}>
          Add Column
        </h3>
        <button
          onClick={onCancel}
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
          <X size={16} />
        </button>
      </div>

      {/* Column Name Input */}
      <input
        type="text"
        value={columnName}
        onChange={(e) => setColumnName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          } else if (e.key === 'Escape') {
            onCancel();
          }
        }}
        placeholder="Column name..."
        autoFocus
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
          outline: 'none',
          marginBottom: '12px'
        }}
      />

      {/* Color Picker */}
      <div style={{ marginBottom: '16px' }}>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: darkMode ? '#94a3b8' : '#64748b',
          marginBottom: '8px'
        }}>
          Column Color
        </label>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px'
        }}>
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              style={{
                width: '100%',
                aspectRatio: '1',
                background: color,
                border: selectedColor === color 
                  ? '3px solid #fff'
                  : 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: selectedColor === color 
                  ? '0 0 0 2px #3b82f6'
                  : 'none',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={handleSubmit}
          disabled={!columnName.trim()}
          style={{
            flex: 1,
            padding: '10px',
            background: columnName.trim()
              ? 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)'
              : darkMode 
                ? 'rgba(255, 255, 255, 0.05)' 
                : 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            borderRadius: '8px',
            color: columnName.trim() ? '#fff' : (darkMode ? '#64748b' : '#94a3b8'),
            fontSize: '14px',
            fontWeight: '500',
            cursor: columnName.trim() ? 'pointer' : 'not-allowed',
            opacity: columnName.trim() ? 1 : 0.5
          }}
        >
          Create Column
        </button>
        <button
          onClick={onCancel}
          style={{
            padding: '10px 16px',
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)',
            border: 'none',
            borderRadius: '8px',
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
  );
};

export default CreateColumn;