// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { Search, Filter, X, Calendar, User, Tag, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { PRIORITY_LEVELS, LABEL_COLORS } from '../../Utils/constants';

const SearchBar = ({ onSearch, onFilter, showFilters = true }) => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filters, setFilters] = useState({
    priority: [],
    assignees: [],
    labels: [],
    dateRange: null
  });

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  const togglePriorityFilter = (priority) => {
    const newPriorities = filters.priority.includes(priority)
      ? filters.priority.filter(p => p !== priority)
      : [...filters.priority, priority];
    
    const newFilters = { ...filters, priority: newPriorities };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const clearAllFilters = () => {
    const emptyFilters = {
      priority: [],
      assignees: [],
      labels: [],
      dateRange: null
    };
    setFilters(emptyFilters);
    if (onFilter) {
      onFilter(emptyFilters);
    }
  };

  const hasActiveFilters = 
    filters.priority.length > 0 ||
    filters.assignees.length > 0 ||
    filters.labels.length > 0 ||
    filters.dateRange !== null;

  return (
    <div style={{
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      position: 'relative'
    }}>
      {/* Search Input */}
      <div style={{
        position: 'relative',
        flex: 1,
        maxWidth: '400px'
      }}>
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: darkMode ? '#64748b' : '#94a3b8'
          }}
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search tasks, descriptions..."
          style={{
            width: '100%',
            padding: '10px 40px 10px 44px',
            background: darkMode 
              ? 'rgba(255, 255, 255, 0.05)' 
              : 'rgba(0, 0, 0, 0.05)',
            border: `1px solid ${darkMode 
              ? 'rgba(59, 130, 246, 0.3)' 
              : 'rgba(30, 64, 175, 0.2)'}`,
            borderRadius: '10px',
            color: darkMode ? '#fff' : '#1e293b',
            fontSize: '14px',
            outline: 'none',
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
        {searchTerm && (
          <button
            onClick={handleClearSearch}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              color: darkMode ? '#64748b' : '#94a3b8'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Filter Button */}
      {showFilters && (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            style={{
              padding: '10px 16px',
              background: hasActiveFilters
                ? 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)'
                : darkMode 
                  ? 'rgba(255, 255, 255, 0.05)' 
                  : 'rgba(0, 0, 0, 0.05)',
              border: hasActiveFilters
                ? 'none'
                : `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.3)' 
                    : 'rgba(30, 64, 175, 0.2)'}`,
              borderRadius: '10px',
              color: hasActiveFilters ? '#fff' : (darkMode ? '#fff' : '#1e293b'),
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              position: 'relative'
            }}
          >
            <Filter size={16} />
            Filters
            {hasActiveFilters && (
              <span style={{
                width: '6px',
                height: '6px',
                background: '#fff',
                borderRadius: '50%',
                position: 'absolute',
                top: '6px',
                right: '6px'
              }} />
            )}
          </button>

          {/* Filter Menu */}
          {showFilterMenu && (
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
                onClick={() => setShowFilterMenu(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: darkMode ? '#1e293b' : '#fff',
                  border: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.2)' 
                    : 'rgba(0, 0, 0, 0.1)'}`,
                  borderRadius: '12px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                  zIndex: 20,
                  minWidth: '320px',
                  maxHeight: '500px',
                  overflowY: 'auto'
                }}
              >
                {/* Filter Header */}
                <div style={{
                  padding: '16px',
                  borderBottom: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)'}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: darkMode ? '#fff' : '#1e293b',
                    margin: 0
                  }}>
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        fontSize: '13px',
                        fontWeight: '500',
                        cursor: 'pointer'
                      }}
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Priority Filter */}
                <div style={{
                  padding: '16px',
                  borderBottom: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)'}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <AlertCircle size={16} color={darkMode ? '#60a5fa' : '#3b82f6'} />
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: darkMode ? '#fff' : '#1e293b',
                      margin: 0
                    }}>
                      Priority
                    </h4>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {PRIORITY_LEVELS.map((priority) => (
                      <label
                        key={priority.value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: filters.priority.includes(priority.value)
                            ? darkMode 
                              ? 'rgba(59, 130, 246, 0.1)' 
                              : 'rgba(219, 234, 254, 0.3)'
                            : 'transparent',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          if (!filters.priority.includes(priority.value)) {
                            e.currentTarget.style.background = darkMode 
                              ? 'rgba(255, 255, 255, 0.03)' 
                              : 'rgba(0, 0, 0, 0.02)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!filters.priority.includes(priority.value)) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.priority.includes(priority.value)}
                          onChange={() => togglePriorityFilter(priority.value)}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            accentColor: '#3b82f6'
                          }}
                        />
                        <div style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: priority.color
                        }} />
                        <span style={{
                          fontSize: '14px',
                          color: darkMode ? '#fff' : '#1e293b',
                          flex: 1
                        }}>
                          {priority.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Date Range Filter */}
                <div style={{
                  padding: '16px',
                  borderBottom: `1px solid ${darkMode 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'rgba(0, 0, 0, 0.05)'}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '12px'
                  }}>
                    <Calendar size={16} color={darkMode ? '#60a5fa' : '#3b82f6'} />
                    <h4 style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: darkMode ? '#fff' : '#1e293b',
                      margin: 0
                    }}>
                      Due Date
                    </h4>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {['overdue', 'today', 'week', 'month', 'no-date'].map((range) => (
                      <label
                        key={range}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '8px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          background: filters.dateRange === range
                            ? darkMode 
                              ? 'rgba(59, 130, 246, 0.1)' 
                              : 'rgba(219, 234, 254, 0.3)'
                            : 'transparent'
                        }}
                      >
                        <input
                          type="radio"
                          name="dateRange"
                          checked={filters.dateRange === range}
                          onChange={() => {
                            const newFilters = { ...filters, dateRange: range };
                            setFilters(newFilters);
                            if (onFilter) onFilter(newFilters);
                          }}
                          style={{
                            width: '16px',
                            height: '16px',
                            cursor: 'pointer',
                            accentColor: '#3b82f6'
                          }}
                        />
                        <span style={{
                          fontSize: '14px',
                          color: darkMode ? '#fff' : '#1e293b'
                        }}>
                          {range === 'overdue' && 'Overdue'}
                          {range === 'today' && 'Due Today'}
                          {range === 'week' && 'Due This Week'}
                          {range === 'month' && 'Due This Month'}
                          {range === 'no-date' && 'No Due Date'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div style={{ padding: '16px' }}>
                  <button
                    onClick={() => setShowFilterMenu(false)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      background: 'linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;