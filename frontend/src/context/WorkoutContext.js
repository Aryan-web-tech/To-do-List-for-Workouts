import {createContext,useReducer} from 'react'

export const WorkoutContext = createContext()

export const workoutsReducer = (state,action) => {          //state represents state before we are making change to it,action- obj that we passed to dispatch func
    switch(action.type)
    {
        case 'SET_WORKOUTS':
            return {
                workouts:action.payload
            }
        case 'CREATE_WORKOUT':
            return {
                workouts: [action.payload , ...state.workouts]               //1st arg represents single new workout object, 2nd arg is we put previous workout objects also and new one being on the top
            }   

        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w)=> w._id !== action.payload._id)
            }    
        default:
            return state     
    }
}

export const WorkoutContextProvider = ({children}) =>{                 //children represents app componentthat we wrapped inside index.jss

    const [state,dispatch] = useReducer(workoutsReducer,{              //workoutsReducer is func to update state,we also specify initial value to state,i.e,workouts:null object
        workouts:[]
    })

    return (
        <WorkoutContext.Provider value={{...state,dispatch}}>                       
           {children}
        </WorkoutContext.Provider>
    )
}

//value in WorkoutProvider to provided to all components
//... - spread operator is spreading properties of workouts and providing those in  object given to value