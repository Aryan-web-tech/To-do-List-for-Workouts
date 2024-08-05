import {useState} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {useAuthContext} from "../hooks/useAuthContext"

const WorkoutForm = () =>{

    const {dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    const [title,setTitle] = useState('')
    const [load,setLoad] = useState('')
    const [reps,setReps] = useState('')
    const [error,setError] = useState('')
    const [emptyFields,setEmptyFields] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()   //this func prevents default submission of form,default action maybe refreshing page

        if(!user)
        {
            setError('You must be logged in')
            return
        }

        const workout = {title,load,reps}  //dummy object is sent as body of request

        const response = await fetch('/api/workouts' , {              //Makes an asynchronous POST request to the /api/workouts endpoint.
            method:'POST',
            body:JSON.stringify(workout),  // Converts the workout object to a JSON string to be sent in the request body.
            headers:{
                'Content-type':'application/json' ,    //Sets the Content-Type header to application/json to indicate that the request body contains JSON data.
                'Authorization': `Bearer ${user.token}`    
            }
        })

        const json= await response.json()  //Waits for the response and parses it as JSON.

        if(!response.ok)
        {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if(response.ok)
        {
            setTitle('')
            setError('')
            setReps('')
            setError(null)
            console.log('New workout added',json)
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }

    return (
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Exercise Title : </label>
            <input type='text' 
            onChange={(e) => setTitle(e.target.value)}
            value={title} 
            className={emptyFields.includes('title') ? 'error': ''}
            />     

            <label>Loads(in kg) : </label>
            <input type='number' 
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            className={emptyFields.includes('load') ? 'error': ''} 
             />

            <label>Reps : </label>
            <input type='number' 
            onChange={(e) => setReps(e.target.value)}
            value={reps} 
            className={emptyFields.includes('reps') ? 'error': ''}
            />

        <button>Add Workout</button>
        {error && <div className='error'>{error}</div>}
        </form>

    )
}
//The value attribute is bound to the title state.In simpler terms, using the value attribute in this way ensures that the text inside the input field is always in sync with React's state, making it easier to control and use the input data in your application.
export default WorkoutForm