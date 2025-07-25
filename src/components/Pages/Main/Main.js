import React, { useState, useContext } from 'react';
import Dashboard from '../../Dashboard/Dashboard';
import SideMenu from '../../SideMenu/SideMenu';
import { UserAuthContext } from '../../../Context/UserAuth';
import Services from '../../../Services/Services';
import { MenuContext } from '../../../Context/MenuContext';
import userIcon from '../../../images/profile.jpg';
import wellnessScoreImage from '../../../images/bgWellnessCard.png';
import PerformanceTrack from '../../smallComponents/PerformanceTrack';
import logo from '../../../images/bloodReport.png';
import dashboardIcon from '../../../images/bxs-dashboard.svg';
import addValueIcon from '../../../images/bxs-add-to-queue.svg';
import { Toaster, toast } from 'sonner'

export default function Main() {
  const { userData, setUserData, serverUp, totalWellnessValue,changeUserDetails } = useContext(UserAuthContext);
  const [menuData, setMenuData] = useState({ "Dashboard": true, "AddParameter": false });
  const [logoutButton, setLogoutButton] = useState(false);
  const [navAction, setNavAction] = useState("0px")
  const [userDetails, setUserDetails] = useState({ name: "", DOB: "", gender: "" })

  const date = new Date();
  const today = date.toISOString().slice(0, 10);

  // useEffect(() => {
  //   let email = userData?.data.user.email;
  //   fetch('https://bloodreport-server.onrender.com/api/LoggedInUserData', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       email
  //     })
  //   }).then(res => {
  //     if (res.status === 200) {
  //       // The user is authenticated.
  //       let data = res.json()
  //       console.log(data)
  //       // setUserData(data);
  //       // Services.setUserAuth(data);
  //     } else {
  //       // The user is not authenticated.
  //     }
  //   }).catch(err => {
  //     console.log("error:", err);
  //   })
  // }, [serverUp])
  const EditUserDetails = () => {
    navAction === "0px" ? setNavAction("fit-content") : setNavAction("0px")
  }


  // console.log(loggedInUserInfo.state.email)
  return (
    <div className='d-flex justify-content-center align-items-center flex-row'>
      {serverUp ?
        <>
          <MenuContext.Provider value={{ menuData, setMenuData }}>
            {/* desktop screen */}
            <div className='d-none d-xl-flex justify-content-center align-items-center flex-row'>
              <SideMenu></SideMenu>
              <Dashboard></Dashboard>
            </div>

            {/* Mobile screen */}
            <div className='mobileScreen d-flex d-xl-none align-items-center flex-column w-100'>
              {/* navBar section */}
              <div className='d-flex justify-content-center align-items-center flex-row w-100 px-4 py-3'>
                <div className='navBar w-100 d-flex justify-content-center align-items-start flex-column px-2 py-3'>
                  <div className='w-100 d-flex justify-content-between align-items-start flex-row'>
                    <div className="my-auto">
                      <img style={{ width: "6rem" }} src={logo} alt="logo" />
                    </div>
                    <div className='d-flex justify-content-end align-items-center flex-column pe-1'>
                      <div onClick={() => logoutButton ? setLogoutButton(false) : setLogoutButton(true)} className='d-flex justify-content-end align-items-center'>
                        <p className='m-0 px-2' style={{ color: "white" }}>{userData?.data.user?.name}</p>
                        <img className='rounded-circle' style={{ width: "2.5rem" }} src={userIcon} alt="icon" />
                      </div>
                    </div>
                    {/* <nav className='d-flex flex-column'>
                    <span></span>
                    <span></span>
                    <span></span>
                  </nav> */}
                  </div>
                  <div className='w-100 d-flex justify-content-end align-items-center flex-row pe-1 mt-2'>
                    <div className='d-flex flex-column justify-content-start align-items-end'>
                      {logoutButton ? <p className='m-0 navBar px-2 mb-2 user-select-none' onClick={() => EditUserDetails()} style={{ color: "white" }}>Edit Profile</p> : <></>}
                      {logoutButton ? <p onClick={() => { Services.Logout(); setUserData(null) }}
                        className='m-0 navBar px-2 user-select-none' style={{ color: "white", width: "fit-content" }}>Logout</p> : <></>}
                    </div>
                    <div className='d-flex flex-column align-items-start ps-2'
                      style={{ width: navAction, height: navAction, visibility: navAction !== "0px" ? "visible" : "hidden" }}>
                      <p className='m-0' style={{ color: "white", fontSize: "0.7rem" }}>Name:</p>
                      <input className='placeholderColor customInput text-light text-start w-100'
                        type='text'
                        placeholder={userData?.data.user?.name}
                        value={userDetails.name}
                        onChange={(e) => setUserDetails(val => { return { ...val, name: e.target.value } })} />
                      <p className='m-0' style={{ color: "white", fontSize: "0.7rem" }}>DOB:</p>
                      <input className='placeholderColor customInput text-light text-start w-100 my-0'
                        type='date'
                        defaultValue={userData?.data.user?.DOB}
                        placeholder={userData?.data.user?.DOB}
                        // value={userDetails.DOB}
                        max={today}
                        onChange={(e) => setUserDetails(val => { return { ...val, DOB: e.target.value } })} />
                      <p className='m-0' style={{ color: "white", fontSize: "0.7rem" }}>Gender:</p>
                      <input className='placeholderColor customInput text-light text-start w-100 my-0'
                        type='text'
                        placeholder={userData?.data.user?.gender}
                        value={userDetails.gender}
                        onChange={(e) => setUserDetails(val => { return { ...val, gender: e.target.value } })} />
                      <div className='d-flex justify-content-center pt-2 w-100'>
                        <p onClick={() => toast.promise(changeUserDetails(userDetails.name, userDetails.DOB, userDetails.gender), {
                          loading: 'updating...',
                          success: (data) => {
                            setUserDetails({ name: "", DOB: "", gender: "" })
                            return `${data}`;
                          },
                          error: (error) => {
                            return `${error}`;
                          },
                        })}
                          className='m-0 navBar px-2 mb-2 user-select-none' style={{ color: "white" }}>Save</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* dashboard title, lastUpdate and joind date card */}
              <div className='d-flex justify-content-start px-4 flex-column w-100'>
                <h1 className='mb-2 fw-medium text-start' style={{ color: "white", fontSize: "2rem" }}>{menuData.Dashboard ? "Dashboard" : "Add Value"}</h1>
                {menuData.Dashboard ? <div className='d-flex justify-content-between flex-row'>
                  <div className='theme-card d-flex justify-content-center align-items-center mb-2 me-2 rounded-2 w-50'>
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Last Test: " + userData?.data.user?.lastUpdateDate}</p>
                  </div>
                  <div className='theme-card d-flex justify-content-center align-items-center mb-2 rounded-2 w-50'>
                    <p className='text-light text-center mx-3 my-1 fs-6'>{"Joined: " + userData?.data.user?.joinedDate}</p>
                  </div>
                </div> : <></>}
              </div>

              <div className='w-100 d-flex flex-column'>
                {/* wellness card */}
                {menuData.Dashboard ? <div className='px-4 w-100'>
                  <div style={{ position: "relative", overflow: "hidden" }} className='bgWellnessCard w-100 rounded-3 theme-card py-4'>
                    <img style={{ position: "absolute", zIndex: 0, left: 0, top: 0, width: "100%" }} className='bgWellnessCardImg' src={wellnessScoreImage} alt="img" />
                    <h2 style={{ position: "relative", cursor: "context-menu", textShadow: "0.5px 0.5px #000000" }} className='text-light'>Wellness Score</h2>
                    <h3 style={{ position: "relative", cursor: "context-menu", textShadow: "0.5px 0.5px #000000" }} className='text-light'>{totalWellnessValue}</h3>
                  </div>
                </div> : <></>}

                {/* performence track section */}
                <PerformanceTrack />

                <div className='d-flex justify-content-center align-items-center w-100' style={{ position: "absolute", bottom: "2rem" }}>
                  <div className='menuModal d-flex justify-content-evenly align-items p-2' style={{ width: "fit-content" }}>
                    <div className='rounded-3 p-2' onClick={() => setMenuData({ "Dashboard": true, "AddParameter": false })} style={menuData.Dashboard ? { border: "1px solid #ffffff4d" } : {}}>
                      <img style={{ width: "2rem" }} src={dashboardIcon} alt="icon" />
                      <p className='m-0 user-select-none' style={{ fontSize: "80%", color: "white" }}>Dashboard</p>
                    </div>
                    <div className='rounded-3 p-2' onClick={() => setMenuData({ "Dashboard": false, "AddParameter": true })} style={menuData.Dashboard ? {} : { border: "1px solid #ffffff4d" }}>
                      <img style={{ width: "2rem" }} src={addValueIcon} alt="icon" />
                      <p className='m-0 user-select-none' style={{ fontSize: "80%", color: "white" }}>Add Value</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MenuContext.Provider>
        </> :
        <div className='vh-100 d-flex justify-content-center align-items-center flex-column'>
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
