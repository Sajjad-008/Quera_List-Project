const KEY = "tasks";

export function getTasks() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}

// C
export function addTask({ title, desc = "", priority }) {
  const newTask = {
    id: crypto.randomUUID(),
    title,
    desc,
    priority,
    done: false,
    createdAt: new Date().toISOString(),
  };
  saveTasks([...getTasks(), newTask]);
  return newTask;
}

// U
export function updateTask(id, changes) {
  let updated = null;
  const tasks = getTasks().map((task) => {
    if (task.id !== id) return task;
    updated = { ...task, ...changes, id };
    return updated;
  });
  saveTasks(tasks);
  return updated;
}

export function setTaskDone(id, done) {
  return updateTask(id, { done });
}

// D
export function deleteTask(id) {
  const tasks = getTasks();
  const remaining = tasks.filter((task) => task.id !== id);
  saveTasks(remaining);
  return remaining.length !== tasks.length;
}
