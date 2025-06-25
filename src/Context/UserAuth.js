import React, { createContext, useState, useEffect } from "react";
import Services from "../Services/Services";
import { Toaster, toast } from 'sonner'

export const UserAuthContext = createContext(null)

export const UserAuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [serverUp, setServerUp] = useState(false);
    const [totalWellnessValue, setTotalWellnessValue] = useState("100%");
    const [inputData, setInputData] = useState({ parameterValue: "" })
    const [login, setLogin] = useState(true);
    const [otpSendSuccessfully, setOtpSendSuccessfully] = useState(false);
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
        let totalBP = 0;

        userData?.data?.user?.parameters?.CRP?.forEach((e) => {
            totalCRP += e?.value ? parseFloat(e.value) : 0;
        });

        userData?.data?.user?.parameters?.ESR?.forEach((e) => {
            totalESR += e?.value ? parseFloat(e.value) : 0;
        });

        userData?.data?.user?.parameters?.BP?.forEach((e) => {
            if (e?.value) {
                totalBP += (parseFloat(e.value.slice(0, 3)) >= 90 && parseFloat(e.value.slice(0, 3)) <= 120) ? 0 : parseFloat(e.value.slice(0, 3));
            } else {
                totalBP += 0
            }
        });

        // setWellnessValue((val) => ({
        //     ...val,
        //     CRP: totalCRP,
        //     ESR: totalESR,
        // }));
        console.log(totalCRP)
        const totalValue = (((totalCRP / userData?.data?.user?.parameters?.CRP?.length) - 6) * ((totalCRP / userData?.data?.user?.parameters?.CRP?.length) / 6)) +
            (((totalESR / userData?.data?.user?.parameters?.ESR?.length) - 10) * ((totalESR / userData?.data?.user?.parameters?.ESR?.length) / 10));
        // const negativeValuePerPercentage = (wellnessValue / userData?.data?.user?.parameters?.CRP.length) / 6
        console.log(100 - totalValue)
        setTotalWellnessValue(`${(100 - totalValue).toFixed(2)}%`)
        console.log(totalBP)
    }, [userData])

    useEffect(() => {
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let month = currentDate.getMonth();
        let date = currentDate.getDate();
        if (month < 10 && date < 10) {
            setInputData(val => { return { ...val, DOB: `${year}-0${month + 1}-0${date}` } })
            setInputData(val => { return { ...val, parameterDate: `${year}-0${month + 1}-0${date}` } })
        } else if (month < 10) {
            setInputData(val => { return { ...val, DOB: `${year}-0${month + 1}-${date}` } })
            setInputData(val => { return { ...val, parameterDate: `${year}-0${month + 1}-${date}` } })
        } else if (date < 10) {
            setInputData(val => { return { ...val, DOB: `${year}-${month + 1}-0${date}` } })
            setInputData(val => { return { ...val, parameterDate: `${year}-${month + 1}-0${date}` } })
        } else {
            setInputData(val => { return { ...val, DOB: `${year}-${month + 1}-${date}` } })
            setInputData(val => { return { ...val, parameterDate: `${year}-${month + 1}-${date}` } })
        }
    }, [])

    const loginUser = async () => {
        let email = inputData.email;
        let password = inputData.password;
        const response = await fetch('https://bloodreport-server.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (response.status === 200) {
            // The user is authenticated.
            let data = await response.json();
            await Services.setUserAuth(data)
            setUserData(data);
            setInputData({})
        } else {
            // The user is not authenticated.
        }
    }
    const signUpUser = async (bloodParameter) => {
        let name = inputData.name;
        let email = inputData.email;
        let password = inputData.password;
        let gender = inputData.gender;
        let DOB = inputData.DOB;
        let parametersType;
        inputData?.parameterValue === "" ? parametersType = "" : parametersType = bloodParameter.current
        let parameterValue = inputData?.parameterValue;
        const today = new Date();
        // const date = today.getDate();
        // const month = today.getMonth();
        // const year = today.getFullYear();
        const hours = today.getHours();
        const minutes = today.getMinutes();
        const seconds = today.getSeconds();

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const currentDate = `${dayNames[today.getDay()]}, ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;
        const currentTime = `${hours}:${minutes}:${seconds}`;

        let joinedDate = currentDate + " " + currentTime;
        // console.log(`Today is ${currentDate} and the time is ${currentTime}`);
        const response = await fetch('https://bloodreport-server.onrender.com/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
                gender,
                DOB,
                parametersType,
                parameterValue,
                bloodParameterDate: inputData?.parameterDate,
                joinedDate
            })
        });
        if (response.status === 201) {
            // The user is authenticated.
            setLogin(true);
            let data = await response.json();
            await Services.setUserAuth(data)
            setUserData(data);
            setInputData({})
        } else {
            // The user is not authenticated.
        }
    }

    const getOtp = ()=> new Promise((resolve,reject)=>{
        let email = inputData.email;
        if (email) {
            fetch(`https://bloodreport-server.onrender.com/api/forgotPassword/${email}`).then((response) => {
                if (response.status === 200) {
                    resolve("OTP Sent Successfully")
                    return response.json();
                } else {
                    reject("error while sending OTP try again later")
                    throw new Error(`Failed with status: ${response.status}`);
                }
            }).then((data) => {
                setOtpSendSuccessfully(true);
                // toast.success('OTP Sent Successfully')
            }).catch(err => {
                console.log("error:", err);
                // toast.warning(err)
            })
        } else {
            console.log("Error: empty email field");
        }
    })

    return (
        <UserAuthContext.Provider value={{
            userData,
            setUserData,
            serverUp,
            totalWellnessValue,
            inputData,
            setInputData,
            loginUser,
            signUpUser,
            setLogin,
            login,
            otpSendSuccessfully,
            getOtp
        }}>
            <Toaster position="top-center"/>
            {children}
        </UserAuthContext.Provider>
    )
}