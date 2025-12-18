let tasks = [];

let activeAddBtn = null;

renderTasks();

document.addEventListener("click", (e) => {
  const addBtn = e.target.closest(".add");
  if (addBtn) {
    handleAdd(addBtn);
    return;
  }

  const deleteBtn = e.target.closest("#delete");
  if (deleteBtn) {
    deleteTask(deleteBtn.closest('#task').dataset.id);
    return;
  }

  const editBtn = e.target.closest("#edit");
  if (deleteBtn) {
    deleteTask(deleteBtn.closest("#task").dataset.id);
    return;
  }
});

function handleAdd(addBtn) {
  if (!activeAddBtn) {
    activeAddBtn = addBtn;

    document.querySelectorAll(".add").forEach((b) => {
      b.disabled = true;
    });

    addBtn.disabled = false;
    addBtn.textContent = "Submit";

    renderEdit(addBtn.dataset.column);
  } else {
    submitTask(addBtn.dataset.column);
    exitAddMode();
  }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id)
    renderTasks(tasks);
}

function exitAddMode() {
  document.querySelectorAll(".add").forEach((b) => {
    b.disabled = false;
    b.textContent = "Add New +";
  });

  activeAddBtn = null;
}

function submitTask(column) {
  const newTask = {
    id: crypto.randomUUID().slice(0, 8),
    taskName: document.getElementById("input-name").value,
    taskDesc: document.getElementById("input-desc").value,
    category: column,
    editable: false,
  };
  tasks.push(newTask);

  renderTasks();
}

function renderTasks() {
  document.querySelectorAll(".list").forEach((list) => {
    list.innerHTML = ``;
  });

  tasks.forEach((task) => buildTaskDiv(task));
}

function buildTaskDiv(task) {
  const taskDiv = document.createElement("div");
  taskDiv.id = "task";
  taskDiv.dataset.id = task.id;

  const taskName = document.createElement("p");
  taskName.id = "task-name";
  taskName.textContent = task.taskName;

  const taskDesc = document.createElement("p");
  taskDesc.id = "task-desc";
  taskDesc.textContent = task.taskDesc;

  const taskButtons = document.createElement("div");
  taskButtons.id = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>`;
  editBtn.id = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="CurrentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
  deleteBtn.id = "delete";

  taskButtons.appendChild(editBtn);
  taskButtons.appendChild(deleteBtn);

  taskDiv.appendChild(taskName);
  taskDiv.appendChild(taskDesc);
  taskDiv.appendChild(taskButtons);

  document.getElementById(`${task.category}-list`).appendChild(taskDiv);
}

function renderEdit(column) {
  const list = document.getElementById(`${column}-list`);
  const taskDiv = document.createElement("div");
  taskDiv.id = "input";
  taskDiv.dataset.column = column;
  const taskNameField = document.createElement("input");
  taskNameField.type = "text";
  taskNameField.id = "input-name";
  taskNameField.placeholder = "Enter Task Name";

  const taskDescField = document.createElement("input");
  taskDescField.type = "text";
  taskDescField.id = "input-desc";
  taskDescField.placeholder = "Enter Task Description";

  taskDiv.appendChild(taskNameField);
  taskDiv.appendChild(taskDescField);

  list.appendChild(taskDiv);
}

