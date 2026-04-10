class Task {
    constructor(taskName, description, dueDate) {
        this.taskName = taskName
        this.description = description
        this.dueDate = dueDate
    }
}

let taskForm = document.getElementById("taskForm")

if (taskForm) {
    taskForm.addEventListener("submit", createTask)
}

function createTask(e) {
    e.preventDefault()
    let taskName = document.getElementById("taskName").value
    let description = document.getElementById("description").value
    let dueDate = document.getElementById("dueDate").value

    const task = new Task(taskName, description, dueDate)

    console.log(task)
}