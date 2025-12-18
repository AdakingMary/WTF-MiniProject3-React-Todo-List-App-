import { useState, useEffect } from "react";
import { getTasks, postTask, updateTask, deleteTask } from "./api/taskService";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || { name: "Guest" }
  );

  useEffect(() => {
    const loadTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    const newTask = await postTask(task);
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = async (task) => {
    await updateTask(task);
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser({ name: "Guest" });
  };

  return (
    <div className="container">
      <h2>Hello, {currentUser.name}! 😎</h2>
      <button onClick={logout} style={{ marginBottom: "1rem" }}>
        Logout
      </button>

      <TodoForm onAddTask={handleAddTask} />
      <TodoList
        tasks={tasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
