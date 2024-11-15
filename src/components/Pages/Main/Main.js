import React from 'react';
import Dashboard from '../../Dashboard/Dashboard';
import SideMenu from '../../SideMenu/SideMenu';

export default function Main() {

  // console.log(loggedInUserInfo.state.email)
  return (
    <div className='d-flex justify-content-center align-items-center flex-row'>
      <SideMenu></SideMenu>
      <Dashboard></Dashboard>
    </div>
  )
}
