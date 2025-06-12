import React, { createContext, useState, useEffect } from "react";
import Services from "../Services/Services";

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [serverUp, setServerUp] = useState(false);
    const [totalWellnessValue, setTotalWellnessValue] = useState("100%");

    useEffect(() => {
        Services.getUserAuth().then(res => {
            res ? setUserData(res) : setUserData(null);
        });
        fetch(`https://bloodreport-server.onrender.com/api`)
            .then(res => setServerUp(true))
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        let wellnessValue = 0;
        userData?.data?.user?.parameters?.CRP.map((e) => {
            wellnessValue = parseFloat(e.value) + wellnessValue
        })
        const negativeValuePerPercentage = (wellnessValue / userData?.data?.user?.parameters?.CRP.length) / 6
        console.log(100 - (((wellnessValue / userData?.data?.user?.parameters?.CRP.length) - 6) * negativeValuePerPercentage))
        setTotalWellnessValue(`${(100 - (((wellnessValue / userData?.data?.user?.parameters?.CRP.length) - 6) * negativeValuePerPercentage).toFixed(2))}%`)
        // console.log(userData)
    }, [userData])

    return (
        <UserAuthContext.Provider value={{ userData, setUserData, serverUp,totalWellnessValue }}>
            {children}
        </UserAuthContext.Provider>
    )
}