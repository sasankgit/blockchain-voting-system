import {Link} from 'react-router-dom'


export default function  Home(){
    return(
    <div> 
       <h1 className="text-2xl border-amber-50 ">Hello there</h1>
       <p className="">this is a page for voting using blockchain</p>
       <Link to="/voterpage">voting page</Link>
    </div>
    )
}
