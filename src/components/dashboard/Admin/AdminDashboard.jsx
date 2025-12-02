// src/components/dashboard/user/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext.jsx';
import { useAuth } from '../../../contexts/AuthContext.jsx';
import { boardService } from '../../../services/localDB.js';

// Dashboard Components
import DashboardHeader from './AdminDashboardHeader';
import StatsCards from './AdminStatsCards';
import TodaysSchedule from './AdminTodaysSchedule';
import ActivityChart from './AdminActivityChart';
import TaskOverview from './AdminTaskOverview.jsx';
import TeamMembers from './AdminTeamMembers';
import QuickActions from './AdminQuickActions';

const UserDashboard = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    inProgress: 0,
    completed: 0,
    overdue: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load boards
    const allBoards = boardService.getAll();
    setBoards(allBoards);

    // Calculate stats
    let totalTasks = 0;
    let inProgress = 0;
    let completed = 0;
    let overdue = 0;

    allBoards.forEach(board => {
      board.columns?.forEach(column => {
        const tasks = column.tasks || [];
        totalTasks += tasks.length;

        // Count by status
        if (column.name.toLowerCase().includes('progress')) {
          inProgress += tasks.length;
        } else if (column.name.toLowerCase().includes('done') || 
                   column.name.toLowerCase().includes('complete')) {
          completed += tasks.length;
        }

        // Count overdue tasks
        tasks.forEach(task => {
          if (task.dueDate && new Date(task.dueDate) < new Date()) {
            overdue++;
          }
        });
      });
    });

    setStats({ totalTasks, inProgress, completed, overdue });
  };

  const handleCreateTask = () => {
    // Navigate to board selection or show modal
    console.log('Create task clicked');
  };

  const handleAssignTask = () => {
    // Show task assignment modal
    console.log('Assign task clicked');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#0a0f1e' : '#f8fafc',
      padding: '32px'
    }}>
      {/* Dashboard Header */}
      <DashboardHeader 
        user={user}
        onCreateTask={handleCreateTask}
        onAssignTask={handleAssignTask}
      />

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* Schedule Section */}
        <TodaysSchedule boards={boards} onRefresh={loadDashboardData} />

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <ActivityChart stats={stats} />
          <TaskOverview boards={boards} />
        </div>
      </div>

      {/* Team Members Section */}
      <TeamMembers boards={boards} />

      {/* Quick Actions (Floating) */}
      <QuickActions 
        onCreateTask={handleCreateTask}
        onCreateBoard={() => console.log('Create board')}
      />
    </div>
  );
};

export default UserDashboard;