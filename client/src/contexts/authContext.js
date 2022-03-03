import { createContext, useReducer, useEffect } from "react";
import { processReducer } from "../reducers/processingreduce";
import axios from 'axios'
import { default as defaultUrl, local_token } from "./constants";
import setAuthToken from '../utilities/setToken'
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(processReducer, {
        loading: true,
        isAuthenticated: false,
        user: null,
    });
    // Authenticated Users
    const loadUser = async()=> {
        if (localStorage[local_token]) {
            setAuthToken(localStorage[local_token])
        }
        try {
            const response = await axios.get(`${defaultUrl}/auth/`);
            if (response.data.success) {
                dispatch({ type : 'SET_AUTH', payload : {
                    loading: false,
                    isAuthenticated: true,
                    user : response.data.message.username
                }})
            }
        } catch (error) {
            console.log(error.response)
            localStorage.removeItem(local_token);
            setAuthToken(null);
            dispatch({ type: 'SET_AUTH', payload: {
                loading: false,
                isAuthenticated: false,
                user : null
            }})
        }
    }
    useEffect( ()=> { loadUser()}, [])
    //  processing login 
    const userLogin = async userFrom => {
        try {
            const responseAxios = await axios.post(`${defaultUrl}/auth/login`,userFrom)
            if (responseAxios.data.success) {
                localStorage.setItem(local_token, responseAxios.data.accessToken)
                await loadUser();
            }

            return responseAxios.data
        } catch (error) {
            if (error.response){
                console.log(error.response)
                //do something
                return(error.response)
                
                }else if(error.request){
                    console.log(error.request)
                    return(error.response)
                //do something else
                
                }else if(error.message){
                    console.log(error.message)
                //do something other than the other two
                
                }
        }
    }
    //  processing Regiseer 
    const userRegister = async userFrom => {
        try {
            const responseAxios = await axios.post(`${defaultUrl}/auth/register`,userFrom)
            if (responseAxios.data.success) {
                localStorage.setItem(local_token, responseAxios.data.accessToken)
                await loadUser();
            }

            return responseAxios.data
        } catch (error) {
            if (error.response){
                console.log(error.response)
                //do something
                return(error.response)
                
                }else if(error.request){
                    console.log(error.request)
                    return(error.response)
                //do something else
                
                }else if(error.message){
                    console.log(error.message)
                //do something other than the other two
                
                }
        }
    }
    //  Log out 
    const logoutUser = ()=> {
        localStorage.removeItem(local_token);
            setAuthToken(null);
            dispatch({ type: 'SET_AUTH', payload: {
                loading: false,
                isAuthenticated: false,
                user : null
            }})
    }
    // contextData
    const authContextData = {userLogin, state, logoutUser, userRegister}
    return (
        <AuthContext.Provider value={authContextData}>
            { children}
        </AuthContext.Provider>
    )
}

export default AuthProvider