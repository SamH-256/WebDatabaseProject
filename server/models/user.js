const con = require("./db_connect")

async function createUserTable() {
    
    let sql = `
        CREATE TABLE IF NOT EXISTS User (
            userID INT AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(50) NOT NULL,
            CONSTRAINT userPK PRIMARY KEY(userID)
        ); `

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM User;
    `
    await con.query(sql)
}

module.exports = { getAllUsers }