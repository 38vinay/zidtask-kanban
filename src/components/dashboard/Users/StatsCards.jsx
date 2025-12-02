// src/components/dashboard/user/StatsCards.jsx
import React from 'react';
import { CheckCircle, Clock, TrendingUp, AlertCircle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

const StatsCards = ({ stats }) => {
  const { darkMode } = useTheme();

  const statCards = [
    {
      label: 'Total Tasks',
      value: stats.totalTasks,
      change: '+12%',
      icon: <TrendingUp size={24} />,
      color: '#3b82f6',
      description: 'Total active tasks'
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      change: '+8%',
      icon: <Clock size={24} />,
      color: '#f59e0b',
      description: 'Currently being worked on'
    },
    {
      label: 'Completed',
      value: stats.completed,
      change: '+23%',
      icon: <CheckCircle size={24} />,
      color: '#10b981',
      description: 'Tasks completed this month'
    },
    {
      label: 'Overdue',
      value: stats.overdue,
      change: stats.overdue > 0 ? '+5%' : '0%',
      icon: <AlertCircle size={24} />,
      color: '#ef4444',
      description: 'Tasks past due date'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '32px'
    }}>
      {statCards.map((stat, idx) => (
        <div
          key={idx}
          style={{
            background: darkMode 
              ? 'rgba(30, 64, 175, 0.1)' 
              : '#fff',
            border: `1px solid ${darkMode 
              ? 'rgba(59, 130, 246, 0.2)' 
              : 'rgba(30, 64, 175, 0.1)'}`,
            borderRadius: '16px',
            padding: '24px',
            position: 'relative',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
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
          {/* Background Gradient */}
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '100px',
            height: '100px',
            background: `radial-gradient(circle, ${stat.color}20 0%, transparent 70%)`,
            pointerEvents: 'none'
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: `${stat.color}20`,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color
              }}>
                {stat.icon}
              </div>

              <div style={{
                padding: '4px 10px',
                background: stat.change.includes('+') 
                  ? 'rgba(16, 185, 129, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                color: stat.change.includes('+') ? '#10b981' : '#ef4444',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>
                {stat.change}
              </div>
            </div>

            {/* Label */}
            <div style={{
              fontSize: '14px',
              color: darkMode ? '#94a3b8' : '#64748b',
              marginBottom: '8px',
              fontWeight: '500'
            }}>
              {stat.label}
            </div>

            {/* Value */}
            <div style={{
              fontSize: '36px',
              fontWeight: '700',
              color: darkMode ? '#fff' : '#1e293b',
              marginBottom: '8px',
              lineHeight: '1'
            }}>
              {stat.value}
            </div>

            {/* Description */}
            <div style={{
              fontSize: '12px',
              color: darkMode ? '#64748b' : '#94a3b8',
              lineHeight: '1.4'
            }}>
              {stat.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;