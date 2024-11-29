import React, { useState,useEffect,useContext } from 'react';
import Dashboard from '../../Dashboard/Dashboard';
import SideMenu from '../../SideMenu/SideMenu';
import { UserAuthContext } from '../../../Context/UserAuthContext';
import Services from '../../../Services/Services';

export default function Main() {
  const[serverUp, setServerUp] = useState(false);
  const { userData, setUserData } = useContext(UserAuthContext);
  
  const updataUserData = async()=>{
    let email = userData?.data.user.email;
    const response = await fetch('https://bloodreport-server.onrender.com/api/LoggedInUserData', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email
      })
  });
  if (response.status === 200) {
      // The user is authenticated.
      let data = await response.json()
      setUserData(data);
      await Services.setUserAuth(data);
  } else {
      // The user is not authenticated.
  }
  }

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`https://bloodreport-server.onrender.com/api`, requestOptions)
      .then(response => setServerUp(true))
      .then(res => updataUserData())
      .catch(error => console.log('error', error));
  }, [])

  
  // console.log(loggedInUserInfo.state.email)
  return (
    <div className='d-flex justify-content-center align-items-center flex-row'>
      {serverUp ?
        <>
          <SideMenu></SideMenu>
          <Dashboard></Dashboard>
        </>:<div className='vh-100 d-flex justify-content-center align-items-center flex-column'>
                    <l-mirage
                        size="60"
                        speed="2.5"
                        color="black"
                    ></l-mirage>
                    <h2>Waiting for Server</h2>
                </div>
      }
    </div>
  )
}
