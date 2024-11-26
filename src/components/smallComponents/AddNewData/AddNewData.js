import React, { useContext, useRef, useState } from 'react';
import '../../../App.css';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import { Toaster, toast } from 'sonner'
import Services from '../../../Services/Services';

export default function AddNewData() {
    const { userData, setUserData } = useContext(UserAuthContext);
    const [parameterValue, setParameterValue] = useState('');
    const [bloodParameterDate, setBloodParameterDate] = useState('');
    const parametersName = useRef('ESR')

    const addNewData = async () => {
        let email = userData?.data.user.email
        let parametersType = parametersName.current
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
        <div className='w-50 d-flex justify-content-start align-items-center my-5 globalTrasition'>
            <div className='d-flex justify-content-start align-items-center flex-column'>
                <div className="input-group input-group-sm mb-3">
                    {/* <span className="input-group-text" id="inputGroup-sizing-sm">ESR</span> */}
                    <select onChange={(e) => parametersName.current = e.target.value} className="input-group-text outlineAndBorder d-flex justify-content-center align-items-center">
                        <option className='text-start' value="ESR">ESR</option>
                        <option className='text-start' value="CRP">CRP</option>
                    </select>
                    <input type="text" value={parameterValue} onChange={(e) => setParameterValue(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <input type="date" value={bloodParameterDate} onChange={(e) => setBloodParameterDate(e.target.value)} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <div onClick={addNewData} className='cursorPointer theme-card-dark rounded-2'>
                        <p className='text-light m-0 px-3 py-1'>ADD</p>
                    </div>
                </div>
                {/* <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">CRP</span>
                    <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <input type="date" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                    <div className='cursorPointer theme-card-dark rounded-2'>
                        <p className='text-light m-0 px-3 py-1'>ADD</p>
                    </div>
                </div>
                <div className='cursorPointer theme-card-dark rounded-3 d-flex justify-content-start align-items-center'>
                    <span className="material-symbols-outlined text-light m-2">
                        add
                    </span>
                </div> */}
            </div>
            <Toaster position="bottom-center" />
        </div>
    )
}
