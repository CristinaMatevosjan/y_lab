import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './components/loginPage/LoginPage';
import WelcomePage from "./components/welcomePage/WelcomePage";

function App() {

  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') ) {
      setIsLogged(true);
    } 
    else {
      setIsLogged(false);
      navigate('/login');
    } 
   
  }, [setIsLogged, navigate])

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage setIsLogged={setIsLogged} />} />
        {isLogged && <Route path="/" element={<WelcomePage /> }/>}
      </Routes>
      
    </div>
  );
}

export default App;
