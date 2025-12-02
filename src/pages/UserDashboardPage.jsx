// src/pages/UserDashboardPage.jsx - Updated with Sidebar Component
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

// Import Components
import DashboardSidebar from "../components/dashboard/Users/DashboardSidebar";
import UserDashboard from "../components/dashboard/Users/UserDashboard";
import BoardList from "../components/board/BoardList";
import Board from "../components/board/Board";
import NotificationsPage from "../components/dashboard/Users/NotificationsPage";

import SettingsPage from "../components/dashboard/Users/SettingsPage";
import AnalyticsPage from "../components/dashboard/Users/AnalyticsPage";
import TeamMembersPage from "../components/dashboard/Users/TeamMembersPage";

const UserDashboardPage = () => {
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
        return <UserDashboard isRestricted={true} />;

      case "Tasks":
        if (selectedBoardId) {
          return (
            <Board
              boardId={selectedBoardId}
              onBack={() => setSelectedBoardId(null)}
              isRestricted={true}
            />
          );
        }
        return (
          <div style={{ padding: "32px" }}>
            <BoardList onSelectBoard={(id) => setSelectedBoardId(id)} />
          </div>
        );

      case "Team":
        return <TeamMembersPage isRestricted={true} />;

      case "Notifications":
        return <NotificationsPage />;

      case "Analytics":
        return <AnalyticsPage />;

      case "Settings":
        return <SettingsPage />;

      default:
        return <UserDashboard isRestricted={true} />;
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

export default UserDashboardPage;
