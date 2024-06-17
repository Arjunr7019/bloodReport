import React, { useRef, useState } from 'react';
import '../../../App.css';

export default function Login() {
    const [login, setLogin] = useState(true);
    const [dropDown, setDropDown] = useState(false);
    const [passwordvisibility, setPasswordvisibility] = useState(false);
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [DOBValue, setDOBValue] = useState("");
    const [bloodParameterData, setBloodParameterData] = useState("");
    const [bloodParameterDate, setBloodParameterDate] = useState("");

    const bloodParameter = useRef('CRP');

    const createAccount = (e) => {
        e.preventDefault();
        login ? setLogin(false) : setLogin(true);
    }

    return (
        <div className='theme-card-dark min-vw-100 min-vh-100 d-flex justify-content-center align-items-center'>
            <div className={login ? 'theme-card w-50 py-4 rounded-4 d-flex justify-content-center align-items-center flex-row' : 'theme-card w-50 px-5 py-4 rounded-4 d-flex justify-content-center align-items-center flex-row'}>
                <div className={login ? 'w-75' : 'w-100'}>
                    <h2 className='text-light mb-4'>{login ? 'Login' : 'Sign Up'}</h2>
                    {login ? <></> : <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">Name</label>
                        <input onChange={(e) => setNameValue(e.target.value)} value={nameValue} type="name" className="form-control" id="nameId" placeholder="Name" />
                    </div>}
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">Email address</label>
                        <input onChange={(e) => setEmailValue(e.target.value)} value={emailValue} type="email" className="form-control" id="emailId" placeholder="name@example.com" />
                    </div>
                    <div className="position-relative mb-4">
                        <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">Password</label>
                        <input onChange={(e) => setPasswordValue(e.target.value)} value={passwordValue} type={passwordvisibility?"text":"password"} className="form-control" id="passwordId" placeholder="Password" />
                        <span onClick={()=> passwordvisibility?setPasswordvisibility(false):setPasswordvisibility(true)} className="passwordIcon cursorPointer material-symbols-outlined">
                            {passwordvisibility?"visibility":"visibility_off"}
                        </span>
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
                        <div onClick={()=> console.log(bloodParameter.current +"---"+bloodParameterData+"---"+bloodParameterDate)} className='cursorPointer w-25 theme-card-dark px-3 py-2 text-light rounded-3'>{login ? 'Login' : 'Sign Up'}</div>
                    </div>
                </div>
                {login ? <></> : <div className='w-75 ms-4'>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">DOB</label>
                        <input onChange={(e) => setDOBValue(e.target.value)} value={DOBValue} type="date" className="form-control" id="DOBId" placeholder="name@example.com" />
                    </div>
                    <div className="input-group input-group-sm">
                        <label htmlFor="exampleFormControlInput1" className="form-label w-100 text-start text-light">Parameter</label>
                        <div className='input-group-text'>
                            <span className="cursorPointer d-flex justify-content-center align-items-center flex-row" id="inputGroup-sizing-sm" onClick={() => dropDown ? setDropDown(false) : setDropDown(true)}>
                                <p className='m-0'>{bloodParameter.current}</p>
                                <span className="material-symbols-outlined">
                                    keyboard_arrow_down
                                </span>
                            </span>
                        </div>
                        <input onChange={(e)=> setBloodParameterData(e.target.value)} value={bloodParameterData} type="text" className="form-control" aria-label="Sizing example input" placeholder='data' aria-describedby="inputGroup-sizing-sm" />
                        <input onChange={(e)=> setBloodParameterDate(e.target.value)} value={bloodParameterDate} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <ul className={dropDown ? 'dropedDown theme-card-dark p-3 m-0' : 'dropDown theme-card-dark p-2 m-0'}>
                        <li onClick={() => { bloodParameter.current = 'CRP'; setDropDown(false) }} className={bloodParameter.current==="CRP"?'d-none':'px-2 py-1 rounded-2'}><a onClick={(e) => { e.preventDefault(); bloodParameter.current = 'CRP'; setDropDown(false) }} href="/">CRP</a></li>
                        <li onClick={() => { bloodParameter.current = 'ESR'; setDropDown(false) }} className={bloodParameter.current==="ESR"?'d-none':'px-2 py-1 rounded-2'}><a onClick={(e) => { e.preventDefault(); bloodParameter.current = 'ESR'; setDropDown(false) }} href="/">ESR</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}
