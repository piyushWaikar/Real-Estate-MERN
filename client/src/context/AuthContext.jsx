import {createContext, useEffect, useState} from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{

    const [ currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    const updateUser = (data) =>{
        setCurrentUser(data);
    };

    useEffect(()=>{
        localStorage.setItem("user",JSON.stringify(currentUser));
    },[currentUser]);

    // basically whatever value passed inside the value attribute we can access anywhere in the react application/at any component.To do complete setup we had rapped our main.jsx with </AuthContext.Provider> . AND here we are passing user info to check for user through out the different pages.
    return( 
    <AuthContext.Provider value={{currentUser, updateUser}}>
        {children}
    </AuthContext.Provider>
    )
}