import React, { useState, useEffect,useContext } from 'react';
import { UserAuthContext } from '../../Context/UserAuth';
import { MenuContext } from '../../Context/MenuContext';
import AddNewData from './AddNewData/AddNewData';

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
Chartjs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip
)

export default function PerformanceTrack() {
    const [parametersName, setParameterName] = useState("ESR");
    const [sortedDate, setSortedData] = useState(null)

    const { userData, setUserData } = useContext(UserAuthContext);
    const { menuData } = useContext(MenuContext);

    const parameterValue = [
        { value: "ESR", id: "1" },
        { value: "CRP", id: "2" },
        { value: "BP", id: "3" },
        { value: "Glc", id: "4" }
    ]
    useEffect(() => {
        if (["ESR", "CRP", "BP", "Glc"].includes(parametersName)) {
            const parameterData = userData.data.user.parameters[parametersName];
            if (parameterData) {
                let data = parameterData;
                setSortedData(data.sort((a, b) => new Date(b.date) - new Date(a.date)));
            } else {
                setSortedData(null);
            }
        } else {
            setSortedData(null);
        }
    }, [parametersName])

    const data = {
        labels: sortedDate?.map((data) => data.date),
        datasets: [{
            label: parametersName,
            color: "white",
            data: sortedDate?.map((data) => data.value),
            backgroundColor: '#296dc0',
            borderColor: '#3690fe',
            pointBorderColor: '#296dc0',
            fill: false,
            tension: 0.1,
        }]
    }
    const options = {
        // animation: false,
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

    return (
        <div className='w-100 mt-2'>
            <div className='theme-card mx-4 rounded-3'>
                <div className='py-2 d-flex justify-content-start align-items-center flex-row'>
                    <h4 className='px-3 text-light'>{menuData?.AddParameter ? "Add New Data" : "Performance Track"}</h4>
                    <select onChange={(e) => setParameterName(e.target.value)} className={menuData?.AddParameter ? 'd-none' : 'outlineAndBorder text-light theme-card-dark d-flex justify-content-center align-items-center mx-2 rounded-2 px-2 py-1'}>
                        {parameterValue.map((data) =>
                            <option className='text-light fs-6'
                                key={data.id}
                                value={data.value}>{data.value}
                            </option>)}
                    </select>
                </div>
                <div className='d-flex justify-content-between align-items-center flex-row px-3'>
                    {menuData?.AddParameter ? <AddNewData></AddNewData>
                        :
                        <Line
                            data={data}
                            options={options}
                            className='mobileScreen-graph globalTrasition'>
                        </Line>}
                </div>
            </div>
        </div>
    )
}
