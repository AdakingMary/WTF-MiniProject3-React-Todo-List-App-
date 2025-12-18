const STORAGE_KEY = "tasks";

const getStoredTasks = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveTasks = (tasks) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));

export const getTasks = async () => getStoredTasks();

export const postTask = async (task) => {
  const tasks = getStoredTasks();
  const newTask = { ...task, id: Date.now() };
  tasks.push(newTask);
  saveTasks(tasks);
  return newTask;
};

export const updateTask = async (updatedTask) => {
  const tasks = getStoredTasks().map((t) =>
    t.id === updatedTask.id ? updatedTask : t
  );
  saveTasks(tasks);
  return updatedTask;
};

export const deleteTask = async (id) => {
  const tasks = getStoredTasks().filter((t) => t.id !== id);
  saveTasks(tasks);
};
