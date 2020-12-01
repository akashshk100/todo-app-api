require('./db/mongoose')
const cors = require('cors')
const express = require('express')
const taskRouter = require('./routers/task')
const userRouter = require('./routers/users')
const User = require('./models/users')

const app = express()
const port = process.env.PORT || 4000
app.use(express.json())
app.use(cors())
app.use(taskRouter)
app.use(userRouter)

app.listen(port, () => {
    console.log("Listening on :", port)
})

// const jwt = require('jsonwebtoken')

// const myfunction = () => {
//     const token = jwt.sign({_id: 'abc123'}, 'bacha.code')
//     console.log('token: ',token)

//     const value = jwt.verify(token, 'bacha.code')
//     console.log(value)
// }
// myfunction()

// const myfunction = () => {
//     const newUser = new User({email: 'akash', password: 'akash'})
//     newUser.save().then( user => {
//         console.log(user)
//     }) 
// }
// myfunction()