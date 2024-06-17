import React from 'react';
import '../../App.css';
import logo from "../../images/bloodReport.png";

export default function SideMenu() {
    return (
        <div className='menuSection vh-100 w-25'>
            <div className='my-4'>
                <img className='w-50' src={logo} alt="BloodReport" />
            </div>
        </div>
    )
}
