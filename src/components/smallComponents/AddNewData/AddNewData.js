import React, { useContext, useEffect, useState } from 'react';
import '../../../App.css';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { Toaster, toast } from 'sonner'
import Services from '../../../Services/Services';
import trash from '../../../images/bx-trash.svg'
import sad from '../../../images/bx-sad.svg'

export default function AddNewData() {
    const { userData, setUserData } = useContext(UserAuthContext);
    const [parameterValue, setParameterValue] = useState('');
    const [bloodParameterDate, setBloodParameterDate] = useState('');
    const [resentActivity, setResentActivity] = useState();
    const [parametersName, setParameterName] = useState("ESR");
    const [resentActivityCard, setResentActivityCard] = useState("ESR");

    useEffect(() => {
        if (resentActivityCard === "ESR") {
            if (userData.data.user.parameters.ESR) {
                let data = userData.data.user.parameters.ESR
                setResentActivity(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
            }
        } else {
            if (userData.data.user.parameters.CRP) {
                let data = userData.data.user.parameters.CRP
                setResentActivity(data.sort((a, b) => new Date(b.date) - new Date(a.date)))
            } else {
                setResentActivity()
            }
        }
        // resentActivityCard.current === "ESR" ? setResentActivity(data.sort((a, b) => new Date(b.date) - new Date(a.date))) : setResentActivity(userData.data.user.parameters.CRP);
    }, [resentActivityCard, userData])

    const deleteParmeterValue = async (type, value, date) => {
        console.log(`${type} ${value} ${date}`)
        let email = userData?.data.user.email
        const response = await fetch('https://bloodreport-server.onrender.com/api/DeleteData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                type,
                value,
                date
            })
        });
        if (response.status === 200) {
            // The user is authenticated.
            toast.success('Parameter Deleted Sucessfully')
            let data = await response.json()
            setUserData(data);
            await Services.setUserAuth(data);
        } else {
            // The user is not authenticated.
            toast.error("Can't Deleted Parameter, try after some times.....")
        }
    }

    const addNewData = async () => {
        let email = userData?.data.user.email
        let parametersType = parametersName
        if (parameterValue === "" || bloodParameterDate === "") {
            toast.error('parameters are empty')
        } else {
            const response = await fetch('https://bloodreport-server.onrender.com/api/addNewParamaeter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    parameterValue,
                    bloodParameterDate,
                    parametersType
                })
            });
            if (response.status === 200) {
                // The user is authenticated.
                toast.success('Parameter Added Sucessfully')
                let data = await response.json()
                setUserData(data);
                await Services.setUserAuth(data);
            } else {
                // The user is not authenticated.
                toast.error("Can't Add Parameter, try after some times.....")
            }
        }
    }

    return (
        <div className='w-75 d-flex justify-content-start align-items-start flex-column my-2 globalTrasition ps-3'>
            <div className='d-flex justify-content-center align-items-center flex-column'>
                <div className="input-group input-group-sm mb-3">
                    {/* <span className="input-group-text" id="inputGroup-sizing-sm">ESR</span> */}
                    <select onChange={(e) => setParameterName(e.target.value)} className="input-group-text outlineAndBorder d-flex justify-content-center align-items-center">
                        <option className='text-start' value="ESR">ESR</option>
                        <option className='text-start' value="CRP">CRP</option>
                    </select>
                    <input type="text" value={parameterValue} onChange={(e) => setParameterValue(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <input type="date" value={bloodParameterDate} onChange={(e) => setBloodParameterDate(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <div onClick={addNewData} className='cursorPointer theme-card-dark rounded-2'>
                        <p className='text-light m-0 px-3 py-1'>ADD</p>
                    </div>
                </div>
            </div>
            <div className='w-100 d-flex justify-content-start align-items-center flex-row mt-3'>
                <h4 style={{ color: "white" }}>Resent Activity</h4>
                <select onChange={(e) => setResentActivityCard(e.target.value)} className="input-group-text outlineAndBorder d-flex justify-content-center align-items-center ms-3">
                    <option className='text-start' value="ESR">ESR</option>
                    <option className='text-start' value="CRP">CRP</option>
                </select>
            </div>
            {resentActivity ? <>
                <div className='w-100  py-2 mt-2 d-flex justify-content-start align-items-center flex-row'>
                    <p style={{ color: "white" }} className='me-auto mb-0'>Parameter Type</p>
                    <p style={{ color: "white" }} className='me-auto mb-0'>Parameter Value</p>
                    <p style={{ color: "white" }} className='me-auto mb-0'>Added Date</p>
                    <p style={{ color: "white" }} className='ms-auto me-3 mb-0'>Modify</p>
                </div>
                <div style={{ height: "32vh", overflow: "hidden" }} className='w-100 resentActivity'>
                    <div style={{ overflowY: "scroll", paddingRight: "17px", boxSizing: "content-box" }} className='w-100 h-100'>
                        {resentActivity?.map((data, index) =>
                        (<div key={index} className='w-100 theme-card-dark px-3 py-2 mt-2 rounded-2 d-flex justify-content-between align-items-center flex-row'>
                            <p style={{ color: "white" }} className='m-0'>{resentActivityCard}</p>
                            <p style={{ color: "white" }} className='m-0'>{data.value}</p>
                            <p style={{ color: "white" }} className='m-0'>{data.date}</p>
                            <img style={{ cursor: "pointer" }} src={trash} onClick={() => deleteParmeterValue(resentActivityCard, data.value, data.date)} alt="trash" />
                        </div>)
                        )}
                    </div>
                </div>
            </> : <div style={{ height: "39vh" }} className='w-100 d-flex justify-content-center align-items-center flex-column'>
                <img src={sad} alt="sad" />
                <p style={{ color: "white" }}>Empty Parameter, Add values</p>
            </div>}
            <Toaster position="bottom-center" />
        </div>
    )
}
