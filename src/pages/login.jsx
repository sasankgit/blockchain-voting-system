

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'




function Loginpage({onLogin}){
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    
    const sasankdirect = useNavigate();

    const handlelogin = (e) => {
        e.preventDefault();

        axios.post(`${import.meta.env.VITE_CONNECTION}/login`, {username,password})
        .then(result =>{
            console.log("the login is searched" + result.data)
            if(result.data.status === "success"){
                sasankdirect("/home")
            }
            else{
                console.log("error inside catched at frontend")
            }

        })
        .catch(console.log("error outside dude catched at frontend"))

    };





    return(
        <div>
            <h1 className="fixed left-12 top-20">Login page</h1>
            <form onSubmit={handlelogin}>
                <div  className="p-4 ">
                    <label className="text-4xl text-amber-500">username</label>
                    <input 
                    type="text"
                    className="pt-4 bg-green-200 text-black rounded-2xl shadow-2xl"
                    value={username}
                    onChange = {(e) => setusername(e.target.value)}
                    />

                </div>
                <div  className = "p-4">
                    <label className="text-4xl text-bold text-amber-500 ">password</label>
                    <input
                    type ="text"
                    value = {password}
                    className="pt-5 bg-red-400 rounded-2xl bg-red-600 "
                    onChange = {(e) => setPassword(e.target.value)}/>
                </div>
                <div>
                  <button type="submit"
                  className="p-4  w-full bg-red-400 pt3 text-shadow-white rounded-3xl"
                  >submit 

                  </button>
                </div>


            </form>
            <Link to = "/signup">signup page</Link>
        </div>
    );
}
export default Loginpage;