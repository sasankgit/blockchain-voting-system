
import { useState } from "react";
import {Link} from "react-router-dom";

function Signup(){
    const [username,setUsername] = useState()
    const [password,setPassword] = useState()
    const [confirmpassword,setConfirmpassword] = useState()


    return(
        <div className="bg-white text-black items-center py-4 px-3 rounded-2xl ">
            <form>
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

                  
                
            </form>
            <Link to ="/login" className="text-black ">login page redirect</Link>
        </div>
    )
}
export default Signup;