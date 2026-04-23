const express = require("express")
const router = express.Router()
const TaskStep = require("../models/taskstep")

router.get('/getAllTaskSteps', async (req, res) => {
    try {
        const tasksteps = await TaskStep.getAllTaskSteps()
        res.send(tasksteps)
    } catch(err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router