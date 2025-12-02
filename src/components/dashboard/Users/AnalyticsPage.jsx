import React from "react";
import ActivityChart from "./ActivityChart";
import { useTheme } from "../../../contexts/ThemeContext";

export default function AnalyticsPage() {
  const { darkMode } = useTheme();

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: darkMode ? "#0a0f1e" : "#f8fafc"
      }}
    >
      <h1 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Analytics</h1>
      <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
        Track your task trends and activity
      </p>

      <ActivityChart stats={{ totalTasks: 30, completed: 12 }} />
    </div>
  );
}
