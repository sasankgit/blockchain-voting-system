

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Createuser(){
    
}


function Loginpage({onLogin}){
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [error,seterror] = useState("");

    const handlelogin = (e) => {
        e.preventDefault();

        if(username == "user" && password == "user1234"){
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("user",JSON.stringify({username}));
            
            console.log("valid");
            onLogin && onLogin();

        }
        else{
            seterror("Invalid username or password");
            console.log("invalid");
            alert("invalid credential");
        }
    };





    return(
        <div>
            <h1 className="fixed left-12 top-20">Login page</h1>
            <form onSubmit={handlelogin}>
                <div className="fixed top-45 left-20">
                    <label className="fixed left-20">the username</label>
                    <input 
                    type="text"
                    className="pt-4 bg-green-200 fixed left-45 text-black"
                    value={username}
                    onChange = {(e) => setusername(e.target.value)}
                    />

                </div>
                <div  >
                    <label>password</label>
                    <input
                    type ="text"
                    value = {password}
                    className="pt-5 bg-red-400  "
                    onChange = {(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit"
                className="w-full bg-pink-400 pt3 text-shadow-white"
                >submit form

                </button>


            </form>
            <Link to = "/signup">signup page</Link>
        </div>
    );
}
export default Loginpage;