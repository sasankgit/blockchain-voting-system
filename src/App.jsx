
import Home from './pages/home.jsx'
import Navbar from './pages/navbar.jsx'
import Basic from './pages/testpage.jsx'


import{BrowserRouter as Router,Routes,Route} from "react-router-dom";

import './App.css'

function App() {

  return (
    <div>
      
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/testpage" element={<Basic/>}/>
        </Routes>
      </Router>  
      
      
    </div>


  );
}

export default App
