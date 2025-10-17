
import { useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'

function Signup(){
    const [username,setUsername] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmpassword,setConfirmpassword] = useState()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(password == confirmpassword){
          console.log("hello uwu same")
          axios.post('http://localhost:3001/signup' , { username,email,password})
          .then(result => console.log(result))
          .catch(err => console.log(err))
        } 
        else{
            console.log("hello uwu different")
        } 
    }

    return(
        <div className="bg-white text-black items-center py-4 px-3 rounded-2xl ">
            <form onSubmit={handleSubmit}>
               <div className="text-lg p-4"> 
                <label className="text-x1 font-medium text-red-900">USERNAME:</label>
                <input 
                type = "text"
                placeholder="enter username"
                className="text-amber-950 text-medium "
                onChange={(e) => setUsername(e.target.value)}
                />
               </div>
               <div className="text-lg p-4"> 
                <label className="text-x1 font-medium text-red-900">Email:</label>
                <input 
                type = "text"
                placeholder="enter username"
                className="text-amber-950 text-medium "
                onChange={(e) => SetEmail(e.target.value)}
                />
               </div>
               <div className="text-lg p-4">
               <label className="text-x1 font-medium text-red-900">password</label>
               <input
               type = "password"
               placeholder="enter password"
               onChange={(e) => setPassword(e.target.value)}
               />

               </div>
               <div className="text-lg p-4">
               <label className="text-x1 font-medium text-red-900">confirm password</label>
               <input
               type = "password"
               placeholder="enter password"
               onChange={(e) => setConfirmpassword(e.target.value)}
               />
               </div>
               <div>
                <button className="bg-red-800  text-white  px-5 py-2 rounded-2xl"
                onClick={handleSubmit}>submit</button>
               </div>

                  
                
            </form>
            <Link to ="/login" className="text-black ">login page redirect</Link>
        </div>
    )
}
export default Signup;