import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import ConfirmModal from "./components/ConfirmModal";
import "./index.css"; // Separate CSS file

export default function App() {
  // State for all tasks
  const [tasks, setTasks] = useState([]);
  // State to track filter: "all", "pending", "completed"
  const [filter, setFilter] = useState("all");
  // State to control delete confirmation modal
  const [showConfirm, setShowConfirm] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Load tasks and dark mode preference from localStorage on initial render
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);

    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  // Save tasks to localStorage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save dark mode preference to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  // Calculate progress percentage
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress =
    tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  // Function to add a new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  // Function to toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Function to request deletion (opens confirmation modal)
  const requestDelete = (task) => {
    setTaskToDelete(task);
    setShowConfirm(true);
  };

  // Function to confirm deletion
  const confirmDelete = () => {
    setTasks(tasks.filter((t) => t.id !== taskToDelete.id));
    setShowConfirm(false);
  };

  // Function to edit a task (title and due date)
  const editTask = (task) => {
    const newTitle = prompt("Edit task title:", task.title);
    if (!newTitle) return;

    const newDueDate = prompt(
      "Edit due date (YYYY-MM-DDTHH:MM):",
      task.dueDate || ""
    );

    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, title: newTitle, dueDate: newDueDate } : t
      )
    );
  };

  return (
    <div className={`container ${darkMode ? "dark" : "light"}`}>
      {/* App Title */}
      <h2>My Todo App</h2>

      {/* Dark / Light Mode Toggle */}
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>

      {/* Form to add new tasks */}
      <TodoForm onAdd={addTask} />

      {/* Filter buttons */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      {/* Progress bar */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p>{progress}% completed</p>

      {/* Todo list display */}
      <TodoList
        tasks={filteredTasks}
        onToggle={toggleTask}
        onDelete={requestDelete}
        onEdit={editTask}
      />

      {/* Delete confirmation modal */}
      <ConfirmModal
        show={showConfirm}
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
