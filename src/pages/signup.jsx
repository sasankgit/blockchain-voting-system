

function Signup(){
    return(
        <div className="bg-white text-black items-center py-4 px-3">
            <form>
               <div className="text-lg p-4"> 
                <label className="text-x1 font-medium text-red-900">USERNAME:</label>
                <input 
                type = "text"
                placeholder="enter username"
                className="text-amber-950 text-medium "
                />
               </div>
               <div className="text-lg p-4">
               <label className="text-x1 font-medium text-red-900">password</label>
               <input
               type = "password"
               placeholder="enter password"
               
               
               />
               </div>
               
                
            </form>
        </div>
    )
}
export default Signup;