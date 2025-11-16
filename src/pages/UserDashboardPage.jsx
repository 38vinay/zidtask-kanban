// src/pages/UserDashboardPage.jsx

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
  Search,
  Bell,
  Plus,
  HelpCircle,
  ChevronDown,
  Calendar,
  LogOut,
} from "lucide-react";

// Kanban Components (your existing structure)
import BoardList from "../components/board/BoardList";
import Board from "../components/board/Board";

const UserDashboardPage = () => {
  const { darkMode } = useTheme();
  const { user, logout } = useAuth();

  // Sidebar menu selection
  const [activeMenu, setActiveMenu] = useState("Home");

  // For Kanban board view
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const stats = [
    { label: "Total Tasks", value: 0, change: "+0%", desc: "Total active tasks" },
    { label: "In Progress", value: 0, change: "+0%", desc: "Currently being worked on" },
    { label: "Completed", value: 0, change: "+0%", desc: "Task completed last month" },
  ];

  const activityData = ["M", "T", "W", "T", "F", "S", "S"];

  // =============== PAGE SWITCHER ================
  const renderPage = () => {
    // -------------------------------------------
    // 1️⃣ HOME PAGE (your big dashboard UI)
    // -------------------------------------------
    if (activeMenu === "Home") {
      return (
        <div style={{ padding: "32px", overflowY: "auto" }}>
          {/* Header */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "32px",
          }}>
            <div>
              <h1 style={{
                fontSize: "32px",
                fontWeight: "700",
                marginBottom: "4px",
                color: darkMode ? "#fff" : "#0f172a",
              }}>Home</h1>

              <p style={{
                fontSize: "14px",
                color: darkMode ? "#64748b" : "#94a3b8",
              }}>Monitor all your tasks from here</p>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button style={{
                padding: "10px 20px",
                background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                border: `1px solid ${darkMode ? "rgba(59,130,246,0.2)" : "rgba(30,64,175,0.1)"}`,
                borderRadius: "10px",
                color: darkMode ? "#fff" : "#0f172a",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Plus size={18} /> Assign task
              </button>

              <button style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg,#e74c8c 0%,#a855f7 100%)",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <Plus size={18} /> Create task
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "20px",
            marginBottom: "32px",
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{
                background: darkMode ? "rgba(30,64,175,0.1)" : "#fff",
                border: `1px solid ${darkMode ? "rgba(59,130,246,0.2)" : "rgba(30,64,175,0.1)"}`,
                padding: "24px",
                borderRadius: "16px",
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}>
                  <span style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>{stat.label}</span>
                  <HelpCircle size={18} />
                </div>

                <div style={{
                  fontSize: "36px",
                  fontWeight: "700",
                  color: darkMode ? "#fff" : "#0f172a",
                }}>{stat.value}</div>

                <div style={{
                  display: "inline-block",
                  background: "rgba(16,185,129,0.1)",
                  color: "#10b981",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  marginBottom: "8px",
                }}>{stat.change}</div>

                <p style={{ color: darkMode ? "#64748b" : "#94a3b8" }}>{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Activity + Schedule */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 400px",
            gap: "20px"
          }}>
            {/* Schedule */}
            <div style={{
              background: darkMode ? "rgba(30,64,175,0.1)" : "#fff",
              borderRadius: "16px",
              border: `1px solid ${darkMode ? "rgba(59,130,246,0.2)" : "rgba(30,64,175,0.1)"}`,
              padding: "24px"
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "24px",
              }}>
                <h3 style={{ color: darkMode ? "#fff" : "#0f172a" }}>Today's Schedule</h3>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button style={{
                    padding: "6px 12px",
                    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)",
                    borderRadius: "8px",
                  }}>
                    <Calendar size={14} /> Sep 10, 2025
                  </button>

                  <button style={{
                    padding: "6px 12px",
                    background: "linear-gradient(135deg,#e74c8c,#a855f7)",
                    borderRadius: "8px",
                    color: "#fff"
                  }}>Add new</button>
                </div>
              </div>

              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <Calendar size={48} style={{ opacity: 0.5 }} />
                <p>No scheduled tasks for today</p>
              </div>
            </div>

            {/* Activity */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{
                background: darkMode ? "rgba(30,64,175,0.1)" : "#fff",
                borderRadius: "16px",
                border: `1px solid ${darkMode ? "rgba(59,130,246,0.2)" : "rgba(30,64,175,0.1)"}`,
                padding: "24px"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}>
                  <h3 style={{ color: darkMode ? "#fff" : "#0f172a" }}>Activity</h3>
                  <span style={{ color: darkMode ? "#64748b" : "#94a3b8" }}>0 Tasks</span>
                </div>

                <div style={{
                  height: "120px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "flex-end",
                }}>
                  {activityData.map((d, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div style={{
                        height: "60px",
                        background: "linear-gradient(to top, rgba(231,76,140,0.3),rgba(168,85,247,0.3))",
                        borderRadius: "8px 8px 0 0",
                        marginBottom: "8px"
                      }} />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Task Overview */}
              <div style={{
                background: darkMode ? "rgba(30,64,175,0.1)" : "#fff",
                borderRadius: "16px",
                padding: "24px"
              }}>
                <h3 style={{ marginBottom: "16px", color: darkMode ? "#fff" : "#0f172a" }}>
                  Task Overview
                </h3>

                <div style={{ textAlign: "center", padding: "40px" }}>
                  <LayoutGrid size={40} style={{ opacity: 0.5 }} />
                  <p>No active tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <div style={{
            marginTop: "32px",
            background: darkMode ? "rgba(30,64,175,0.1)" : "#fff",
            padding: "24px",
            borderRadius: "16px"
          }}>
            <h3 style={{ color: darkMode ? "#fff" : "#0f172a" }}>Team Members (0)</h3>

            <div style={{ textAlign: "center", padding: "40px" }}>
              <Users size={40} style={{ opacity: 0.5 }} />
              <p>No team members yet</p>
            </div>
          </div>
        </div>
      );
    }

    // -------------------------------------------
    // 2️⃣ TASKS PAGE → BOARD LIST + BOARD VIEW
    // -------------------------------------------
    if (activeMenu === "Tasks") {
      // If user selected a board, show it
      if (selectedBoardId) {
        return (
          <Board
            boardId={selectedBoardId}
            onBack={() => setSelectedBoardId(null)}
          />
        );
      }

      // Otherwise show board list
      return (
        <div style={{ padding: "30px" }}>
          <BoardList onSelectBoard={(id) => setSelectedBoardId(id)} />
        </div>
      );
    }

    // -------------------------------------------
    // 3️⃣ TEAM PAGE
    // -------------------------------------------
    if (activeMenu === "Team") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1>Team Members</h1>
          <p>Team functionality will go here…</p>
        </div>
      );
    }

    // -------------------------------------------
    // 4️⃣ MESSAGES PAGE
    // -------------------------------------------
    if (activeMenu === "Messages") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1>Messages</h1>
          <p>No messages yet.</p>
        </div>
      );
    }

    // -------------------------------------------
    // 5️⃣ ANALYTICS PAGE
    // -------------------------------------------
    if (activeMenu === "Analytics") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1>Analytics</h1>
          <p>No analytics data yet.</p>
        </div>
      );
    }

    // -------------------------------------------
    // 6️⃣ SETTINGS PAGE
    // -------------------------------------------
    if (activeMenu === "Settings") {
      return (
        <div style={{ padding: "30px", color: darkMode ? "#fff" : "#000" }}>
          <h1>Settings</h1>
          <p>User settings will go here.</p>
        </div>
      );
    }
  };

  // ============================================================
  // FINAL LAYOUT STRUCTURE (SIDEBAR + CONTENT SWITCHER)
  // ============================================================
  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: darkMode ? "#0a0f1e" : "#f8fafc"
    }}>
      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: darkMode ? "rgba(30,64,175,0.05)" : "#fff",
        borderRight: "1px solid rgba(59,130,246,0.1)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Logo */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "30px"
        }}>
          <div style={{
            width: "36px",
            height: "36px",
            background: "linear-gradient(135deg,#e74c8c,#a855f7)",
            borderRadius: "8px",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold"
          }}>Z</div>
          <h2 style={{
            background: "linear-gradient(135deg,#1e40af,#3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent"
          }}>Zidiotask</h2>
        </div>

        {/* Sidebar Buttons */}
        {[
          { icon: <Home size={20} />, label: "Home" },
          { icon: <LayoutGrid size={20} />, label: "Tasks" },
          { icon: <Users size={20} />, label: "Team" },
          { icon: <Mail size={20} />, label: "Messages" },
          { icon: <BarChart3 size={20} />, label: "Analytics" },
          { icon: <Settings size={20} />, label: "Settings" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => {
              setActiveMenu(item.label);
              setSelectedBoardId(null);
            }}
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              marginBottom: "6px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "none",
              background:
                activeMenu === item.label
                  ? "rgba(30,64,175,0.2)"
                  : "transparent",
              color:
                activeMenu === item.label
                  ? "#3b82f6"
                  : darkMode
                  ? "#94a3b8"
                  : "#64748b",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {item.icon}
            {item.label}
          </button>
        ))}

        <button
          onClick={logout}
          style={{
            marginTop: "20px",
            padding: "12px 16px",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "none",
            color: darkMode ? "#94a3b8" : "#64748b",
            cursor: "pointer",
          }}
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>{renderPage()}</div>
    </div>
  );
};

export default UserDashboardPage;
