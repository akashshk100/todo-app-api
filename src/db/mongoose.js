const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/todo-app', {useNewUrlParser: true})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})