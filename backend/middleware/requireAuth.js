const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req,res,next) => {

    //verify authorization
    const {authorization} = req.headers    //{ authorization } is a destructuring pattern that extracts the authorization property from the req.headers object and assigns it to a variable named authorization.

    if(!authorization)
    {
        return res.status(401).json({error:'Authorization token required'})
    }

    const token = authorization.split(' ')[1]  //split authorization token to obtain token from it . eg:- 'Bearer token123',by split we get array of 2 elements

    try
    {
        const {_id} = jwt.verify(token,process.env.SECRET)

        //we call below as anything like req.abc ,etc we chose .user
        req.user = await User.findOne({_id}).select('_id')      //using select we attach _id property only to req.user instead of complete obj
        next()   //this will fire next handler function
    }
    catch(error)
    {
        console.log(error)
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = requireAuth