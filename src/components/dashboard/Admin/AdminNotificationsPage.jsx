import React, { useEffect, useState } from "react";
import { Bell, Trash2, Check } from "lucide-react";
import { notificationService } from "../../../services/notificationService";
import { useTheme } from "../../../contexts/ThemeContext";

export default function NotificationsPage() {
  const { darkMode } = useTheme();
  const [notifications, setNotifications] = useState([]);

  const load = () => {
    setNotifications(notificationService.getAll());
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = (id) => {
    notificationService.markRead(id);
    load();
  };

  const deleteNote = (id) => {
    notificationService.delete(id);
    load();
  };

  return (
    <div style={{
      padding: "32px",
      minHeight: "100vh",
      background: darkMode ? "#0a0f1e" : "#f8fafc"
    }}>
      <h1 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Notifications</h1>

      <div style={{
        marginTop: "20px",
        background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
        padding: "20px",
        borderRadius: "16px",
        border: `1px solid ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }}>
        {notifications.length === 0 && (
          <div style={{ textAlign: "center", opacity: 0.6, padding: "40px" }}>
            <Bell size={50} />
            <p>No notifications</p>
          </div>
        )}

        {notifications.map(n => (
          <div key={n.id} style={{
            padding: "16px",
            borderRadius: "12px",
            background: n.read 
              ? (darkMode ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)")
              : "linear-gradient(135deg,#e74c8c33,#a855f733)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div>
              <h3 style={{ margin: 0, color: darkMode ? "#fff" : "#1e293b" }}>{n.title}</h3>
              <p style={{ margin: "6px 0 0", opacity: 0.8 }}>{n.message}</p>
              <span style={{ fontSize: "12px", opacity: 0.5 }}>{n.time}</span>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    border: "none",
                    background: "#10b981",
                    color: "#fff",
                    cursor: "pointer"
                  }}
                >
                  <Check size={18} />
                </button>
              )}

              <button
                onClick={() => deleteNote(n.id)}
                style={{
                  padding: "8px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#ef4444",
                  color: "#fff",
                  cursor: "pointer"
                }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
