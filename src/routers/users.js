const express = require('express')
const auth = require('../middlewares/auth')
const User = require('../models/users')

const router = express.Router()

router.post('/login', async (req, res) => {
    const user = await User.verifyCredentials(req.body.email, req.body.password)
    if(!user) { 
        return res.status(400).send() 
    }
    const token = await user.generateAuthToken(user._id)
    res.send({user, token})
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router