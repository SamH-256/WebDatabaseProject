const con = require("./db_connect")

async function createTaskStepTable() {
    
    let sql = `
        CREATE TABLE IF NOT EXISTS TaskStep (
            taskID INT NOT NULL,
            step VARCHAR(255) NOT NULL,
            CONSTRAINT stepPK PRIMARY KEY(taskID, step),
            CONSTRAINT taskFK FOREIGN KEY(taskID) REFERENCES Task(taskID)
        ); `

    await con.query(sql)
}

createTaskStepTable()

async function getAllTaskSteps() {
    let sql = `
      SELECT * FROM TaskStep;
    `
    await con.query(sql)
}

module.exports = { getAllTaskSteps }
