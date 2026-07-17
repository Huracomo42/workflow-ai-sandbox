const STORAGE_KEY = 'tasks';
const TASK_TITLE_ERROR_MESSAGE = 'Escribe un título para la tarea.';

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function createTask(title) {
  if (!isValidTitle(title)) {
    return null;
  }
  const tasks = loadTasks();
  const task = { id: Date.now().toString(), title: title, completed: false };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

function showTitleError(el) {
  if (!el) return;
  el.textContent = TASK_TITLE_ERROR_MESSAGE;
  el.hidden = false;
}

function hideTitleError(el) {
  if (!el) return;
  el.hidden = true;
}

function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = true;
    saveTasks(tasks);
  }
  return task;
}

function renderTasks(listElement) {
  const tasks = loadTasks();
  listElement.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.className = task.completed ? 'completed' : '';

    if (!task.completed) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = 'Completar';
      button.addEventListener('click', () => {
        completeTask(task.id);
        renderTasks(listElement);
      });
      li.appendChild(button);
    }

    listElement.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-title');
  const list = document.getElementById('task-list');
  const errorMessage = document.getElementById('task-error');

  if (form && input && list) {
    renderTasks(list);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const created = createTask(input.value);
      if (!created) {
        showTitleError(errorMessage);
        return;
      }
      hideTitleError(errorMessage);
      input.value = '';
      renderTasks(list);
    });
  }
});
