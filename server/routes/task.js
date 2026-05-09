const express = require("express")
const router = express.Router()
const Task = require("../models/task")

router
.get('/getAllTasks', async (req, res) => {
    try {
        const tasks = await Task.getAllTasks()
        res.send(tasks)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.get('/refreshList', async (req, res) => {
    try {
        const tasks = await Task.getUserTasks(req.body)
        res.send({...tasks})
    }
    catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/createTask', async (req, res) => {
    try {
        const task = await Task.createTask(req.body)
        res.send({...task})
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

.post('/deleteTask', async (req, res) => {
    try {
        await Task.deleteTask(req.body)
        res.send("deleted")
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router