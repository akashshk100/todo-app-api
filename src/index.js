const { response } = require('express')
const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())

app.get('/tasks', (req, res) => {
    Task.find({}).then( tasks => {
        res.send(tasks)
    } ).catch( err => {
        res.status(500).send()
    }) 
})

app.get('/tasks/:id', (req, res) => {
    Task.findById(req.params.id).then( task => {
        res.send(task)
    } ).catch( err => {
        res.status(500).send()
    }) 
})

app.post('/tasks', (req,res) => {
    console.log(req.body)
    const task = new Task(req.body)
    task.save().then( response => {
        res.send(response)
    } ).catch( err => {
        res.send(err)
    })
})

app.listen(port, () => {
    console.log("Listening on :", port)
})