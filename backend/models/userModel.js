const mongoose = require('mongoose')
const bcrypt = require('bcrypt')         //bcrpy is a hashing finc that can hash our passwords in a secure eay
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

userSchema.statics.signup = async function(email,password) {    //we cannot use => func while using this inside it ,hence use function keyword for normal function
      //validator
      if(!email || !password)
        {
            throw Error('All fields must be filled')
        }
        if(!validator.isEmail(email))
        {
            throw Error('Email is not valid')
        }
        if(!validator.isStrongPassword(password))
        {
            throw  Error('Password is not strong enough')
        }
    
    const exists =await  this.findOne({email})
    if(exists)
    {
        throw Error('Email already in database')        
    }

    //salt is random string of characters that get added to our paaword to add security
    const salt = await bcrypt.genSalt(10)     //adds 10 characters in front of password

    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})

    return user
}

userSchema.statics.login = async function(email,password){
    if(!email || !password)
    {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})

    if(!user)
    {
        throw Error('Email not valid')
    }   
    
    const match = await bcrypt.compare(password , user.password)

    if(!match)
    {
        throw Error('Incorrect Password')
    }
    return user
}

module.exports = mongoose.model('User' , userSchema)