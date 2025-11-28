// src/pages/dashboard/user/SettingsPage.jsx

import React, { useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import { Camera, Bell, Globe, Lock, User } from "lucide-react";

export default function SettingsPage() {
  const { darkMode, toggleDarkMode } = useTheme();

  const [profile, setProfile] = useState({
    name: "User Name",
    email: "user@example.com",
    avatar: "",
  });

  const [preferences, setPreferences] = useState({
    notifications: true,
    sound: true,
    language: "en",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  // Convert uploaded image → Base64
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const saveSettings = () => {
    alert("Settings saved successfully!");
    // you can store data in localStorage or backend later
  };

  return (
    <div
      style={{
        padding: "32px",
        minHeight: "100vh",
        background: darkMode ? "#0a0f1e" : "#f8fafc",
      }}
    >
      <h1 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Settings</h1>
      <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
        Manage your account preferences and appearance
      </p>

      {/* MAIN CONTENT */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          gap: 30,
          maxWidth: 700,
        }}
      >

        {/* APPEARANCE */}
        <section
          style={{
            background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
            padding: 30,
            borderRadius: 16,
            border: `1px solid ${
              darkMode ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <h3 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Appearance</h3>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            Customize how the dashboard looks
          </p>

          <button
            onClick={toggleDarkMode}
            style={{
              marginTop: 20,
              padding: "12px 20px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(135deg, #e74c8c 0%, #a855f7 100%)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Toggle Dark Mode
          </button>
        </section>

        {/* PROFILE SETTINGS */}
        <section
          style={{
            background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
            padding: 30,
            borderRadius: 16,
            border: `1px solid ${
              darkMode ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <h3 style={{ color: darkMode ? "#fff" : "#1e293b" }}>Profile</h3>

          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 15 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: profile.avatar ? `url(${profile.avatar})` : "#ccc",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            <label
              style={{
                padding: "10px 14px",
                background: darkMode ? "#1e293b" : "#eee",
                borderRadius: 8,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <Camera size={16} />
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {/* Name */}
          <div style={{ marginTop: 20 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>Name</label>
            <input
              value={profile.name}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, name: e.target.value }))
              }
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
                background: darkMode ? "rgba(255,255,255,0.08)" : "#fff",
                color: darkMode ? "#fff" : "#1e293b",
              }}
            />
          </div>

          {/* Email */}
          <div style={{ marginTop: 20 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>Email</label>
            <input
              value={profile.email}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, email: e.target.value }))
              }
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
                background: darkMode ? "rgba(255,255,255,0.08)" : "#fff",
                color: darkMode ? "#fff" : "#1e293b",
              }}
            />
          </div>
        </section>

        {/* PREFERENCES */}
        <section
          style={{
            background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
            padding: 30,
            borderRadius: 16,
            border: `1px solid ${
              darkMode ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <h3 style={{ color: darkMode ? "#fff" : "#1e293b" }}>
            Preferences
          </h3>

          {/* Notifications */}
          <div style={{ marginTop: 15, display: "flex", alignItems: "center", gap: 12 }}>
            <Bell size={18} />
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    notifications: !prev.notifications,
                  }))
                }
                style={{ marginRight: 8 }}
              />
              Enable Notifications
            </label>
          </div>

          {/* Sound */}
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 12 }}>
            <User size={18} />
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={preferences.sound}
                onChange={() =>
                  setPreferences((prev) => ({
                    ...prev,
                    sound: !prev.sound,
                  }))
                }
                style={{ marginRight: 8 }}
              />
              Enable Sound
            </label>
          </div>

          {/* Language */}
          <div style={{ marginTop: 20 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>
              Language
            </label>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
              <Globe size={20} />

              <select
                value={preferences.language}
                onChange={(e) =>
                  setPreferences((prev) => ({ ...prev, language: e.target.value }))
                }
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid #ccc",
                  background: darkMode ? "rgba(255,255,255,0.08)" : "#fff",
                  color: darkMode ? "#fff" : "#1e293b",
                }}
              >
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="te">Telugu</option>
                <option value="mr">Marathi</option>
              </select>
            </div>
          </div>
        </section>

        {/* PASSWORD */}
        <section
          style={{
            background: darkMode ? "rgba(255,255,255,0.05)" : "#fff",
            padding: 30,
            borderRadius: 16,
            border: `1px solid ${
              darkMode ? "rgba(59,130,246,0.2)" : "rgba(0,0,0,0.1)"
            }`,
          }}
        >
          <h3 style={{ color: darkMode ? "#fff" : "#1e293b" }}>
            Security
          </h3>
          <p style={{ color: darkMode ? "#94a3b8" : "#64748b" }}>
            Update your password
          </p>

          <div style={{ marginTop: 15 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>
              Current Password
            </label>
            <input
              type="password"
              value={passwords.current}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, current: e.target.value }))
              }
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginTop: 15 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>
              New Password
            </label>
            <input
              type="password"
              value={passwords.new}
              onChange={(e) =>
                setPasswords((prev) => ({ ...prev, new: e.target.value }))
              }
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginTop: 15 }}>
            <label style={{ color: darkMode ? "#fff" : "#1e293b" }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={passwords.confirm}
              onChange={(e) =>
                setPasswords((prev) => ({
                  ...prev,
                  confirm: e.target.value,
                }))
              }
              style={{
                width: "100%",
                padding: 12,
                marginTop: 6,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
          </div>
        </section>

        {/* SAVE BUTTON */}
        <button
          onClick={saveSettings}
          style={{
            padding: "14px 22px",
            borderRadius: 12,
            background: "linear-gradient(135deg,#e74c8c,#a855f7)",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            width: 220,
          }}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
