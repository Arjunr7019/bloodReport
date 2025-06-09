import './App.css';
import Main from './components/Pages/Main/Main';
import Login from './components/Pages/Login/Login';
import { UserAuthContext } from './Context/UserAuth';
import React,{ useContext } from 'react';

function App() {
  const { userData } = useContext(UserAuthContext);

  return (
    <div className="App">
        {userData ? <Main /> : <Login />}
    </div>
  );
}

export default App;
