// Practice: Select these elements
// 1. The h1 element
const h1Element = document.querySelector("h1");
// 2. All elements with class "content"
const contentElements = document.querySelectorAll(".content");

// 3. The form with id "contact-form"
const contactForm = document.getElementById("contact-form");

// 5. All list items in the nav
const navItems = document.querySelectorAll("nav li");
// 6. The first .nav-link
const firstNavLink = document.querySelector(".nav-link");
// 7. The last paragraph
const lastParagraph = document.querySelector("p:last-of-type");

console.log("h1Element:", h1Element);
console.log("contentElements:", contentElements);
console.log("contactForm:", contactForm);
console.log("navItems:", navItems);
console.log("firstNavLink:", firstNavLink);
console.log("lastParagraph:", lastParagraph);






const navItem = document.querySelector(".nav-link").parentElement;
const clone = navItem.cloneNode(true);  // true = deep clone
clone.querySelector("a").textContent = "New Link";
document.querySelector(".nav-list").appendChild(clone);

console.log("Cloned nav item added to nav list.");




// Create a function that adds a new nav item dynamically. It should take the link text and URL as parameters, create the necessary elements, and add it to the nav list.
function addNavItem(text, href) {
    // Create li with a.nav-link inside
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "nav-link";
    a.href = href;
    a.textContent = text;
    li.appendChild(a);
     // Add the link to the list item
    document.querySelector(".nav-list").appendChild(li); 
}  

// Add the list item to the nav list
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");

console.log("New nav items added.");
console.log("Current nav items:", document.querySelectorAll(".nav-list li"));
console.log("Current nav links:", document.querySelectorAll(".nav-list li a"));
console.log("Current nav link texts:", Array.from(document.querySelectorAll(".nav-list li a")).map(a => a.textContent));
console.log("Current nav link hrefs:", Array.from(document.querySelectorAll(".nav-list li a")).map(a => a.href));
console.log("Current nav link classes:", Array.from(document.querySelectorAll(".nav-list li a")).map(a => a.className));
console.log("Current nav link parent elements:", Array.from(document.querySelectorAll(".nav-list li a")).map(a => a.parentElement));
console.log("Current nav link parent element tags:", Array.from(document.querySelectorAll(".nav-list li a")).map(a => a.parentElement.tagName));
//Build
// Create a counter display and buttons
const counterDisplay = document.createElement("div");
counterDisplay.id = "counter";
counterDisplay.textContent = "Count: 0";
// + button increases count
const incrementButton = document.createElement("button");
incrementButton.textContent = "+";
// - button decreases count
const decrementButton = document.createElement("button");
decrementButton.textContent = "-";
// Reset button sets to 0 
const resetButton = document.createElement("button");
resetButton.textContent = "Reset";
// Count cannot go below 0
let count = 0;
function updateDisplay() {
    counterDisplay.textContent = `Count: ${count}`;
}
incrementButton.addEventListener("click", () => {
    count++;
    updateDisplay();
});
decrementButton.addEventListener("click", () => {
    if (count > 0) {
        count--;
        updateDisplay();
    }
});
resetButton.addEventListener("click", () => {
    count = 0;
    updateDisplay();
});

// Keyboard shortcuts
// Ctrl+S: Show "Saved!" alert (prevent actual save dialog)
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        alert("Saved!");
    }
});

// Escape: Clear all form inputs
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        const formInputs = document.querySelectorAll("input, textarea");
        formInputs.forEach((input) => {
            input.value = "";
        });
    }
});


// Ctrl+Enter: Submit form
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        const form = document.querySelector("form");
        form.submit();
    }
});


//Delegated Task List Create a task list where:
// Clicking a task toggles "completed" class

// Clicking a delete button removes the item,
// New tasks can be added dynamically,
// Use ONE event listener on the parent ul
const taskList = document.createElement("ul");
taskList.id = "task-list";
document.body.appendChild(taskList);
function addTask(text) {
    const li = document.createElement("li");
    li.textContent = text;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}
taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.parentElement.remove();
    } else if (e.target.tagName === "LI") {
        e.target.classList.toggle("completed");
    }

});
addTask("Buy groceries");
addTask("Walk the dog");
addTask("Read a book");



const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

// Real-time validation
nameInput.addEventListener("input", function(event) {
    const value = event.target.value;
    
    if (value.length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", function(event) {
    const value = event.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(value)) {
        showError(emailInput, "Please enter a valid email");
    } else {
        clearError(emailInput);
    }
});

// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();  
    // Stop form from submitting and refreshing the page
    // Get all form data

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log("Form data:", data);
    
    // Validate all fields
    if (isValid(data)) {
        // Submit via fetch or show success
        fetch("/submit-form", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(result => {
            showSuccess("Form submitted successfully!");
            form.reset();
        })
        .catch(error => {
            console.error("Error submitting form:", error);
        });
    }
});

function showError(input, message) {
    // Add error styling and message
    input.classList.add("error");
    // Create or update error message element
    const errorMessage = document.createElement("span");
    errorMessage.className = "error-message";
    errorMessage.textContent = message;
    input.parentNode.appendChild(errorMessage);

}

function clearError(input) {
    input.classList.remove("error");
    // Remove error message

    const errorMessage = input.parentNode.querySelector(".error-message");
    if (errorMessage) {
        errorMessage.remove();
    }  

}
