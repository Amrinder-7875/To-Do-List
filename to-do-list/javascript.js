document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskbar");
    const addButton = document.getElementById("addbutton");
    const todoList = document.getElementById("todolists");

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#todolists li").forEach(item => {
            const taskText = item.querySelector(".todo-discription").textContent;
            const completed = item.querySelector("input[type=checkbox]").checked;
            tasks.push({ text: taskText, completed });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to add a task to the DOM
    function addTaskToDOM(taskText, completed = false) {
        const listItem = document.createElement("li");
        const taskId = "todo-" + Date.now();
        listItem.innerHTML = `
            <input type="checkbox" id="${taskId}" ${completed ? "checked" : ""}>
            <label for="${taskId}" class="custom-checkbox">
                <svg fill="transparent" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M268-240 42-466l57-56 170 170 56 56-57 56Zm226 0L268-466l56-57 170 170 368-368 56 57-424 424Zm0-226-57-56 198-198 57 56-198 198Z" />
                </svg>
            </label>
            <label for="${taskId}" class="todo-discription">${taskText}</label>
            <button class="delete-button">
                <svg fill="darkblue" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                </svg>
            </button>
        `;

        todoList.appendChild(listItem);
        saveTasks();
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === "") return;
        addTaskToDOM(taskText);
        taskInput.value = "";
    }

    // Function to delete a task
    function deleteTask(event) {
        if (event.target.closest(".delete-button")) {
            event.target.closest("li").remove();
            saveTasks();
        }
    }

    // Function to update task completion status
    function toggleTaskCompletion() {
        saveTasks();
    }

    // Event listeners
    addButton.addEventListener("click", addTask);
    todoList.addEventListener("click", deleteTask);
    todoList.addEventListener("change", toggleTaskCompletion);

    // Load existing tasks
    loadTasks();
});
