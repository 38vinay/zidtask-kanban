// src/pages/UserDashboardPage.jsx - Updated with Component Integration
import React, { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import {
  Home,
  LayoutGrid,
  Users,
  Mail,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

// Import Dashboard Components
import UserDashboard from "../components/dashboard/user/UserDashboard";
import BoardList from "../components/board/BoardList";
import Board from "../components/board/Board";

const UserDashboardPage = () => {
  const { darkMode } = useTheme();
  const { user, logout } = useAuth();

  // Navigation state
  const [activeMenu, setActiveMenu] = useState("Home");
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  // Menu items configuration
  const menuItems = [
    { icon: <Home size={20} />, label: "Home", path: "Home" },
    { icon: <LayoutGrid size={20} />, label: "Tasks", path: "Tasks" },
    { icon: <Users size={20} />, label: "Team", path: "Team" },
    { icon: <Mail size={20} />, label: "Messages", path: "Messages" },
    { icon: <BarChart3 size={20} />, label: "Analytics", path: "Analytics" },
    { icon: <Settings size={20} />, label: "Settings", path: "Settings" },
  ];

  // Page content renderer
  const renderPage = () => {
    // Home Dashboard
    if (activeMenu === "Home") {
      return <UserDashboard />;
    }

    // Tasks/Boards Page
    if (activeMenu === "Tasks") {
      if (selectedBoardId) {
        return (
          <Board
            boardId={selectedBoardId}
            onBack={() => setSelectedBoardId(null)}
          />
        );
      }
      return (
        <div style={{ padding: "30px" }}>
          <BoardList onSelectBoard={(id) => setSelectedBoardId(id)} />
        </div>
      );
    }

    // Team Page
    if (activeMenu === "Team") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>
            Team Members
          </h1>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            Team management functionality will be available here.
          </p>
        </div>
      );
    }

    // Messages Page
    if (activeMenu === "Messages") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>
            Messages
          </h1>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            Messaging system coming soon.
          </p>
        </div>
      );
    }

    // Analytics Page
    if (activeMenu === "Analytics") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>
            Analytics
          </h1>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            Analytics dashboard coming soon.
          </p>
        </div>
      );
    }

    // Settings Page
    if (activeMenu === "Settings") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "16px" }}>
            Settings
          </h1>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            User settings will be available here.
          </p>
        </div>
      );
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
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background: darkMode
            ? "rgba(30, 64, 175, 0.05)"
            : "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          borderRight: `1px solid ${
            darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(30, 64, 175, 0.1)"
          }`,
          display: "flex",
          flexDirection: "column",
          padding: "24px 16px",
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
            padding: "0 8px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#fff",
              boxShadow: "0 4px 12px rgba(231, 76, 140, 0.3)",
            }}
          >
            Z
          </div>
          <div>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                background: "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ZidTask
            </h2>
          </div>
        </div>

        {/* User Info */}
        <div
          style={{
            padding: "12px",
            background: darkMode
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(219, 234, 254, 0.3)",
            borderRadius: "12px",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "600",
                color: "#fff",
              }}
            >
              {user?.name?.charAt(0) || "U"}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: darkMode ? "#fff" : "#1e293b",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.name || "User"}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: darkMode ? "#64748b" : "#94a3b8",
                  textTransform: "capitalize",
                }}
              >
                {user?.role || "Employee"}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav style={{ flex: 1, overflowY: "auto" }}>
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveMenu(item.path);
                setSelectedBoardId(null);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "10px",
                marginBottom: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                border: "none",
                background:
                  activeMenu === item.path
                    ? "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)"
                    : "transparent",
                color:
                  activeMenu === item.path
                    ? "#fff"
                    : darkMode
                    ? "#94a3b8"
                    : "#64748b",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontSize: "14px",
                fontWeight: "500",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.path) {
                  e.currentTarget.style.background = darkMode
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(219, 234, 254, 0.3)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.path) {
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "transparent",
            border: `1px solid ${
              darkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"
            }`,
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            color: "#ef4444",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginTop: "16px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

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