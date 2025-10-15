

import React, {useState} from 'react';

import Home from './pages/home.jsx'
import Navbar from './pages/navbar.jsx'
import Basic from './pages/testpage.jsx'
import Candidate from './pages/addcandidate.jsx'
import Loginpage from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Redirect from './pages/decisionpage.jsx';



import{BrowserRouter as Router,Routes,Route} from "react-router-dom";

import "./App.css"



function App() {
  const[isAuthenticated,setIsAuthenticated] = useState(false);

  return (
    <div>
      

      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Redirect/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element ={<Loginpage/>}/>

        </Routes>
      </Router>
        
      
      
    </div>


  );
}

export default App;
