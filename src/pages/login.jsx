

import React, { useState } from "react";


function Loginpage(){
    const [username,setusername] = useState("");
    const [password,setPassword] = useState("");
    const [error,seterror] = useState("");

    const handlelogin = (e) => {
        e.preventDefault();

        if(username == "user" && password == "user1234"){
            localStorage.setItem("isLoggedIn","true");
            localStorage.setItem("user",JSON.stringify({username}));
            window.location.href = "/home";
            console.log("valid");

        }
        else{
            seterror("Invalid username or password");
            console.log("invalid")
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
                    ></input>

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
        </div>
    );
}
export default Loginpage;