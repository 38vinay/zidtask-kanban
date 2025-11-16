// src/components/board/BoardList.jsx

import React, { useState, useEffect } from "react";

const BoardList = ({ onSelectBoard }) => {
  const [boards, setBoards] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [boardName, setBoardName] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("boards");
    if (saved) setBoards(JSON.parse(saved));
  }, []);

  const saveBoards = (list) => {
    setBoards(list);
    localStorage.setItem("boards", JSON.stringify(list));
  };

  const createBoard = () => {
    if (boardName.trim() === "") return;

    const newBoard = {
      id: Date.now().toString(),
      name: boardName,
      columns: [
        { id: "todo", name: "To Do", tasks: [] },
        { id: "progress", name: "In Progress", tasks: [] },
        { id: "done", name: "Done", tasks: [] }
      ]
    };

    const updated = [...boards, newBoard];
    saveBoards(updated);
    setBoardName("");
    setShowInput(false);
  };

  return (
    <div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Your Boards</h2>

      <div style={{ marginBottom: "20px" }}>
        {showInput ? (
          <div>
            <input
              type="text"
              placeholder="Board name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={createBoard}
              style={{
                marginLeft: "10px",
                padding: "10px 15px",
                background: "#3b82f6",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
              }}
            >
              Create
            </button>
            <button
              onClick={() => setShowInput(false)}
              style={{
                marginLeft: "8px",
                padding: "10px 15px",
                background: "gray",
                color: "#fff",
                borderRadius: "6px",
                border: "none",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            style={{
              padding: "12px 18px",
              background: "linear-gradient(135deg, #e74c8c, #a855f7)",
              color: "#fff",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            + Create New Board
          </button>
        )}
      </div>

      {/* Boards List */}
      {boards.length === 0 ? (
        <p>You have no boards yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {boards.map((b) => (
            <div
              key={b.id}
              onClick={() => onSelectBoard(b.id)}
              style={{
                padding: "16px",
                background: "#fff",
                borderRadius: "10px",
                border: "1px solid #e5e7eb",
                cursor: "pointer",
              }}
            >
              <h3>{b.name}</h3>
              <p style={{ fontSize: "12px", color: "#6b7280" }}>
                {b.columns.length} Columns
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BoardList;
