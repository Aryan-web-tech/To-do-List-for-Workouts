const express = require('express')
const Workout = require('../models/workoutModel')
const router = express.Router()    //creates obj of router
const {createWorkout,getWorkout,getWorkouts,deleteWorkout,updateWorkout} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth')

//require auth for all workouts
router.use(requireAuth)  //use will fire requireAuth func , so that below routes are protected

//GET all workouts
router.get('/',getWorkouts)

//GET single workout
router.get('/:id',getWorkout)

//POST new workout
router.post('/',createWorkout)

//DELETE a workout
router.delete('/:id',deleteWorkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports = router 