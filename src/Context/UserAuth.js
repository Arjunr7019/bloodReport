import React, { createContext, useState, useEffect } from "react";
import Services from "../Services/Services";

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [serverUp, setServerUp] = useState(false);
    const [totalWellnessValue, setTotalWellnessValue] = useState("100%");
    // const [wellnessValue, setWellnessValue] = useState({});

    useEffect(() => {
        Services.getUserAuth().then(res => {
            res ? setUserData(res) : setUserData(null);
        });
        fetch(`https://bloodreport-server.onrender.com/api`)
            .then(res => setServerUp(true))
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {
        let totalCRP = 0;
        let totalESR = 0;

        userData?.data?.user?.parameters?.CRP?.forEach((e) => {
            totalCRP += e?.value ? parseFloat(e.value) : 0;
        });

        userData?.data?.user?.parameters?.ESR?.forEach((e) => {
            totalESR += e?.value ? parseFloat(e.value) : 0;
        });

        // setWellnessValue((val) => ({
        //     ...val,
        //     CRP: totalCRP,
        //     ESR: totalESR,
        // }));

        // userData?.data?.user?.parameters?.CRP.map((e) => {
        //     if (e) setWellnessValue(val => { return { ...val, CRP: parseFloat(e.value) + wellnessValue?.CRP } });
        //     else setWellnessValue(val => { return { ...val, CRP: 0 } });
        // })
        // userData?.data?.user?.parameters?.ESR.map((e) => {
        //     if (e) setWellnessValue(val => { return { ...val, ESR: parseFloat(e.value) + wellnessValue?.ESR } });
        //     else setWellnessValue(val => { return { ...val, ESR: 0 } });
        // })
        console.log(totalCRP)
        const totalValue = (((totalCRP/userData?.data?.user?.parameters?.CRP.length)-6)*((totalCRP/userData?.data?.user?.parameters?.CRP.length)/6))+ 
        (((totalESR/userData?.data?.user?.parameters?.ESR.length)-10)*((totalESR/userData?.data?.user?.parameters?.ESR.length)/10)) ;
        // const negativeValuePerPercentage = (wellnessValue / userData?.data?.user?.parameters?.CRP.length) / 6
        console.log(100 - totalValue)
        setTotalWellnessValue(`${(100 - totalValue).toFixed(2)}%`)
        // console.log(userData)
    }, [userData])

    return (
        <UserAuthContext.Provider value={{ userData, setUserData, serverUp, totalWellnessValue }}>
            {children}
        </UserAuthContext.Provider>
    )
}