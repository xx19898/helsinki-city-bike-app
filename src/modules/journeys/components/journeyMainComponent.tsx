import { Journey, Prisma, PrismaClient } from "@prisma/client"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import DataVisualizer from "~/modules/journeys/components/journeyDataVisualizer"

import SearchIcon from "~/resources/icons/searchIcon"
import { prisma } from "~/server/db"
import useJourneyMainComponent from "../hooks/useJourneyMainComponent"


//TODO: set in initial batch of journeys on serverside(static props), 
//TODO: then make it so that when user scrolls down to the bottom of the list, the next batch is loaded.
//TODO: then make it so that when user types in id, we check the already existing journeys and display 
//TODO: it if it is amongst those, otherwise make a query to the database


export default (props:{journeys:Journey[]}) => {
    console.log({journeyData:props.journeys})
    const {journeyKeys} = useJourneyMainComponent({journeys:props.journeys})

    return(
        <section className="w-[90%] mt-10 min-h-screen h-auto bg-BabyBlue rounded-md">
                <div className="relative w-[90%] mx-auto bg-white mt-10 rounded-xl">
                <input className="pl-5 w-full h-[3.5rem] focus:outline-none rounded-xl" placeholder="Search by id..."></input>
                <SearchIcon />
                <DataVisualizer data={props.journeys} keys={journeyKeys}/>
                </div>
        </section>
    )
}