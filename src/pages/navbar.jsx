function Navbar(){
    return(
        <nav className="w-full flex justify-between items-center bg-amber-600 p-4 fixed top-0 left-0">
            <h2>the navigation bar</h2>
            <ul className="flex gap-6">
                <li><a href ="home" >Home page here</a></li>
                <li><a href = "testpage">testpageishere</a></li>
                <li><a href = "addcandidate"> add candidate</a></li>
            </ul>
        </nav>
    );
}
export default Navbar;