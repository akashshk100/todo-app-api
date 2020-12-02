const express = require('express')
const Task = require('../models/task')
const auth = require('../middlewares/auth')

const app = express()
const router = new express.Router()

router.get('/tasks', auth,  (req, res) => {
    Task.find({}).then( tasks => {
        res.send(tasks)
    } ).catch( err => {
        res.status(500).send()
    }) 
})

router.get('/tasks/:id', auth, (req, res) => {
    Task.findById(req.params.id).then( task => {
        res.send(task)
    } ).catch( err => {
        res.status(500).send()
    }) 
})

router.patch('/tasks/:id', auth, (req, res) => {
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

router.delete('/tasks/:id', auth, (req, res) => {
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

router.post('/tasks',auth, (req,res) => {
    const task = new Task({...req.body, createdAt: new Date(req.body.createdAt), dueDate: new Date(req.body.dueDate) })
    task.save().then( response => {
        res.send(response)
    } ).catch( err => {
        res.send(err)
    })
})

module.exports = router