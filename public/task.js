class Task {
    constructor(taskName, taskDescription, dueDay, dueMonth, dueYear, userID) {
        this.taskName = taskName
        this.taskDescription = taskDescription
        this.dueDay = dueDay
        this.dueMonth = dueMonth
        this.dueYear = dueYear
        this.userID = userID
    }
}

let taskForm = document.getElementById("taskForm")

let taskList = document.getElementById("taskList")

let deleteForm = document.getElementById("deleteForm")

let logoutForm = document.getElementById("logoutForm")

if (taskForm) {
    taskForm.addEventListener("submit", createTask)
}

if (taskList) {
    taskList.addEventListener("submit", refreshList)
}

if (deleteForm) {
    deleteForm.addEventListener("submit", deleteTask)
}

if (logoutForm) {
    logoutForm.addEventListener("submit", logout)
}

function createTask(e) {
    e.preventDefault()
    let taskName = document.getElementById("taskName").value
    let taskDescription = document.getElementById("description").value
    let dueDate = document.getElementById("dueDate").value
    let dueDay = dueDate.slice(8,10)
    let dueMonth = dueDate.slice(5,7) 
    let dueYear = dueDate.slice(0,4)
    let userID = JSON.parse(localStorage.getItem('user')).userID

    const task = new Task(taskName, taskDescription, dueDay, dueMonth, dueYear, userID)

    fetchData('/task/createTask', task, "POST")
    .then(data => {
        if(!data.message) {
            let errorSection = document.querySelector("#taskForm .error")
            errorSection.innerText="Task Created!"
        }
    })
    .catch(err => {
        let errorSection = document.querySelector("#taskForm .error")
        errorSection.innerText=err.message
    })
}

function deleteTask(e) {
    e.preventDefault()
    let taskName = document.getElementById("toDelete").value
    let cuser = getCurrentUser()

    const taskToDelete = [taskName, cuser]

    fetchData('/task/deleteTask', taskToDelete, "POST")
    .then(data => {
        if(!data.message) {
            let errorSection = document.querySelector("#deleteForm .error")
            errorSection.innerText="Task Deleted"
        }
    })
    .catch(err => {
        let errorSection = document.querySelector("#deleteForm .error")
        errorSection.innerText=err.message
    })
}

function logout(e){
    e.preventDefault()
    removeCurrentUser()
    window.location.href = "login.html"
}

function refreshList(e) {
    e.preventDefault()
    const cuser = getCurrentUser()
    fetchData('/task/refreshList', cuser, "POST")
    .then(data => {
        if (!data.message) {
            console.log("data returned")
            console.log(data.message)
        }
    })
    .catch(err => {
        console.log("Error:")
        console.log(err.message)
    })
}

async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
    method: methodType,
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
    });
    if(response.ok) {
        return await response.json();
    }
    else {
        throw await response.json();
    }
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function removeCurrentUser() {
    localStorage.removeItem('user');
}