import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [error,setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (email,password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/user/login' , {
            method:'POST',
            headers:{'Content-type': 'application/json'},
            body: JSON.stringify({email,password})
        })

        const json = await response.json()

        if(!response.ok)
        {
            setIsLoading(false)
            setError(json.error)
        }
        if(response.ok)
        {
            //save user to local storage
            localStorage.setItem('user',JSON.stringify(json))       //we store the use in local storage bcoz we user leaves website and retuens later thenglobal state for user will reset to null,but in this case we can detect presence of user logged in due to presence of jwt in local storage

            //update auth context
            dispatch({type:'LOGIN' , payload:json})

            setIsLoading(false)
        }    
    }
    return {login , isLoading , error}
}