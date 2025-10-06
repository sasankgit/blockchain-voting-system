function Candidate(){
    return(
        <div>
            <h1>candidates for election</h1>
            <form>
                <label>candidate form</label>
                <input
                type="text"
                className="bg-amber-50"
                required
                ></input>
            </form>
            <label className='bg-red-600'>party name</label>
            <input className="bg-black pt-1"></input>
            <button>add candidate</button>

        </div>
    );

}
export default Candidate;