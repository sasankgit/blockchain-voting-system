import {Link} from "react-router-dom";

function Redirect(){

    return(
        <div>
            <Link to = "/signup">
              <button className="bg-amber-900 p-4 fixed left- rounded-2xl">signup page</button>
            </Link>
            <Link to = "/login">
              <button className="bg-amber-900 p-4 fixed left-160 rounded-2xl" >Login page</button>
            </Link>
        </div>
    );
}
export default Redirect;