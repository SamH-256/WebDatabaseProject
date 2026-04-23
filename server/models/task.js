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

module.exports = { getAllTasks }