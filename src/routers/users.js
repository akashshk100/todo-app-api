const express = require('express')
const User = require('../models/users')

const router = express.Router()

router.get('/login', async (req, res) => {
    console.log(req.body.email, req.body.password)
    const user = await User.verifyCredentials(req.body.email, req.body.password)
    if(!user) { 
        return res.status(400).send() 
    }
    const token = await user.generateAuthToken(user._id)
    console.log('[router]', token)
    res.send({user, token})
})

module.exports = router