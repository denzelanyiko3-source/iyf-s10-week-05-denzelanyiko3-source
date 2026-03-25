// DOM Elements
const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const list = document.getElementById("todo-list");
const filters = document.querySelectorAll(".filter");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");

// Add Task
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  addTask(text);
  input.value = "";
  updateCount();
});

// Create Task
function addTask(text) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  // Toggle Complete
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateCount();
  });

  // Delete Button
  const btn = document.createElement("button");
  btn.textContent = "X";
  btn.classList.add("delete");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    updateCount();
  });

  // Edit Task (Double Click)
  span.addEventListener("dblclick", () => {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = span.textContent;

    li.innerHTML = "";
    li.appendChild(editInput);
    editInput.focus();

    // Save edit
    editInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const newText = editInput.value.trim();
        if (newText !== "") {
          li.innerHTML = "";
          span.textContent = newText;
          li.appendChild(span);
          li.appendChild(btn);
        }
      }

      // Cancel edit
      if (e.key === "Escape") {
        li.innerHTML = "";
        li.appendChild(span);
        li.appendChild(btn);
      }
    });
  });

  li.appendChild(span);
  li.appendChild(btn);
  list.appendChild(li);
}

// Filters
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.filter;

    document.querySelectorAll("#todo-list li").forEach((li) => {
      switch (type) {
        case "all":
          li.style.display = "flex";
          break;
        case "active":
          li.style.display = li.classList.contains("completed")
            ? "none"
            : "flex";
          break;
        case "completed":
          li.style.display = li.classList.contains("completed")
            ? "flex"
            : "none";
          break;
      }
    });
  });
});

// Update Remaining Count
function updateCount() {
  const remaining = document.querySelectorAll(
    "#todo-list li:not(.completed)"
  ).length;

  itemsLeft.textContent = `${remaining} item${
    remaining !== 1 ? "s" : ""
  } left`;
}

// Clear Completed
clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll("#todo-list .completed").forEach((task) => {
    task.remove();
  });
  updateCount();
});