import React, { useState, useRef, useContext, useEffect } from 'react';
import '../../App.css';
import profileImg from "../../images/profile.jpg";
import AddNewData from '../smallComponents/AddNewData/AddNewData';
import { motion, AnimatePresence } from "framer-motion";
import { UserAuthContext } from '../../Context/UserAuthContext';
import { Line } from 'react-chartjs-2';
import wellnessScoreImage from '../../images/bgWellnessCard.png'
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
import { color } from 'chart.js/helpers';

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

    const { userData, setUserData } = useContext(UserAuthContext)

    const parametersName = useRef("ESR");
    const sortedDate = useRef();

    const parameterValue = [
        { value: "ESR", id: "1" },
        { value: "CRP", id: "2" }
    ]
    // function convertToDate(dateString) {
    //     const [year, month, day] = dateString.split("-").map(Number);
    //     return new Date(year, month - 1, day);
    // }

    useEffect(() => {
        if (parametersName.current === "ESR") {
            if (userData.data.user.parameters.ESR) {
                let data = userData.data.user.parameters.ESR
                sortedDate.current = data.sort((a, b) => new Date(b.date) - new Date(a.date))
            }
        } else {
            if (userData.data.user.parameters.CRP) {
                let data = userData.data.user.parameters.CRP
                sortedDate.current = data.sort((a, b) => new Date(b.date) - new Date(a.date))
            }
        }
    }, [parametersName.current])

    const data = {
        labels: sortedDate.current?.map((data) => data.date),
        datasets: [{
            label: parametersName.current === "ESR" ? 'ESR' : 'CRP',
            color:"white",
            data: sortedDate.current?.map((data) => data.value),
            backgroundColor: '#296dc0',
            borderColor: '#3690fe',
            pointBorderColor: '#296dc0',
            fill: false,
            tension: 0.1,
        }]
    }
    const options = {
        animation: false,
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
                labels: {
                    color: 'white' // Set the color of the legend labels
                }
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
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Last Test: " + userData?.data.user?.lastUpdateDate}</p>
                </div>
                <div className='theme-card d-flex justify-content-center align-items-center mx-2 rounded-2'>
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Joined: " + userData?.data.user?.joinedDate}</p>
                </div>
            </div>

            <div className='px-5 w-100 d-flex justify-content-between align-items-center flex-row'>
                <motion.div layoutId='1' className={selectedId ? 'w-50 me-2 rounded-3 theme-card py-4 d-flex justify-content-evenly align-items-center flex-row opacity-0' : 'w-50 me-2 rounded-3 theme-card py-4 d-flex justify-content-evenly align-items-center flex-row'}>
                    <motion.div className='w-25 rounded-circle'>
                        <motion.img className='w-50 rounded-circle' src={profileImg} alt="profileImg" />
                    </motion.div>
                    <motion.div className='d-flex justify-content-start align-items-center flex-column'>
                        <motion.h5 className='text-light text-start w-100'>{"Name: " + userData?.data.user?.name}</motion.h5>
                        <motion.p className='text-light text-start w-100 my-0'>{"DOB: " + userData?.data.user?.DOB}</motion.p>
                        <motion.p className='text-light text-start w-100 my-0'>{"Gender: " + userData?.data.user?.gender}</motion.p>
                    </motion.div>
                    <motion.div className='px-2'>
                        <motion.div className='cursorPointer theme-card-dark rounded-2 my-2'>
                            <motion.p className='text-light m-0 px-3 py-1' onClick={() => setSelectedId('1')}>Edit Profile</motion.p>
                        </motion.div>
                        <motion.div className='cursorPointer theme-card-dark rounded-2 my-2'>
                            <p onClick={() => { Services.Logout(); setUserData(null) }} className='text-light m-0 px-3 py-1'>Log out</p>
                        </motion.div>
                    </motion.div>
                </motion.div>
                <AnimatePresence>
                    {selectedId && (
                        <motion.div className='cardThemeActive rounded-3 theme-card py-4 ms-5 z-1' layoutId={selectedId}>
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
                                    <motion.input type='text' placeholder={userData?.data.user?.name} className='placeholderColor customInput text-light text-start w-100'></motion.input>
                                </motion.div>
                                <motion.div className='w-100 d-flex justify-content-center align-items-center flex-row mb-2'>
                                    <motion.p className='text-light m-0 me-2'>DOB:</motion.p>
                                    <motion.input type='date' defaultValue={userData?.data.user?.DOB} placeholder={userData?.data.user?.DOB} className='placeholderColor customInput text-light text-start w-100 my-0'></motion.input>
                                </motion.div>
                                <motion.div className='w-100 d-flex justify-content-center align-items-center flex-row mb-2'>
                                    <motion.p className='text-light m-0 me-2'>Gender</motion.p>
                                    <motion.input type='text' placeholder={userData?.data.user?.gender} className='placeholderColor customInput text-light text-start w-100 my-0'></motion.input>
                                </motion.div>
                            </motion.div>
                            <motion.button className='cursorPointer theme-card-dark rounded-2 my-2 text-light' onClick={() => setSelectedId(null)}>Save</motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div style={{position:"relative",height:"100%",overflow:"hidden"}} className='bgWellnessCard w-50 rounded-3 theme-card py-4'>
                    <img style={{position:"absolute",zIndex:0,left:0,top:0,width:"100%"}} className='bgWellnessCardImg' src={wellnessScoreImage} alt="img" />
                    <h2 style={{position:"relative",cursor:"context-menu"}} className='text-light'>Wellness Score</h2>
                    <h3 style={{position:"relative",cursor:"context-menu"}} className='text-light'>80%</h3>
                </div>
                {/* <div className='w-50 rounded-3 bgWellnessCard theme-card py-4'>
                    <h2 className='text-light'>Wellness Score</h2>
                    <h3 className='text-light'>80%</h3>
                </div> */}
            </div>

            <div className='w-100 mt-2'>
                <div className='theme-card mx-5 rounded-3'>
                    <div className='py-2 d-flex justify-content-start align-items-center flex-row'>
                        <h4 className='px-5 text-light'>{graph ? "Performance Track" : "Add New Data"}</h4>
                        <select onChange={(e) => parametersName.current = e.target.value} className={graph ? 'outlineAndBorder text-light theme-card-dark d-flex justify-content-center align-items-center mx-2 rounded-2 px-2 py-1' : 'd-none'}>
                            {parameterValue.map((data) =>
                                <option className='text-light fs-6'
                                    key={data.id}
                                    value={data.value}>{data.value}
                                </option>)}
                        </select>
                    </div>
                    <div className='d-flex justify-content-between align-items-center flex-row px-3'>
                        {graph ? <Line
                            data={data}
                            options={options}
                            className='w-75 h-100 globalTrasition'>
                        </Line> : <AddNewData></AddNewData>}
                        <div className='px-2'>
                            <div onClick={() => graph ? setGraph(false) : setGraph(true)} className='cursorPointer theme-card-dark rounded-2 my-2'>
                                <p className='text-light m-0 px-3 py-1'>{graph ? "Add New Data" : "Graph Data"}</p>
                            </div>
                            {/* <div className='cursorPointer theme-card-dark rounded-2 my-2'>
                                <p onClick={() => console.log(parametersName.current)} className='text-light m-0 px-3 py-1'>Remove Data</p>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
