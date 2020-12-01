const mongoose = require('mongoose')

const Task = mongoose.model('Task', {
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = Task