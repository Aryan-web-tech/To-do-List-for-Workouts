require('dotenv').config()   //dotenv package loads env variables from .env file into process.env object 

const express = require("express")
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//express app
const app = express()   //this func creates express app

//middleware
app.use(express.json())    //The express.json() middleware is essential for handling JSON data in Express applications. It ensures that any JSON payloads sent in requests are automatically parsed and available in the req.body property, making it easy to work with JSON data in your route handlers.
app.use((req,res,next)=>{
    //gets executed for every request
    console.log(req.path,req.method)
    next()    //next is used to invoke next middleware,fist if we get req at '/' then use gets invoked then to move to next middleware ,i.e, post for eg , then to move to post next() i used
})


//routes
//When a client makes a GET request to that path, the specified callback function is executed
// GET requests are used to retrieve data from the server
/*app.get('/' , (req,res)=>{
    res.json({mssg:'Welcome to app'})   //json response is sent with msg
})*/


app.use('/api/workouts',workoutRoutes)   //server.js can make use of all routes present in workouts.js file,we wrote routes in seperate file to maker server.js morre clean
//function of routes in workouts is fired when a user goes to /api/workouts/......  ... represents path it invokes from specificroutes
app.use('/api/user',userRoutes)


//mongoose helps to connect server.js to database
mongoose.connect(process.env.MONGO_URI)
.then(( )=>{
   //listening to specific portfor request
   //placed inside then bcoz we want to listen to request only if file is connected to database
   //then is executed iff file gets connected to db
    app.listen(process.env.PORT, ()=>{
    console.log('Listeneing on port ',process.env.PORT)
     })
})
.catch((error)=>{
    console.log(error)
})

