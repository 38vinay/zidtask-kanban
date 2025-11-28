import React, { useState } from "react";
import { X, Calendar, AlertCircle, Tag, Users, FilePlus } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { PRIORITY_LEVELS } from "../../Utils/constants";

export default function CreateTaskModal({ columnId, onClose, onSubmit }) {
  const { darkMode } = useTheme();
  const { user } = useAuth();

  // Task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");

  const handleCreate = () => {
    if (!title.trim()) return;

    const newTask = {
      title,
      description,
      priority,
      dueDate,
      assignees: [user],
      comments: [],
      attachments: [],
      checklist: [],
    };

    onSubmit(columnId, newTask);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "550px",
          background: darkMode ? "#1e293b" : "#fff",
          borderRadius: "16px",
          padding: "28px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              color: darkMode ? "#fff" : "#1e293b",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            Create New Task
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: darkMode ? "#94a3b8" : "#64748b",
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Title */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: darkMode ? "#fff" : "#1e293b", fontSize: 14 }}>
            Task Title *
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title..."
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 6,
              background: darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
              color: darkMode ? "#fff" : "#1e293b",
              borderRadius: 8,
              border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`,
              outline: "none",
            }}
          />
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ color: darkMode ? "#fff" : "#1e293b", fontSize: 14 }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add description..."
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 6,
              minHeight: 80,
              background: darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
              color: darkMode ? "#fff" : "#1e293b",
              borderRadius: 8,
              border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`,
              outline: "none",
              resize: "vertical",
            }}
          />
        </div>

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: 6,
            background: darkMode ? "#0f172a" : "#f3f4f6",
            borderRadius: 8,
            color: darkMode ? "#fff" : "#1e293b",
            border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`,
            outline: "none",
          }}
        >
          {PRIORITY_LEVELS.map((p) => (
            <option
              key={p.value}
              value={p.value}
              style={{
                color: "#1e293b",
                background: "#fff",
              }}
            >
              {p.label}
            </option>
          ))}
        </select>

        {/* Due Date */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ color: darkMode ? "#fff" : "#1e293b", fontSize: 14 }}>
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: 6,
              background: darkMode ? "rgba(255,255,255,0.05)" : "#f3f4f6",
              borderRadius: 8,
              color: darkMode ? "#fff" : "#1e293b",
              border: `1px solid ${darkMode ? "#334155" : "#cbd5e1"}`,
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              background: darkMode ? "rgba(255,255,255,0.05)" : "#e2e8f0",
              border: "none",
              borderRadius: 8,
              color: darkMode ? "#94a3b8" : "#475569",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            style={{
              padding: "10px 20px",
              background: "linear-gradient(135deg, #e74c8c, #a855f7)",
              border: "none",
              borderRadius: 8,
              color: "#fff",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}
