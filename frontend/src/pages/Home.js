import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import {useAuthContext} from "../hooks/useAuthContext"

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const Home = () => {

    //const [workouts,setWorkouts] = useState(null)   //initialises workout state to an empty array
    const {workouts,dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch('/api/workouts/' , {
                headers: {
                    'Authorization': `Bearer ${user.token}`      //`` represents template string and we are sending authorization header with user's token
                }
            })   //fetches data from api
            const json = await response.json()   // parses the response body as JSON.
    
            if(response.ok)
            {
                //setWorkouts(json)
                dispatch({type: 'SET_WORKOUTS' , payload:json})   //type - this property describes state change,payload - represents any data we need to make this change which here is array of workouts obj
            }
            else
            {
                console.error('Failed to fetch workouts');
            }
        }

        if(user)
        {
            fetchWorkouts()
        }
        
    },[dispatch,user])   //since we are using user in useEffect add user in dependency

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout)=>(
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home