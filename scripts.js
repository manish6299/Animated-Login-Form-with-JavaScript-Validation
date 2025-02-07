document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const pendingTasks = document.getElementById("pendingTasks");
    const completedTasks = document.getElementById("completedTasks");
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");
    const searchModal = document.getElementById("searchModal");
    const taskSound = document.getElementById("taskSound");
    const celebration = document.getElementById("celebration");
    const toggleThemeBtn = document.getElementById("toggleTheme");

    // Dark Mode 
    window.toggleTheme = function() {
        document.body.classList.toggle("dark-mode");
        const icon = toggleThemeBtn.querySelector("i");
        icon.classList.toggle("fa-moon");
        icon.classList.toggle("fa-sun");
    };

    // Add Task Function
    window.addTask = function() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;

        const now = new Date();
        const timeStamp = now.toLocaleString();

        const li = document.createElement("li");
        li.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-date">${timeStamp}</span>
            <button onclick="editTask(this)"><i class="fas fa-edit"></i></button>
            <button onclick="markComplete(this)"><i class="fas fa-check"></i></button>
            <button onclick="removeTask(this)"><i class="fas fa-trash"></i></button>
        `;
        pendingTasks.appendChild(li);
        taskInput.value = "";
        taskSound.play();
    };

    // Mark Task as Completed
    window.markComplete = function(button) {
        const li = button.parentElement;
        li.classList.add("completed");
        button.remove();
        completedTasks.appendChild(li);
        showCelebration();
    };

    // Edit Task
    window.editTask = function(button) {
        const li = button.parentElement;
        const taskText = li.querySelector(".task-text").textContent;
        const newTaskText = prompt("Edit your task:", taskText);
        if (newTaskText) {
            li.querySelector(".task-text").textContent = newTaskText;
            taskSound.play();
        }
    };

    // Remove Task
    window.removeTask = function(button) {
        button.parentElement.remove();
    };

    // Show Celebration Message
    function showCelebration() {
        celebration.style.display = "block";
        setTimeout(() => {
            celebration.style.display = "none";
        }, 2000);
    }

    // Open Search Modal
    window.openSearchPopup = function() {
        searchModal.style.display = "block";
        searchInput.focus();
    };

    // Close Search Modal
    window.closeSearchPopup = function() {
        searchModal.style.display = "none";
        searchResults.innerHTML = "";
    };

    // Search Task Function
    window.searchTask = function() {
        const filter = searchInput.value.toLowerCase();
        searchResults.innerHTML = "";
        
        document.querySelectorAll("#pendingTasks li, #completedTasks li").forEach(task => {
            if (task.textContent.toLowerCase().includes(filter)) {
                const clone = task.cloneNode(true);
                searchResults.appendChild(clone);
            }
        });
    };

    // Add Task on Enter Key
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && document.activeElement === taskInput) {
            addTask();
        }
    });
});
