export default function TodoList({ tasks, onUpdate, onDelete }) {
  const now = new Date();

  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {tasks.map((task) => {
        let style = {};
        if (task.completed)
          style = { textDecoration: "line-through", color: "gray" };
        else if (task.dueDate && new Date(task.dueDate) < now)
          style = { color: "red" };

        return (
          <li key={task.id} style={{ marginBottom: "1rem" }}>
            <strong style={style}>{task.title}</strong> - {task.description}
            <br />
            Due: {task.dueDate || "No due date"}
            <br />
            <button
              onClick={() => onUpdate({ ...task, completed: !task.completed })}
              style={{ marginRight: "0.5rem" }}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
            <button
              onClick={() => {
                const title = prompt("Edit Title", task.title);
                if (!title) return;
                const description = prompt(
                  "Edit Description",
                  task.description || ""
                );
                const dueDate = prompt(
                  "Edit Due Date (YYYY-MM-DDTHH:MM)",
                  task.dueDate || ""
                );
                onUpdate({ ...task, title, description, dueDate });
              }}
              style={{ marginRight: "0.5rem" }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm("Delete task?")) onDelete(task.id);
              }}
            >
              Delete
            </button>
            <hr />
          </li>
        );
      })}
    </ul>
  );
}
