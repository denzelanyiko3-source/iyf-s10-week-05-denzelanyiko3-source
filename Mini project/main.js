// DOM elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");
const totalCount = document.getElementById("totalCount");
const activeCount = document.getElementById("activeCount");
const completedCount = document.getElementById("completedCount");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");
const emptyState = document.getElementById("emptyState");

let currentFilter = "all";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  addTask(text);
  input.value = "";
  updateUI();
});

function addTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateUI();
  });

  const btn = document.createElement("button");
  btn.textContent = "✕";
  btn.classList.add("delete");
  btn.setAttribute("aria-label", `Delete ${text}`);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateUI();
  });

  span.addEventListener("dblclick", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;

    li.innerHTML = "";
    li.appendChild(editInput);
    editInput.focus();

    const restoreTask = (newText = span.textContent) => {
      li.innerHTML = "";
      span.textContent = newText;
      btn.setAttribute("aria-label", `Delete ${newText}`);
      li.appendChild(span);
      li.appendChild(btn);
    };

    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newText = editInput.value.trim();
        restoreTask(newText || span.textContent);
      }

      if (e.key === "Escape") {
        restoreTask();
      }
    });

    editInput.addEventListener("blur", () => {
      const newText = editInput.value.trim();
      restoreTask(newText || span.textContent);
    });
  });

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
}

function applyFilter() {
  document.querySelectorAll("#todo-list li").forEach((li) => {
    switch (currentFilter) {
      case "active":
        li.style.display = li.classList.contains("completed") ? "none" : "flex";
        break;
      case "completed":
        li.style.display = li.classList.contains("completed") ? "flex" : "none";
        break;
      default:
        li.style.display = "flex";
    }
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filters.forEach((filterBtn) => filterBtn.classList.remove("active"));
    button.classList.add("active");

    applyFilter();
  });
});

function updateUI() {
  const allTasks = document.querySelectorAll("#todo-list li");
  const completedTasks = document.querySelectorAll("#todo-list li.completed");
  const activeTasks = allTasks.length - completedTasks.length;

  totalCount.textContent = allTasks.length;
  activeCount.textContent = activeTasks;
  completedCount.textContent = completedTasks.length;

  emptyState.classList.toggle("show", allTasks.length === 0);
  clearCompletedBtn.disabled = completedTasks.length === 0;

  applyFilter();
}

clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll("#todo-list li.completed").forEach((task) => {
    task.remove();
  });

  updateUI();
});

updateUI();