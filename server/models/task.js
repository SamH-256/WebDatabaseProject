const con = require("./db_connect")

async function createTaskTable() {
    
    let sql = `
        CREATE TABLE IF NOT EXISTS Task (
            taskID INT AUTO_INCREMENT,
            userID INT NOT NULL,
            taskName VARCHAR(50) NOT NULL,
            taskDescription VARCHAR(255) NOT NULL,
            dueDay INT NOT NULL,
            dueMonth INT NOT NULL,
            dueYear INT NOT NULL,
            CONSTRAINT taskPK PRIMARY KEY(taskID),
            CONSTRAINT userFK FOREIGN KEY(userID) REFERENCES User(userID)
        ); `

    await con.query(sql)
}

createTaskTable()

async function getAllTasks() {
    let sql = `
      SELECT * FROM Task;
    `
    await con.query(sql)
}

async function getUserTasks(user) {
    let sql = `
       SELECT * FROM TASK
       WHERE userID=?
    `

    let taskList = await con.query(sql, [user.userID])

    return taskList
}

async function taskExists(task) {
    let sql = `
        SELECT * FROM Task
        WHERE taskName=?
    `

    let ctask = await con.query(sql, [task.taskName])
    return ctask[0]
}

async function taskExistsByName(taskToDelete) {
    let sql = `
        SELECT * FROM Task
        WHERE taskName=?
        AND userID=?
    `

    let ctask = await con.query(sql, [taskToDelete[0], taskToDelete[1]])
    return ctask[0]
}

async function createTask(task) {
    let ctask = await taskExists(task)
    if(ctask) throw Error("Task already exists!")
    
    let sql = `
        INSERT INTO Task(userID, taskName, taskDescription, dueDay, dueMonth, dueYear)
        VALUES(?, ?, ?, ?, ?, ?)
    `
    
    await con.query(sql, [task.userID, task.taskName, task.taskDescription, task.dueDay, task.dueMonth, task.dueYear])
}

async function deleteTask(taskToDelete) {
    let ctask = await taskExistsByName(taskToDelete)
    if(!ctask) throw Error("Task doesn't exist!")

    let sql = `
        DELETE FROM Task
        WHERE taskName=?
    `

    await con.query(sql, [taskName])
}

module.exports = { getAllTasks, createTask, getUserTasks, deleteTask }