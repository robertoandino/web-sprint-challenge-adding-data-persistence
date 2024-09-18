// build your server here and require it from index.js
const express = require('express')
const resourceRouter = require('./resource/router')
const projectRouter = require('./project/router')

const server = express()

server.use(express.json())

server.use('/api/resources', resourceRouter)
server.use('/api/projects', projectRouter)

server.use('*', (req, res, next) => {
    console.log(`404 error at path: ${req.originalUrl}`)
    next({ status: 404, message: 'not found'})
})

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = server