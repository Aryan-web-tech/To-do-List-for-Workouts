//this file is created so that route func can be invoked from this file 
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all doc
const getWorkouts = async(req,res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt:-1}) 
    res.status(200).json(workouts)  //{} remained empty bcoz we want all docs nad createAt func for -1 arranges docs in desc order from time they were added
}

//get single workout
const getWorkout = async(req,res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'Not found'})
    }

    const workout = await Workout.findById(id)

    if(!workout)
    {
        return res.status(404).json({error:'No such workout'})
    }
    res.status(200).json(workout)
}


//create new doc
const createWorkout = async(req,res)=>{
    //due to use(express,json())  we can use req body that comes along with request object
    const {title,load,reps}=req.body    

    let emptyFields = []

    if(!title)
    {
      emptyFields.push('title')
    }
    if(!load)
    {
      emptyFields.push('load')
    }
    if(!reps) 
    {
      emptyFields.push('reps')
    }
    if(emptyFields.length>0)
        {
            return res.status(400).json({error:'Please fill in all details',emptyFields})
        }

    //add doc to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete workout
const deleteWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        res.status(404).json({error:'Not found'})
    }

    const workout = await Workout.findOneAndDelete({_id:id})

    if(!workout)
    {
        res.status(404).json({error:'Doc not present'})
    }

    res.status(200).json(workout)
}


//update workout
const updateWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'Not found'})
    }

    const workout = await Workout.findOneAndUpdate({_id:id},{...req.body})

    if(!workout)
    {
        return res.status(404).json({error:'Not present'})
    }

    res.status(200).json(workout)
}


//we are exporting object which has diff funcs as its properties
module.exports = {
    createWorkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
}