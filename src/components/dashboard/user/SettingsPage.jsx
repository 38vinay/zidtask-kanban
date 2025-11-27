import React from "react";
import { useTheme } from "../../../contexts/ThemeContext";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: darkMode ? "#0a0f1e" : "#f8fafc"
      }}
    >
      <h1 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Settings</h1>
      <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
        Manage your account preferences and appearance
      </p>

      <div
        style={{
          marginTop: 30,
          background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
          padding: 30,
          borderRadius: 16,
          border: `1px solid ${
            darkMode ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.1)"
          }`,
          maxWidth: 600
        }}
      >
        <h3 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Appearance</h3>

        <button
          onClick={toggleDarkMode}
          style={{
            marginTop: 20,
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            background:
              "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
}
