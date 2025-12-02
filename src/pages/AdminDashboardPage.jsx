// src/pages/UserDashboardPage.jsx - Updated with Sidebar Component
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

// Import Components
import DashboardSidebar from "../components/dashboard/Admin/AdminDashboardSidebar";
import UserDashboard from "../components/dashboard/Admin/AdminDashboard";
import BoardList from "../components/board/BoardList";
import Board from "../components/board/Board";

import NotificationsPage from "../components/dashboard/Admin/AdminNotificationsPage";

import SettingsPage from "../components/dashboard/Admin/AdminSettingsPage";
import AnalyticsPage from "../components/dashboard/Admin/AdminAnalyticsPage";
import TeamMembersPage from "../components/dashboard/Admin/AdminTeamMembersPage";

const AdminDashboardPage = () => {
  const { darkMode } = useTheme();
  const { logout } = useAuth();

  // Navigation state
  const [activeMenu, setActiveMenu] = useState("Home");
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Handle menu navigation
  const handleMenuChange = (menuPath) => {
    setActiveMenu(menuPath);
    setSelectedBoardId(null); // Reset board selection when changing menus
  };

  // Handle logout
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  // Page content renderer
  const renderPage = () => {
    switch (activeMenu) {
      case "Home":
        return <UserDashboard />;

      case "Tasks":
        if (selectedBoardId) {
          return (
            <Board
              boardId={selectedBoardId}
              onBack={() => setSelectedBoardId(null)}
            />
          );
        }
        return (
          <div style={{ padding: "32px" }}>
            <BoardList onSelectBoard={(id) => setSelectedBoardId(id)} />
          </div>
        );

      case "Team":
        return <TeamMembersPage />;

      case "Notifications":
        return <NotificationsPage />;

      case "Analytics":
        return <AnalyticsPage />;

      case "Settings":
        return <SettingsPage />;

      default:
        return <UserDashboard />;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background: darkMode ? "#0a0f1e" : "#f8fafc",
        overflow: "hidden",
      }}
    >
      {/* Sidebar Component */}
      <DashboardSidebar
        activeMenu={activeMenu}
        onMenuChange={handleMenuChange}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminDashboardPage;
