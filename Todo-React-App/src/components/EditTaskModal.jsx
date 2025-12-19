import { useState } from "react";

export default function EditTaskModal({ open, task, onClose, onSave }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  if (!open) return null;

  const handleSave = () => {
    if (!title.trim()) return alert("Title required");

    onSave({
      ...task,
      title,
      description,
      dueDate,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Task</h3>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
