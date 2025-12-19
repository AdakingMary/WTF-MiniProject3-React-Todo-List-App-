import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title) return alert("Title required");

    onAdd({ title, dueDate });
    setTitle("");
    setDueDate("");
  };

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button>Add Task</button>
    </form>
  );
}
