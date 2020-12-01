const cors = require('cors')
const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())


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

app.patch('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).then( task => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } ).catch( err => {
        console.log(err)
        res.status(500).send()
    }) 
})

app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id).then( task => {
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } ).catch( err => {
        console.log(err)
        res.status(500).send()
    }) 
})

app.post('/tasks', (req,res) => {
    const task = new Task({...req.body, createdAt: new Date(req.body.createdAt), dueDate: new Date(req.body.dueDate) })
    task.save().then( response => {
        res.send(response)
    } ).catch( err => {
        res.send(err)
    })
})

app.listen(port, () => {
    console.log("Listening on :", port)
})