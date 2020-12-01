const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    email: {
        type: String
    }, 
    password: {
        type: String
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.methods.generateAuthToken = async function(_id){
    const token = jwt.sign({_id}, 'bacha.code')
    const user = await User.findById({_id})
    const newTokens = [...user.tokens]
    newTokens.concat({token})
    user.updateOne({
        tokens: newTokens
    })
    console.log(token)
    return token
}

userSchema.statics.verifyCredentials = async function(email, password){
    let user = await User.findOne({email})
    if (!user) return false
    if(user.password !== password) return false
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User