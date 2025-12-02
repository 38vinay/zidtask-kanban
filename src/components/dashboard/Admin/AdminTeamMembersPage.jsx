import React from "react";
import { boardService } from "../../../services/localDB";
import TeamMembers from "../Admin/AdminTeamMembers";
import { useTheme } from "../../../contexts/ThemeContext";

export default function TeamMembersPage() {
  const { darkMode } = useTheme();

  const boards = boardService.getAll();

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: darkMode ? "#0a0f1e" : "#f8fafc",
      }}
    >
      <h1 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Team Members</h1>

      <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
        Manage your team and assign members to boards.
      </p>

      <TeamMembers boards={boards} />
    </div>
  );
}