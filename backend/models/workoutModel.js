const mongoose = require('mongoose')

const Schema = mongoose.Schema    //creates schema func to create new schema

const workoutSchema = new Schema({
    title:{
        type: String,
        required:true
    },
    reps:{
        type: Number,
        required:true
    },
    load:{
        type: Number,
        required:true
    },
    user_id :{
        type:String,
        reqiured:true
    }
},{timestamps:true})   //By using the timestamps option in Mongoose, you can efficiently manage the creation and update times of your documents without having to manually handle these fields.

module.exports = mongoose.model('Workout',workoutSchema)