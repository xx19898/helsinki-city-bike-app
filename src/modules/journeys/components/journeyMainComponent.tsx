import SearchIcon from "~/modules/icons/searchIcon"

//TODO: set in initial batch of journeys on serverside(static props), 
//TODO: then make it so that when user scrolls down to the bottom of the list, the next batch is loaded.
//TODO: then make it so that when user types in id, we check the already existing journeys and display 
//TODO: it if it is amongst those, otherwise make a query to the database

export default () => {

    return(
        <section className="w-[90%] mt-10 min-h-screen h-auto bg-BabyBlue rounded-md">
                <div className="relative w-[90%] mx-auto bg-white mt-10 rounded-xl">
                <input className="pl-5 w-full h-[3.5rem] focus:outline-none rounded-xl" placeholder="Search by id..."></input>
                <SearchIcon />
                </div>
                <ul>

                </ul>
                
        </section>
    )
}