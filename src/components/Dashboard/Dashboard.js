import React, { useState, useEffect, useRef, useContext } from 'react';
import '../../App.css';
import profileImg from "../../images/profile.jpg";
import AddNewData from '../smallComponents/AddNewData/AddNewData';
import { motion, AnimatePresence } from "framer-motion";
import { UserAuthContext } from '../../Context/UserAuthContext';
import { Line } from 'react-chartjs-2';
import {
    Chart as Chartjs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
} from 'chart.js';
import Services from '../../Services/Services';

Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)


export default function Dashboard() {
    const [graph, setGraph] = useState(true);
    const [selectedId, setSelectedId] = useState(null);
    const [parameterValueForGraph, setParameterValueForGraph] = useState([]);

    const {userData, setUserData} = useContext(UserAuthContext)

    const userInfo = useRef("");
    const parametersName = useRef("ESR");

    const parameterValue = [
        {value:"ESR", id:"1"},
        {value:"CRP", id:"2"}
    ]
    // function convertToDate(dateString) {
    //     const [year, month, day] = dateString.split("-").map(Number);
    //     return new Date(year, month - 1, day);
    // }

    useEffect(() => {
        setTimeout(async () => {
            const response = await fetch('https://bloodreport-server.onrender.com/api/LoggedInUserData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData?.data.user.email
                })
            });
            if (response.status === 200) {
                // The user is authenticated.
                let data = await response.json();
                setParameterValueForGraph(data.parameters.ESR);
                userInfo.current = data;
            } else {
                // The user is not authenticated.
            }
        }, 10)
        console.log(userData)
    }, [])

    const data = {
        labels: parameterValueForGraph.map((data) => data.date),
        datasets: [{
            label: 'ESR',
            data: parameterValueForGraph.map((data) => data.value),
            backgroundColor: '#296dc0',
            borderColor: '#3690fe',
            pointBorderColor: '#296dc0',
            fill: false,
            tension: 0.1,
        }]
    }
    const options = {
        scales: {
            x: {
                display: true,
                grid: {
                    color: '#4B4B4B',
                    borderColor: '#4B4B4B'
                },
                title: {
                    display: true,
                    text: 'Month'
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                display: true,
                grid: {
                    color: '#4B4B4B',
                    borderColor: '#4B4B4B'
                },
                title: {
                    display: true,
                    text: 'Value'
                },
                beginAtZero: true,
                ticks: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: true
            }
        }
    }
    // console.log(convertToDate(userData.current.DOB))

    return (
        <div className='contentSection vh-100 w-75'>
            <div className='my-4 w-100 d-flex justify-content-staet align-items-center flex-row px-5'>
                <h3 className='text-light'>Dashboard</h3>
                <div className='theme-card d-flex justify-content-center align-items-center mx-2 rounded-2'>
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Last Test:" + " " + userInfo.current.lastUpdateDate}</p>
                </div>
                <div className='theme-card d-flex justify-content-center align-items-center mx-2 rounded-2'>
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Joined:" + " " + userInfo.current.joinedDate}</p>
                </div>
            </div>

            <div className='px-5 w-100 d-flex justify-content-between align-items-center flex-row'>
                <motion.div layoutId='1' className='w-50 me-2 rounded-3 theme-card py-4 d-flex justify-content-evenly align-items-center flex-row'>
                    <motion.div className='w-25 rounded-circle'>
                        <motion.img className='w-50 rounded-circle' src={profileImg} alt="profileImg" />
                    </motion.div>
                    <motion.div className='d-flex justify-content-start align-items-center flex-column'>
                        <motion.h5 className='text-light text-start w-100'>{"Name:" + " " + userInfo.current.name}</motion.h5>
                        <motion.p className='text-light text-start w-100 my-0'>{"DOB:" + " " + userInfo.current.DOB}</motion.p>
                        <motion.p className='text-light text-start w-100 my-0'>{"Gender:" + " " + userInfo.current.gender}</motion.p>
                    </motion.div>
                    <motion.div className='px-2'>
                        <motion.div className='cursorPointer theme-card-dark rounded-2 my-2'>
                            <motion.p className='text-light m-0 px-3 py-1' onClick={() => setSelectedId('1')}>Edit Profile</motion.p>
                        </motion.div>
                        <motion.div className='cursorPointer theme-card-dark rounded-2 my-2'>
                            <p onClick={()=> {Services.Logout(); setUserData(null)}} className='text-light m-0 px-3 py-1'>Log out</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <AnimatePresence>
                    {selectedId && (
                        <motion.div className='cardThemeActive rounded-3 theme-card py-4 ms-5' layoutId={selectedId}>
                            <motion.div className='w-100 d-flex justify-content-end align-items-center'>
                                <motion.span className="cursorPointer text-light material-symbols-outlined theme-card-dark rounded-3 p-1"
                                    onClick={() => setSelectedId(null)}>
                                    close
                                </motion.span>
                            </motion.div>
                            <motion.div className='w-50 rounded-circle'>
                                <motion.img className='w-50 rounded-circle' src={profileImg} alt="profileImg" />
                            </motion.div>
                            <motion.div className='d-flex justify-content-start align-items-center flex-column mx-3 my-2'>
                                <motion.div className='w-100 d-flex justify-content-center align-items-center flex-row mb-2'>
                                    <motion.p className='text-light m-0 me-2'>Name:</motion.p>
                                    <motion.input type='text' placeholder={userInfo.current.name} className='placeholderColor customInput text-light text-start w-100'></motion.input>
                                </motion.div>
                                <motion.div className='w-100 d-flex justify-content-center align-items-center flex-row mb-2'>
                                    <motion.p className='text-light m-0 me-2'>DOB:</motion.p>
                                    <motion.input type='date' defaultValue={userInfo.current.DOB} placeholder={userInfo.current.DOB} className='placeholderColor customInput text-light text-start w-100 my-0'></motion.input>
                                </motion.div>
                                <motion.div className='w-100 d-flex justify-content-center align-items-center flex-row mb-2'>
                                    <motion.p className='text-light m-0 me-2'>Gender</motion.p>
                                    <motion.input type='text' placeholder={userInfo.current.gender} className='placeholderColor customInput text-light text-start w-100 my-0'></motion.input>
                                </motion.div>
                            </motion.div>
                            <motion.button className='cursorPointer theme-card-dark rounded-2 my-2 text-light' onClick={() => setSelectedId(null)}>Save</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className='w-50 rounded-3 bgWellnessCard theme-card py-4'>
                    <h2 className='text-light'>Wellness Score</h2>
                    <h3 className='text-light'>80%</h3>
                </div>
            </div>

            <div className='w-100 mt-2'>
                <div className='theme-card mx-5 rounded-3'>
                    <div className='py-2 d-flex justify-content-start align-items-center flex-row'>
                        <h4 className='px-5 text-light'>{graph ? "Performance Track" : "Add New Data"}</h4>
                        <select onChange={(e)=> parametersName.current = e.target.value} className={graph ? 'outlineAndBorder text-light theme-card-dark d-flex justify-content-center align-items-center mx-2 rounded-2 px-2 py-1' : 'd-none'}>
                            {parameterValue.map((data)=> <option className='text-light text-center px-2 py-1 mx-3 my-1 fs-6' key={data.id} value={data.value}>{data.value}</option>)}
                        </select>
                    </div>
                    <div className='d-flex justify-content-center align-items-center flex-row'>
                        {graph ? <Line
                            data={data}
                            options={options}
                            className='w-75 h-100'>
                        </Line> : <AddNewData></AddNewData>}
                        <div className='px-2'>
                            <div onClick={() => graph ? setGraph(false) : setGraph(true)} className='cursorPointer theme-card-dark rounded-2 my-2'>
                                <p className='text-light m-0 px-3 py-1'>{graph ? "Add New Data" : "Graph Data"}</p>
                            </div>
                            <div className='cursorPointer theme-card-dark rounded-2 my-2'>
                                <p onClick={()=> console.log(parametersName.current)} className='text-light m-0 px-3 py-1'>Remove Data</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
