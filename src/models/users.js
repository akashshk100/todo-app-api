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
    user = this
    const token = jwt.sign({_id: user._id.toString()}, 'bacha.code')
    user.tokens = user.tokens.concat({token})
    user.save()
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