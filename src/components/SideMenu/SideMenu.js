import React,{useContext} from 'react';
import '../../App.css';
import logo from "../../images/bloodReport.png";
import { MenuContext } from '../../Context/MenuContext';

export default function SideMenu() {
    const { setMenuData } = useContext(MenuContext);
    return (
        <div className='menuSection vh-100 w-25'>
            <div className='my-4'>
                <img className='w-50' src={logo} alt="BloodReport" />
            </div>
            <div className='pt-4 px-5 d-flex flex-column align-items-start'>
                <h3 onClick={()=> setMenuData({"Dashboard":true,"AddParameter":false})} style={{color:"white",cursor:"pointer"}}>Dashbord</h3>
                <h3 onClick={()=> setMenuData({"Dashboard":false,"AddParameter":true})} style={{color:"white",cursor:"pointer"}}>Add Parameter</h3>
            </div>
        </div>
    )
}
