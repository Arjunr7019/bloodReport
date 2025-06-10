import React,{ createContext,useState,useEffect } from "react";
import Services from "../Services/Services";

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        Services.getUserAuth().then(res => {
          res ? setUserData(res) : setUserData(null);
        })
      }, [])

    return (
        <UserAuthContext.Provider value={{userData,setUserData}}>
            {children}
        </UserAuthContext.Provider>
    )
}