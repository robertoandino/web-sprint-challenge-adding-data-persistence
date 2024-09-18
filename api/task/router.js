// build your `/api/tasks` router here
const express = require('express')
const Task = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try{
        const tasks = await Task.getTasks()
        res.json(tasks)
    } catch (err) {
        next (err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const newTask = await Task.createTask(req.body);
        res.status(201).json(newTask);
    } catch (err) {
        next(err);
    }
})

module.exports = router