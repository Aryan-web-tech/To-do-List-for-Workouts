import { createContext,useReducer } from "react";
import { useEffect } from "react";

export const AuthContext = createContext()

export const userReducer = (state,action) => {
    switch(action.type)
    {
        case 'LOGIN':
            return {user : action.payload}
        
        case 'LOGOUT':
            return {user : null}
        
        default:
            return state    
    }

}

export const AuthContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(userReducer,{
        user:null
    })

    useEffect(() => {
        //when we login we see email on navbar,when we refresh then user is still logged in but we cant see email,bcoz global state is set to null,hence we udate state using use effect here
        const user = JSON.parse(localStorage.getItem('user'))   //JSON.parse is a method that parses a JSON string and converts it into a JavaScript object.

        if(user)
        {
            dispatch({type:'LOGIN' , payload:user})        
        }
    } , [])

    return (
        <AuthContext.Provider  value = {{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}