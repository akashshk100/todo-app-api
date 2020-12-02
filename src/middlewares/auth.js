const jwt  = require("jsonwebtoken")
const User = require("../models/users")

const auth = async (req,res,next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ', '')
        const sign = jwt.verify(token, 'bacha.code')
        const user = await User.findOne( {_id: sign._id, 'tokens.token': token} )
        if(!user) throw new Error()
        req.user = user
        req.token = token
        next()
    }catch(e){
        res.status(401).send({error: 'Invalid Authentication'})
    }
}

module.exports = auth