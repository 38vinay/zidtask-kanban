// src/pages/UserDashboardPage.jsx - Updated with Sidebar Component
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

// Import Components
import DashboardSidebar from "../components/dashboard/user/DashboardSidebar";
import UserDashboard from "../components/dashboard/user/UserDashboard";
import BoardList from "../components/board/BoardList";
import Board from "../components/board/Board";

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
    if (confirm('Are you sure you want to logout?')) {
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
        return (
          <div style={{ 
            padding: "32px", 
            minHeight: "100vh",
            background: darkMode ? "#0a0f1e" : "#f8fafc" 
          }}>
            <div style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              <h1 style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "8px",
                color: darkMode ? "#fff" : "#1e293b"
              }}>
                Team Members
              </h1>
              <p style={{ 
                color: darkMode ? "#94a3b8" : "#64748b",
                marginBottom: "32px",
                fontSize: "14px"
              }}>
                Collaborate with your team members and manage permissions
              </p>
              
              <div style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.1)' 
                  : '#fff',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>👥</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '8px'
                }}>
                  Team Management
                </h3>
                <p style={{
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '14px'
                }}>
                  Team management features will be available here
                </p>
              </div>
            </div>
          </div>
        );

      case "Messages":
        return (
          <div style={{ 
            padding: "32px",
            minHeight: "100vh",
            background: darkMode ? "#0a0f1e" : "#f8fafc"
          }}>
            <div style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              <h1 style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "8px",
                color: darkMode ? "#fff" : "#1e293b"
              }}>
                Messages
              </h1>
              <p style={{ 
                color: darkMode ? "#94a3b8" : "#64748b",
                marginBottom: "32px",
                fontSize: "14px"
              }}>
                Stay connected with your team through direct messages
              </p>
              
              <div style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.1)' 
                  : '#fff',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>💬</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '8px'
                }}>
                  Messaging System
                </h3>
                <p style={{
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '14px'
                }}>
                  Real-time messaging coming soon
                </p>
              </div>
            </div>
          </div>
        );

      case "Analytics":
        return (
          <div style={{ 
            padding: "32px",
            minHeight: "100vh",
            background: darkMode ? "#0a0f1e" : "#f8fafc"
          }}>
            <div style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              <h1 style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "8px",
                color: darkMode ? "#fff" : "#1e293b"
              }}>
                Analytics
              </h1>
              <p style={{ 
                color: darkMode ? "#94a3b8" : "#64748b",
                marginBottom: "32px",
                fontSize: "14px"
              }}>
                Track your productivity and team performance
              </p>
              
              <div style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.1)' 
                  : '#fff',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>📊</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '8px'
                }}>
                  Analytics Dashboard
                </h3>
                <p style={{
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '14px'
                }}>
                  Advanced analytics and reporting features coming soon
                </p>
              </div>
            </div>
          </div>
        );

      case "Settings":
        return (
          <div style={{ 
            padding: "32px",
            minHeight: "100vh",
            background: darkMode ? "#0a0f1e" : "#f8fafc"
          }}>
            <div style={{
              maxWidth: "1200px",
              margin: "0 auto"
            }}>
              <h1 style={{ 
                fontSize: "32px", 
                fontWeight: "700", 
                marginBottom: "8px",
                color: darkMode ? "#fff" : "#1e293b"
              }}>
                Settings
              </h1>
              <p style={{ 
                color: darkMode ? "#94a3b8" : "#64748b",
                marginBottom: "32px",
                fontSize: "14px"
              }}>
                Manage your account preferences and application settings
              </p>
              
              <div style={{
                background: darkMode 
                  ? 'rgba(30, 64, 175, 0.1)' 
                  : '#fff',
                border: `1px solid ${darkMode 
                  ? 'rgba(59, 130, 246, 0.2)' 
                  : 'rgba(30, 64, 175, 0.1)'}`,
                borderRadius: '16px',
                padding: '60px 40px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '16px'
                }}>⚙️</div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: darkMode ? '#fff' : '#1e293b',
                  marginBottom: '8px'
                }}>
                  User Settings
                </h3>
                <p style={{
                  color: darkMode ? '#94a3b8' : '#64748b',
                  fontSize: '14px'
                }}>
                  Account settings and preferences will be available here
                </p>
              </div>
            </div>
          </div>
        );

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

export default UserDashboardPage;