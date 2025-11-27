// src/components/dashboard/user/DashboardSidebar.jsx
import React, { useState } from "react";
import {
  Home,
  LayoutGrid,
  Users,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Bell,
  HelpCircle,
} from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import { useAuth } from "../../../contexts/AuthContext";
import { notificationService } from "../../../services/notificationService";


const DashboardSidebar = ({ activeMenu, onMenuChange, onLogout }) => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Menu items configuration
  const menuItems = [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "Home",
      badge: null,
    },
    {
      icon: <LayoutGrid size={20} />,
      label: "Tasks",
      path: "Tasks",
      badge: null,
    },
    {
      icon: <Users size={20} />,
      label: "Team",
      path: "Team",
      badge: null,
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      path: "Notifications",
      badge: notificationService.getAll().filter((n) => !n.read).length,
    },

    {
      icon: <BarChart3 size={20} />,
      label: "Analytics",
      path: "Analytics",
      badge: null,
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "Settings",
      badge: null,
    },
  ];

  return (
    <div
      style={{
        width: isCollapsed ? "80px" : "260px",
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
        position: "relative",
        transition: "width 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          position: "absolute",
          top: "24px",
          right: "-12px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          background: darkMode
            ? "rgba(59, 130, 246, 0.2)"
            : "rgba(219, 234, 254, 0.5)",
          border: `1px solid ${
            darkMode ? "rgba(59, 130, 246, 0.3)" : "rgba(30, 64, 175, 0.2)"
          }`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#3b82f6",
          zIndex: 10,
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.background = "#3b82f6";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.background = darkMode
            ? "rgba(59, 130, 246, 0.2)"
            : "rgba(219, 234, 254, 0.5)";
          e.currentTarget.style.color = "#3b82f6";
        }}
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Logo Section */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
          padding: "0 8px",
          justifyContent: isCollapsed ? "center" : "flex-start",
          transition: "all 0.3s ease",
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
            flexShrink: 0,
          }}
        >
          Z
        </div>
        {!isCollapsed && (
          <div
            style={{
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                margin: 0,
                background: "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              ZidTask
            </h2>
          </div>
        )}
      </div>

      {/* User Profile Card */}
      <div
        style={{
          padding: isCollapsed ? "12px 8px" : "12px",
          background: darkMode
            ? "rgba(59, 130, 246, 0.1)"
            : "rgba(219, 234, 254, 0.3)",
          borderRadius: "12px",
          marginBottom: "24px",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = darkMode
            ? "rgba(59, 130, 246, 0.15)"
            : "rgba(219, 234, 254, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = darkMode
            ? "rgba(59, 130, 246, 0.1)"
            : "rgba(219, 234, 254, 0.3)";
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            justifyContent: isCollapsed ? "center" : "flex-start",
          }}
        >
          {/* Avatar with Status Indicator */}
          <div style={{ position: "relative", flexShrink: 0 }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
                border: "2px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            {/* Online Status */}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                width: "12px",
                height: "12px",
                background: "#10b981",
                borderRadius: "50%",
                border: `2px solid ${darkMode ? "#1e293b" : "#fff"}`,
              }}
            />
          </div>

          {!isCollapsed && (
            <div
              style={{
                flex: 1,
                minWidth: 0,
                opacity: isCollapsed ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
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
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user?.role || "Employee"}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "4px",
        }}
      >
        {/* Main Menu Label */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: darkMode ? "#64748b" : "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              padding: "0 16px",
              marginBottom: "12px",
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            Main Menu
          </div>
        )}

        {menuItems.map((item) => (
          <div key={item.label} style={{ position: "relative" }}>
            <button
              onClick={() => onMenuChange(item.path)}
              style={{
                width: "100%",
                padding: isCollapsed ? "12px 8px" : "12px 16px",
                borderRadius: "10px",
                marginBottom: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
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
                position: "relative",
              }}
              onMouseEnter={(e) => {
                if (activeMenu !== item.path) {
                  e.currentTarget.style.background = darkMode
                    ? "rgba(59, 130, 246, 0.1)"
                    : "rgba(219, 234, 254, 0.3)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (activeMenu !== item.path) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item.icon}
              </div>

              {!isCollapsed && (
                <>
                  <span
                    style={{
                      opacity: isCollapsed ? 0 : 1,
                      transition: "opacity 0.3s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Badge for notifications */}
                  {item.badge && (
                    <div
                      style={{
                        marginLeft: "auto",
                        padding: "2px 6px",
                        background:
                          activeMenu === item.path
                            ? "rgba(255, 255, 255, 0.2)"
                            : "#ef4444",
                        borderRadius: "10px",
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "#fff",
                        minWidth: "20px",
                        textAlign: "center",
                      }}
                    >
                      {item.badge}
                    </div>
                  )}
                </>
              )}

              {/* Active Indicator */}
              {activeMenu === item.path && (
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "4px",
                    height: "60%",
                    background: "#fff",
                    borderRadius: "0 4px 4px 0",
                  }}
                />
              )}
            </button>

            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div
                style={{
                  position: "absolute",
                  left: "70px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  padding: "6px 12px",
                  background: darkMode ? "#1e293b" : "#fff",
                  border: `1px solid ${
                    darkMode ? "rgba(59, 130, 246, 0.2)" : "rgba(0, 0, 0, 0.1)"
                  }`,
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: darkMode ? "#fff" : "#1e293b",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  opacity: 0,
                  pointerEvents: "none",
                  transition: "opacity 0.3s ease",
                  zIndex: 100,
                }}
                className="sidebar-tooltip"
              >
                {item.label}
                {item.badge && (
                  <span
                    style={{
                      marginLeft: "8px",
                      padding: "2px 6px",
                      background: "#ef4444",
                      borderRadius: "10px",
                      fontSize: "11px",
                      color: "#fff",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: darkMode
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
            margin: "16px 0",
          }}
        />

        {/* Secondary Menu */}
        {!isCollapsed && (
          <div
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: darkMode ? "#64748b" : "#94a3b8",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              padding: "0 16px",
              marginBottom: "12px",
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          >
            Other
          </div>
        )}

        {/* Notifications Button */}
        <button
          style={{
            width: "100%",
            padding: isCollapsed ? "12px 8px" : "12px 16px",
            borderRadius: "10px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: "12px",
            border: "none",
            background: "transparent",
            color: darkMode ? "#94a3b8" : "#64748b",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            fontWeight: "500",
            position: "relative",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(219, 234, 254, 0.3)";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <div style={{ position: "relative", flexShrink: 0 }}>
            <Bell size={20} />
            {notifications > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  width: "16px",
                  height: "16px",
                  background: "#ef4444",
                  borderRadius: "50%",
                  fontSize: "10px",
                  fontWeight: "600",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: `2px solid ${darkMode ? "#1e293b" : "#fff"}`,
                }}
              >
                {notifications}
              </div>
            )}
          </div>
          {!isCollapsed && (
            <span
              style={{
                opacity: isCollapsed ? 0 : 1,
                transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Notifications
            </span>
          )}
        </button>

        {/* Help Button */}
        <button
          style={{
            width: "100%",
            padding: isCollapsed ? "12px 8px" : "12px 16px",
            borderRadius: "10px",
            marginBottom: "6px",
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "flex-start",
            gap: "12px",
            border: "none",
            background: "transparent",
            color: darkMode ? "#94a3b8" : "#64748b",
            cursor: "pointer",
            transition: "all 0.3s ease",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode
              ? "rgba(59, 130, 246, 0.1)"
              : "rgba(219, 234, 254, 0.3)";
            e.currentTarget.style.transform = "translateX(4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          <HelpCircle size={20} />
          {!isCollapsed && (
            <span
              style={{
                opacity: isCollapsed ? 0 : 1,
                transition: "opacity 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              Help & Support
            </span>
          )}
        </button>
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          width: "100%",
          padding: isCollapsed ? "12px 8px" : "12px 16px",
          background: "transparent",
          border: `1px solid ${
            darkMode ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.2)"
          }`,
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "flex-start",
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
          e.currentTarget.style.transform = "translateX(4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.transform = "translateX(0)";
        }}
      >
        <LogOut size={20} />
        {!isCollapsed && (
          <span
            style={{
              opacity: isCollapsed ? 0 : 1,
              transition: "opacity 0.3s ease",
              whiteSpace: "nowrap",
            }}
          >
            Logout
          </span>
        )}
      </button>

      {/* Tooltip styles */}
      <style>{`
        button:hover .sidebar-tooltip {
          opacity: 1 !important;
        }
      `}</style>
    </div>
  );
};

export default DashboardSidebar;
