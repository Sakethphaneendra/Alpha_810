const text = document.getElementById("InputBox");
const list = document.getElementById("TaskList");

const API = "http://localhost:5000";


// LOAD TASKS
async function loadTasks() {

    const response = await fetch(`${API}/tasks`);

    const tasks = await response.json();

    list.innerHTML = "";

    tasks.reverse().forEach(task => {

        const li = createTaskElement(task);

        list.appendChild(li);
    });
}


// CREATE TASK ELEMENT
function createTaskElement(task) {

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task.text}</span>

        <button class="delete-btn">
            Delete
        </button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.onclick = async () => {

        await fetch(`${API}/tasks/${task._id}`, {
            method: "DELETE"
        });

        loadTasks();
    };

    return li;
}


// ADD TASK
async function action() {

    const value = text.value.trim();

    if(value === "") return;

    await fetch(`${API}/tasks`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            text: value
        })
    });

    text.value = "";

    loadTasks();
}


text.addEventListener("keypress", (e) => {

    if(e.key === "Enter") {
        action();
    }
});

loadTasks();