"use client"

import { createContext, useContext, useState ,useEffect} from "react";

//creating the context

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {

 
   
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  
   

 



    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider