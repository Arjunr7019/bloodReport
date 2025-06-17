import React, { useContext, useRef, useState } from 'react';
import '../../../App.css';
import { UserAuthContext } from '../../../Context/UserAuth';
import { mirage } from 'ldrs';

export default function Login() {
    const { serverUp, inputData, setInputData, loginUser, signUpUser, setLogin, login } = useContext(UserAuthContext);
    const [dropDown, setDropDown] = useState(false);
    const [passwordvisibility, setPasswordvisibility] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(true)

    mirage.register()

    const bloodParameter = useRef('CRP');

    const loginSignup = () => {
        login ? loginUser() : signUpUser(bloodParameter);
    }

    const createAccountAndForgotPassword = (e) => {
        e.preventDefault();
        login ? setLogin(false) : setLogin(true);
    }

    return (
        <div>
            {serverUp ?
                <div className='theme-card-dark min-vw-100 min-vh-100 d-flex justify-content-center align-items-center'>
                    {!forgotPassword ? <div className={login ? 'theme-card width-35 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column px-3 px-md-5' : 'theme-card width-60 px-3 px-md-5 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column'}>
                        <h2 className='text-light mb-4'>{login ? 'Login' : 'Sign Up'}</h2>
                        <div className='w-100 d-flex justify-content-center align-items-center flex-column flex-md-row'>
                            <div className="w-100">
                                {login ? <></> : <div className="mb-3">
                                    <label htmlFor="nameId" className="form-label w-100 text-start text-light">Name</label>
                                    <input onChange={(e) => setInputData(val => { return { ...val, name: e.target.value } })} value={inputData?.name} type="name" className="form-control" id="nameId" placeholder="Name" />
                                </div>}
                                <div className="mb-3">
                                    <label htmlFor="emailId" className="form-label w-100 text-start text-light">Email address</label>
                                    <input onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })} value={inputData?.email} type="email" className="form-control" id="emailId" placeholder="name@example.com" />
                                </div>
                                <div className="position-relative mb-4">
                                    <label htmlFor="passwordId" className="form-label w-100 text-start text-light">Password</label>
                                    <input onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })} value={inputData?.password} type={passwordvisibility ? "text" : "password"} className="form-control" id="passwordId" placeholder="Password" />
                                    <span onClick={() => passwordvisibility ? setPasswordvisibility(false) : setPasswordvisibility(true)} className="passwordIcon cursorPointer material-symbols-outlined">
                                        {passwordvisibility ? "visibility" : "visibility_off"}
                                    </span>
                                </div>

                            </div>
                            {login ? <></> : <div className='w-100 ms-0 ms-md-4'>
                                <div className="mb-3">
                                    <label htmlFor="gender" className="form-label w-100 text-start text-light">Gender</label>
                                    <input onChange={(e) => setInputData(val => { return { ...val, gender: e.target.value } })} value={inputData?.gender} type="text" className="form-control" id="gender" placeholder="Male or Female and others" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="DOBId" className="form-label w-100 text-start text-light">DOB</label>
                                    <input name='trip-start' max={inputData.DOB} onChange={(e) => setInputData(val => { return { ...val, DOB: e.target.value } })} value={inputData?.DOB} type="date" className="form-control" id="DOBId" placeholder="name@example.com" />
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
                                    <input onChange={(e) => setInputData(val => { return { ...val, parameterValue: e.target.value } })} value={inputData?.parameterValue} type="text" className="form-control" aria-label="Sizing example input" placeholder='data' aria-describedby="inputGroup-sizing-sm" />
                                    <input max={inputData.DOB} onChange={(e) => setInputData(val => { return { ...val, parameterDate: e.target.value } })} value={inputData?.parameterDate} type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
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
                            <a className='text-light mx-1' href="/" onClick={(e) => createAccountAndForgotPassword(e)}>{login ? 'Sign Up' : 'Login'}</a>
                        </div>
                        {login ? <div className='d-flex justify-content-center align-items-center flex-row text-light mb-2'>
                            <p className='m-0'>Forgot Password?</p>
                            <a className='text-light mx-1' href="/" onClick={(e) => { e.preventDefault(); setForgotPassword(true) }}>Rest</a>
                        </div> : <></>}
                        <div className='w-100 d-flex justify-content-center align-items-center'>
                            <div onClick={() => loginSignup()} className='cursorPointer theme-card-dark px-3 py-2 text-light rounded-3'>{login ? 'Login' : 'Sign Up'}</div>
                        </div>
                    </div> :
                        <div className='theme-card width-35 py-4 rounded-4 d-flex justify-content-center align-items-center flex-column px-3 px-md-5'>
                            <h2 className='text-light mb-4'>Forgot Password</h2>
                            <div className='w-100 d-flex justify-content-center align-items-center flex-column flex-md-row'>
                                <div className="w-100">
                                    <div className="mb-3">
                                        <label htmlFor="emailId" className="form-label w-100 text-start text-light">Email address</label>
                                        <div className='d-flex'>
                                            <input onChange={(e) => setInputData(val => { return { ...val, email: e.target.value } })} value={inputData?.email} type="email" className="form-control" id="emailId" placeholder="name@example.com" />
                                            <div className='w-25 d-flex justify-content-center align-items-center ps-1'>
                                                <div className='cursorPointer theme-card-dark px-3 py-2 text-light rounded-3'>GetOTP</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="OTPId" className="form-label w-100 text-start text-light">OTP</label>
                                        <input onChange={(e) => setInputData(val => { return { ...val, otp: e.target.value } })} value={inputData?.otp} type="text" className="form-control" id="OTPId" placeholder="One Time Password" />
                                    </div>
                                    <div className="position-relative mb-4">
                                        <label htmlFor="passwordId" className="form-label w-100 text-start text-light">Password</label>
                                        <input onChange={(e) => setInputData(val => { return { ...val, password: e.target.value } })} value={inputData?.password} type={passwordvisibility ? "text" : "password"} className="form-control" id="passwordId" placeholder="Password" />
                                        <span onClick={() => passwordvisibility ? setPasswordvisibility(false) : setPasswordvisibility(true)} className="passwordIcon cursorPointer material-symbols-outlined">
                                            {passwordvisibility ? "visibility" : "visibility_off"}
                                        </span>
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center flex-row text-light mb-2'>
                                        <p className='m-0'>Back to Login</p>
                                        <a className='text-light mx-1' href="/" onClick={(e) => { e.preventDefault(); setForgotPassword(false) }}>Rest</a>
                                    </div>
                                    <div className='w-100 d-flex justify-content-center align-items-center'>
                                        <div className='cursorPointer theme-card-dark px-3 py-2 text-light rounded-3'>Submit</div>
                                    </div>
                                </div>
                            </div>
                        </div>}
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
