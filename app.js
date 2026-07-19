const STORAGE_KEY = 'tasks';
const TASK_TITLE_ERROR_MESSAGE = 'Escribe un título para la tarea.';

function loadTasks() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === null) {
    return [];
  }

  try {
    return JSON.parse(raw);
  } catch (error) {
    saveTasks([]);
    return [];
  }
}

function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

function isValidTitle(title) {
  return typeof title === 'string' && title.trim().length > 0;
}

function isValidDueDate(dueDate) {
  return typeof dueDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dueDate);
}

function formatDueDate(dueDate) {
  const [year, month, day] = dueDate.split('-');
  return day + '/' + month + '/' + year;
}

function createTask(title, dueDate) {
  if (!isValidTitle(title)) {
    return null;
  }
  const tasks = loadTasks();
  const task = {
    id: Date.now().toString(),
    title: title,
    completed: false,
    dueDate: isValidDueDate(dueDate) ? dueDate : ''
  };
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

let editingDraft = null;

function getEditingDraft() {
  return editingDraft;
}

function beginEditTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return null;
  }
  editingDraft = { id: task.id, title: task.title, dueDate: task.dueDate || '' };
  return editingDraft;
}

function cancelEditTask() {
  editingDraft = null;
}

function isValidEditableDueDate(dueDate) {
  return dueDate === '' || isValidDueDate(dueDate);
}

function updateTask(id, changes) {
  const title = changes ? changes.title : undefined;
  const dueDate = changes && typeof changes.dueDate === 'string' ? changes.dueDate : '';

  if (!isValidTitle(title) || !isValidEditableDueDate(dueDate)) {
    return null;
  }

  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return null;
  }

  task.title = title;
  task.dueDate = dueDate;
  saveTasks(tasks);
  return task;
}

function saveEditTask() {
  if (!editingDraft) {
    return null;
  }
  const updated = updateTask(editingDraft.id, {
    title: editingDraft.title,
    dueDate: editingDraft.dueDate
  });
  if (updated) {
    editingDraft = null;
  }
  return updated;
}

function renderReadRow(li, task, listElement) {
  const info = document.createElement('div');
  info.className = 'task-info';

  const titleSpan = document.createElement('span');
  titleSpan.textContent = task.title;
  info.appendChild(titleSpan);

  const dueDate = task.dueDate || '';
  if (dueDate) {
    const dueDateSpan = document.createElement('span');
    dueDateSpan.className = 'due-date';
    dueDateSpan.textContent = 'Fecha límite: ' + formatDueDate(dueDate);
    info.appendChild(dueDateSpan);
  }

  li.appendChild(info);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  if (!task.completed) {
    const completeButton = document.createElement('button');
    completeButton.type = 'button';
    completeButton.textContent = 'Completar';
    completeButton.addEventListener('click', () => {
      completeTask(task.id);
      renderTasks(listElement);
    });
    actions.appendChild(completeButton);
  }

  const editButton = document.createElement('button');
  editButton.type = 'button';
  editButton.textContent = 'Editar';
  editButton.dataset.editId = task.id;
  editButton.addEventListener('click', () => {
    beginEditTask(task.id);
    renderTasks(listElement);
  });
  actions.appendChild(editButton);

  li.appendChild(actions);
}

function renderEditRow(li, task, listElement) {
  li.classList.add('editing');

  const form = document.createElement('div');
  form.className = 'task-edit';

  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.value = editingDraft.title;
  titleInput.dataset.editTitle = task.id;
  titleInput.addEventListener('input', () => {
    editingDraft.title = titleInput.value;
  });
  form.appendChild(titleInput);

  const dueDateInput = document.createElement('input');
  dueDateInput.type = 'date';
  dueDateInput.value = editingDraft.dueDate;
  dueDateInput.dataset.editDueDate = task.id;
  dueDateInput.addEventListener('input', () => {
    editingDraft.dueDate = dueDateInput.value;
  });
  form.appendChild(dueDateInput);

  const errorMessage = document.createElement('p');
  errorMessage.className = 'error-message edit-error';
  errorMessage.hidden = true;
  form.appendChild(errorMessage);

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.textContent = 'Guardar';
  saveButton.dataset.saveId = task.id;
  saveButton.addEventListener('click', () => {
    const saved = saveEditTask();
    if (!saved) {
      errorMessage.textContent = 'Revisa el título y la fecha límite.';
      errorMessage.hidden = false;
      return;
    }
    renderTasks(listElement);
  });
  form.appendChild(saveButton);

  const cancelButton = document.createElement('button');
  cancelButton.type = 'button';
  cancelButton.textContent = 'Cancelar';
  cancelButton.dataset.cancelId = task.id;
  cancelButton.addEventListener('click', () => {
    cancelEditTask();
    renderTasks(listElement);
  });
  form.appendChild(cancelButton);

  li.appendChild(form);
}

function renderTasks(listElement) {
  const tasks = loadTasks();
  listElement.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    if (editingDraft && editingDraft.id === task.id) {
      renderEditRow(li, task, listElement);
    } else {
      renderReadRow(li, task, listElement);
    }

    listElement.appendChild(li);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const input = document.getElementById('task-title');
  const dueDateInput = document.getElementById('task-due-date');
  const list = document.getElementById('task-list');
  const errorMessage = document.getElementById('task-error');

  if (form && input && list) {
    renderTasks(list);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const created = createTask(input.value, dueDateInput ? dueDateInput.value : '');
      if (!created) {
        showTitleError(errorMessage);
        return;
      }
      hideTitleError(errorMessage);
      input.value = '';
      if (dueDateInput) {
        dueDateInput.value = '';
      }
      renderTasks(list);
    });
  }
});
