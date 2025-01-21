import React, { useContext, useEffect, useRef, useState } from 'react';
import '../../../App.css';
import Services from '../../../Services/Services';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { mirage } from 'ldrs';

export default function Login() {
    const { setUserData } = useContext(UserAuthContext);

    const [login, setLogin] = useState(true);
    const [dropDown, setDropDown] = useState(false);
    const [passwordvisibility, setPasswordvisibility] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [DOBValue, setDOBValue] = useState("");
    const [genderValue, setGenderValue] = useState("");
    const [bloodParameterData, setBloodParameterData] = useState("");
    const [bloodParameterDate, setBloodParameterDate] = useState("");

    const [serverUp, setServerUp] = useState(false);
    mirage.register()

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "get",
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(`https://bloodreport-server.onrender.com/api`, requestOptions)
            .then(response => setServerUp(true))
            .catch(error => console.log('error', error));
    }, [])

    const bloodParameter = useRef('CRP');

    const loginSignup = () => {
        login ? loginUser() : signUpUser();
    }
    const loginUser = async () => {
        let email = emailValue;
        let password = passwordValue;
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
        } else {
            // The user is not authenticated.
        }
    }
    const signUpUser = async () => {
        let name = nameValue;
        let email = emailValue;
        let password = passwordValue;
        let gender = genderValue;
        let DOB = DOBValue;
        let parametersType ;
        bloodParameterData === "" ? parametersType = "" : parametersType = bloodParameter.current
        let parameterValue = bloodParameterData;
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
        console.log(`Today is ${currentDate} and the time is ${currentTime}`);
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
                bloodParameterDate,
                joinedDate
            })
        });
        if (response.status === 201) {
            // The user is authenticated.
            setLogin(true);
            let data = await response.json();
            await Services.setUserAuth(data)
            setUserData(data);
        } else {
            // The user is not authenticated.
        }
    }

    const createAccount = (e) => {
        e.preventDefault();
        login ? setLogin(false) : setLogin(true);
    }

    return (
        <div>
            {serverUp ?
                <div className='theme-card-dark min-vw-100 min-vh-100 d-flex justify-content-center align-items-center'>
                    <div className={login ? 'theme-card width-35 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column px-3 px-md-5' : 'theme-card width-60 px-3 px-md-5 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column'}>
                        <h2 className='text-light mb-4'>{login ? 'Login' : 'Sign Up'}</h2>
                        <div className='w-100 d-flex justify-content-center align-items-center flex-column flex-md-row'>
                            <div className="w-100">
                                {login ? <></> : <div className="mb-3">
                                    <label htmlFor="nameId" className="form-label w-100 text-start text-light">Name</label>
                                    <input onChange={(e) => setNameValue(e.target.value)} value={nameValue} type="name" className="form-control" id="nameId" placeholder="Name" />
                                </div>}
                                <div className="mb-3">
                                    <label htmlFor="emailId" className="form-label w-100 text-start text-light">Email address</label>
                                    <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} type="email" className="form-control" id="emailId" placeholder="name@example.com" />
                                </div>
                                <div className="position-relative mb-4">
                                    <label htmlFor="passwordId" className="form-label w-100 text-start text-light">Password</label>
                                    <input onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} type={passwordvisibility ? "text" : "password"} className="form-control" id="passwordId" placeholder="Password" />
                                    <span onClick={() => passwordvisibility ? setPasswordvisibility(false) : setPasswordvisibility(true)} className="passwordIcon cursorPointer material-symbols-outlined">
                                        {passwordvisibility ? "visibility" : "visibility_off"}
                                    </span>
                                </div>

                            </div>
                            {login ? <></> : <div className='w-100 ms-0 ms-md-4'>
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label w-100 text-start text-light">Gender</label>
                                    <input onChange={(e) => setGenderValue(e.target.value)} value={genderValue} type="text" className="form-control" id="gender" placeholder="Male or Female and others" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="DOBId" className="form-label w-100 text-start text-light">DOB</label>
                                    <input onChange={(e) => setDOBValue(e.target.value)} value={DOBValue} type="date" className="form-control" id="DOBId" placeholder="name@example.com" />
                                </div>
                                <div className="input-group input-group-sm">
                                    <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">Parameter</label>
                                    <div className='input-group-text dropDownBorder'>
                                        <span className="cursorPointer d-flex justify-content-center align-items-center flex-row" id="inputGroup-sizing-sm" onClick={() => dropDown ? setDropDown(false) : setDropDown(true)}>
                                            <p className='m-0'>{bloodParameter.current}</p>
                                            <span className="material-symbols-outlined">
                                                keyboard_arrow_down
                                            </span>
                                        </span>
                                    </div>
                                    <input onChange={(e) => setBloodParameterData(e.target.value)} value={bloodParameterData} type="text" className="form-control" aria-label="Sizing example input" placeholder='data' aria-describedby="inputGroup-sizing-sm" />
                                    <input onChange={(e) => setBloodParameterDate(e.target.value)} value={bloodParameterDate} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                                </div>
                                <ul className={dropDown ? 'dropedDown theme-card-dark p-3 m-0' : 'dropDown theme-card-dark p-2 m-0'}>
                                    <li onClick={() => { bloodParameter.current = 'CRP'; setDropDown(false) }} className={bloodParameter.current === "CRP" ? 'd-none' : 'px-2 py-1 rounded-2'}><a onClick={(e) => { e.preventDefault(); bloodParameter.current = 'CRP'; setDropDown(false) }} href="/">CRP</a></li>
                                    <li onClick={() => { bloodParameter.current = 'ESR'; setDropDown(false) }} className={bloodParameter.current === "ESR" ? 'd-none' : 'px-2 py-1 rounded-2'}><a onClick={(e) => { e.preventDefault(); bloodParameter.current = 'ESR'; setDropDown(false) }} href="/">ESR</a></li>
                                </ul>
                                <div className='mb-4'></div>
                            </div>}
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row text-light mb-1'>
                            <p className='m-0'>{login ? "Don't have an account?" : "Already have an account?"}</p>
                            <a className='text-light mx-1' href="/" onClick={createAccount}>{login ? 'Sign Up' : 'Login'}</a>
                        </div>
                        <div className='d-flex justify-content-center align-items-center flex-row text-light mb-2'>
                            <p className='m-0'>Forgot Password?</p>
                            <a className='text-light mx-1' href="/" onClick={(e) => e.preventDefault()}>Rest</a>
                        </div>
                        <div className='w-100 d-flex justify-content-center align-items-center'>
                            <div onClick={loginSignup} className='cursorPointer theme-card-dark px-3 py-2 text-light rounded-3'>{login ? 'Login' : 'Sign Up'}</div>
                        </div>
                    </div>
                </div> :
                <div className='vh-100 d-flex justify-content-center align-items-center flex-column'>
                    <l-mirage
                        size="60"
                        speed="2.5"
                        color="black"
                    ></l-mirage>
                    <h2>Waiting for Server</h2>
                </div>}
        </div>
    )
}
