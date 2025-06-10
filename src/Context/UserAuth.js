import React,{ createContext,useState,useEffect } from "react";
import Services from "../Services/Services";

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [serverUp,setServerUp] = useState(false);

    useEffect(() => {
        Services.getUserAuth().then(res => {
          res ? setUserData(res) : setUserData(null);
        });
        fetch(`https://bloodreport-server.onrender.com/api`)
            .then(res => setServerUp(true))
            .catch(error => console.log('error', error));
      }, [])

    return (
        <UserAuthContext.Provider value={{userData,setUserData,serverUp}}>
            {children}
        </UserAuthContext.Provider>
    )
}