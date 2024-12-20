import './App.css';
import Main from './components/Pages/Main/Main';
import Login from './components/Pages/Login/Login';
import { UserAuthContext } from './Context/UserAuthContext';
import { useEffect, useState } from 'react';
import Services from './Services/Services';

function App() {

  const[userData, setUserData] = useState(null);
  const[count ,setCount] = useState(0)

  useEffect(()=>{
    Services.getUserAuth().then(res =>{
      res ? setUserData(res) : setUserData(null)
    })
    // setCount(count + 1)
    // console.log(count)
  },[])

  return (
    <UserAuthContext.Provider value={{userData, setUserData}}>
    <div className="App">
      <>
     { userData ? <Main/> : <Login/>}
      </>
    </div>
    </UserAuthContext.Provider>
  );
}

export default App;
