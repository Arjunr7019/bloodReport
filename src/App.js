import './App.css';
import Main from './components/Pages/Main/Main';
import Login from './components/Pages/Login/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/bloodReport">
       <Routes>
        <Route index element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<Main/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
