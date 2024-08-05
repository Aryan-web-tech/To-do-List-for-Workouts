import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {useWorkoutsContext} from "./useWorkoutsContext"

export const useLogout = () => {

    const {dispatch} = useContext(AuthContext)
    const {dispatch : workoutsdisptach} = useWorkoutsContext()  // we can't destructure useWorkoutsContext with same dispatch name as it gives error,so we assign dispatch to workoutsdisptach 

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        workoutsdisptach({type:'SET_WORKOUTS',payload:null})
    }

    return {logout}
}