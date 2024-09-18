// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')

const router = express.Router()

router.get('/', async (req, res, next) => {

    try{
        const resources = await Project.getProjects()
        res.json(resources)
    } catch (err) {
        next (err)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const newProject = await Project.createProject(req.body);
        res.status(201).json(newProject);
    } catch (err) {
        next(err);
    }
})

module.exports = router