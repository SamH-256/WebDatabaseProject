const bcrypt = require("bcrypt")
const con = require("./db_connect")

async function createUserTable() {
    
    let sql = `
        CREATE TABLE IF NOT EXISTS User (
            userID INT AUTO_INCREMENT,
            firstName VARCHAR(50) NOT NULL,
            lastName VARCHAR(50) NOT NULL,
            email VARCHAR(50) NOT NULL,
            password VARCHAR(250) NOT NULL,
            CONSTRAINT userPK PRIMARY KEY(userID)
        ); `

    await con.query(sql)
}

createUserTable()

async function getAllUsers() {
    let sql = `
      SELECT * FROM User;
    `
    return await con.query(sql)
}

async function userExists(user) {
    let sql = `
        SELECT * FROM User
        WHERE email=?
    `

    let cuser = await con.query(sql, [user.email])
    return cuser[0]
}

// Create - Register
async function register(user) {
    let cuser = await userExists(user)
    if(cuser) throw Error("Email already in use!")

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let sql = `
        INSERT INTO User(firstName, lastName, email, password)
        VALUES(?, ?, ?, ?)
    `

    await con.query(sql, [user.firstName, user.lastName, user.email, hashedPassword])

    return await login(user)
}

// Read - Login
async function login(user) {
    let cuser = await userExists(user)
    if(!cuser) throw Error("Email does not exist!")

    let match = await bcrypt.compare(user.password, cuser.password)
    if (!match) throw Error("Password incorrect!")

    return cuser
}

module.exports = { getAllUsers, login, register }