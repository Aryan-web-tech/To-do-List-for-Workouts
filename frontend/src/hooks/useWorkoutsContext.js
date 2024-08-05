//this file is to make custom hook to invoke WorkoutContext
import {useContext} from 'react'
import { WorkoutContext } from '../context/WorkoutContext'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutContext)

    if(!context)
    {
        throw new Error('useWorkoutContext must be used inside WorkoutsContextProvider')  
    }   

    return context    
}