// src/components/dashboard/user/TeamMembers.jsx

import React, { useState, useEffect } from "react";
import {
  Users,
  Mail,
  MoreVertical,
  Edit2,
  Trash2,
  UserPlus,
  Search,
  Upload,
  Camera,
  Power,
} from "lucide-react";

import { useTheme } from "../../../contexts/ThemeContext";
import { teamService } from "../../../services/teamService";
import { getInitials, getColorFromString } from "../../../Utils/helpers";
import { v4 as uuid } from "uuid";

// Role Colors
const roleColors = {
  admin: "#ef4444", // red
  manager: "#3b82f6", // blue
  employee: "#6b7280", // gray
};

export default function TeamMembers({ isRestricted = false }) {
  const { darkMode } = useTheme();

  const [teamMembers, setTeamMembers] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showMenu, setShowMenu] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    role: "employee",
    status: "online",
    avatar: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    setTeamMembers(teamService.getAll());
  }, []);

  // Open Add Modal
  const openAddModal = () => {
    setEditingMember(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (member) => {
    setEditingMember(member);
    setForm({
      name: member.name,
      email: member.email,
      role: member.role,
      status: member.status,
      avatar: member.avatar || "",
    });
    setShowModal(true);
  };

  // Save (Add + Edit)
  const handleSave = () => {
    if (!form.name || !form.email) {
      alert("Please enter name and email");
      return;
    }

    if (editingMember) {
      teamService.update(editingMember.id, form);
    } else {
      teamService.add({
        id: uuid(),
        ...form,
      });
    }

    setTeamMembers(teamService.getAll());
    setShowModal(false);
  };

  // Delete Member
  const handleDelete = (id) => {
    if (confirm("Remove this member?")) {
      teamService.remove(id);
      setTeamMembers(teamService.getAll());
      setShowMenu(null);
    }
  };

  // Convert Image → Base64
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({ ...form, avatar: reader.result });
    };

    reader.readAsDataURL(file);
  };

  // Filter Members
  const filteredMembers = teamMembers.filter((m) => {
    const query = searchQuery.toLowerCase();
    const matchSearch =
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.role.toLowerCase().includes(query);

    const matchRole = filterRole === "all" ? true : m.role === filterRole;

    return matchSearch && matchRole;
  });

  return (
    <div
      style={{
        background: darkMode ? "rgba(30, 64, 175, 0.1)" : "#fff",
        padding: "24px",
        borderRadius: "16px",
      }}
    >
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 style={{ margin: 0, color: darkMode ? "#fff" : "#1e293b" }}>
            Team Members
          </h3>

          <p
            style={{ margin: 0, color: darkMode ? "#94a3b8" : "#64748b" }}
          >
            {filteredMembers.length} members
          </p>
        </div>

        {!isRestricted && (
          <button
            onClick={openAddModal}
            style={{
              padding: "10px 16px",
              background: "linear-gradient(135deg, #e74c8c, #a855f7)",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <UserPlus size={16} /> Add Member
          </button>
        )}
      </div>

      {/* SEARCH + FILTER */}
      <div style={{ display: "flex", gap: "12px", margin: "20px 0" }}>
        {/* SEARCH */}
        <div style={{ position: "relative", flex: 1 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
            }}
          />
          <input
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px 10px 36px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* FILTER */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>
      </div>

      {/* MEMBERS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: "16px",
        }}
      >
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            style={{
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              background: darkMode ? "rgba(255,255,255,0.05)" : "#f8fafc",
            }}
          >
            {/* ROW */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {/* AVATAR */}
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: member.avatar
                    ? `url(${member.avatar}) center/cover`
                    : getColorFromString(member.name),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                {!member.avatar && getInitials(member.name)}
              </div>

              {/* INFO */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: darkMode ? "#fff" : "#1e293b",
                  }}
                >
                  {member.name}
                </div>

                {/* ROLE BADGE */}
                <div
                  style={{
                    fontSize: "12px",
                    padding: "2px 8px",
                    borderRadius: "6px",
                    display: "inline-block",
                    marginTop: "4px",
                    background: roleColors[member.role],
                    color: "#fff",
                  }}
                >
                  {member.role}
                </div>

                {/* STATUS */}
                <div
                  style={{
                    marginTop: "4px",
                    fontSize: "12px",
                    color:
                      member.status === "online" ? "#10b981" : "#ef4444",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <Power size={12} /> {member.status}
                </div>
              </div>

              {/* MENU */}
              <div style={{ position: "relative" }}>
                {!isRestricted && (
                  <button
                    onClick={() =>
                      setShowMenu(showMenu === member.id ? null : member.id)
                    }
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                )}

                {showMenu === member.id && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "28px",
                      background: darkMode ? "#1e293b" : "#fff",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      width: "140px",
                      zIndex: 20,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => openEditModal(member)}
                      style={{
                        padding: "10px 14px",
                        width: "100%",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Edit2 size={14} /> Edit
                    </button>

                    <button
                      onClick={() => handleDelete(member.id)}
                      style={{
                        padding: "10px 14px",
                        width: "100%",
                        display: "flex",
                        gap: "8px",
                        alignItems: "center",
                        color: "#ef4444",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* EMAIL */}
            <div
              style={{
                marginTop: "10px",
                fontSize: "13px",
                color: darkMode ? "#94a3b8" : "#64748b",
              }}
            >
              <Mail size={14} /> {member.email}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (ADD / EDIT) */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            animation: "fadeIn 0.3s ease",
            zIndex: 2000,
          }}
        >
          <div
            style={{
              width: "420px",
              background: darkMode ? "#1e293b" : "#fff",
              borderRadius: "16px",
              padding: "28px",
              animation: "slideUp 0.3s ease",
            }}
          >
            <h2
              style={{
                marginBottom: "16px",
                color: darkMode ? "#fff" : "#1e293b",
              }}
            >
              {editingMember ? "Edit Member" : "Add Member"}
            </h2>

            {/* IMAGE UPLOAD */}
            <label
              style={{
                display: "block",
                marginBottom: "4px",
                fontWeight: 500,
              }}
            >
              Profile Photo
            </label>

            <div
              style={{
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "14px",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: form.avatar
                    ? `url(${form.avatar}) center/cover`
                    : "#ccc",
                }}
              />

              <label
                style={{
                  padding: "8px 14px",
                  background: "#ddd",
                  borderRadius: "8px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <Camera size={16} /> Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* NAME */}
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            {/* EMAIL */}
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            {/* ROLE */}
            <label>Role</label>
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "16px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>

            {/* STATUS */}
            <label>Status</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            >
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select>

            {/* SAVE BUTTON */}
            <button
              onClick={handleSave}
              style={{
                width: "100%",
                padding: "12px",
                background: "linear-gradient(135deg,#e74c8c,#a855f7)",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            >
              Save
            </button>

            {/* CANCEL */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#ddd",
                borderRadius: "8px",
                cursor: "pointer",
                border: "none",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0 }
            to { opacity: 1 }
          }
          @keyframes slideUp {
            from { transform: translateY(40px); opacity: 0 }
            to { transform: translateY(0); opacity: 1 }
          }
        `}
      </style>
    </div>
  );
}
