// src/components/board/Board.jsx

import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

const Board = ({ boardId, onBack }) => {
  const [board, setBoard] = useState(null);
  const [taskText, setTaskText] = useState("");

  // Load board
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("boards") || "[]");
    const found = saved.find((b) => b.id === boardId);
    setBoard(found);
  }, [boardId]);

  // Save board to localStorage
  const saveBoard = (updatedBoard) => {
    const boards = JSON.parse(localStorage.getItem("boards") || "[]");
    const updated = boards.map((b) =>
      b.id === updatedBoard.id ? updatedBoard : b
    );
    localStorage.setItem("boards", JSON.stringify(updated));
    setBoard(updatedBoard);
  };

  // Add task to a column
  const addTask = (columnId) => {
    if (taskText.trim() === "") return;

    const updated = { ...board };
    const column = updated.columns.find((c) => c.id === columnId);

    column.tasks.push({
      id: Date.now().toString(),
      title: taskText,
    });

    setTaskText("");
    saveBoard(updated);
  };

  // Handle drag & drop logic
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const updated = { ...board };

    const sourceCol = updated.columns.find((c) => c.id === source.droppableId);
    const destCol = updated.columns.find((c) => c.id === destination.droppableId);

    const [movedTask] = sourceCol.tasks.splice(source.index, 1);

    // Drop in same or different column
    destCol.tasks.splice(destination.index, 0, movedTask);

    saveBoard(updated);
  };

  if (!board) return <p>Loading board...</p>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Back Button */}
      <button
        onClick={onBack}
        style={{
          padding: "8px 15px",
          background: "#ddd",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: "20px" }}>{board.name}</h2>

      {/* Drag & Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {board.columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    width: "300px",
                    minHeight: "500px",
                    background: "#fff",
                    padding: "15px",
                    borderRadius: "10px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <h3>{col.name}</h3>

                  {/* Add task input */}
                  <div style={{ marginBottom: "12px" }}>
                    <input
                      type="text"
                      placeholder="New task"
                      value={taskText}
                      onChange={(e) => setTaskText(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        marginBottom: "6px",
                      }}
                    />
                    <button
                      onClick={() => addTask(col.id)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: "#3b82f6",
                        color: "#fff",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Add Task
                    </button>
                  </div>

                  {/* TASKS (DRAGGABLE) */}
                  {col.tasks.map((task, index) => (
                    <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          style={{
                            padding: "12px",
                            background: "#f3f4f6",
                            borderRadius: "8px",
                            marginBottom: "10px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                            ...provided.draggableProps.style,
                          }}
                        >
                          <p style={{ margin: 0, fontWeight: "500" }}>
                            {task.title}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
