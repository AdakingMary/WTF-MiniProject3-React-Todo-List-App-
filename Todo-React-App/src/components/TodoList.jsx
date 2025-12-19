export default function TodoList({ tasks, onToggle, onDelete, onEdit }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "",
            }}
          >
            {task.title} {task.dueDate && `(${task.dueDate})`}
          </span>

          <button onClick={() => onToggle(task.id)}>
            {task.completed ? "Undo" : "Done"}
          </button>

          <button onClick={() => onEdit(task)}>Edit</button>

          <button onClick={() => onDelete(task)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
