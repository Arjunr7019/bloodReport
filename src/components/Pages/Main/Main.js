import React from 'react';
import Dashboard from '../../Dashboard/Dashboard';
import SideMenu from '../../SideMenu/SideMenu';
import { useLocation } from 'react-router-dom';

export default function Main() {
  const loggedInUserInfo = useLocation();

  // console.log(loggedInUserInfo.state.email)
  return (
    <div className='d-flex justify-content-center align-items-center flex-row'>
      <SideMenu></SideMenu>
      <Dashboard value={{email:loggedInUserInfo.state.email}}></Dashboard>
    </div>
  )
}
