import { Journey, Prisma, PrismaClient } from "@prisma/client"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import DataVisualizer from "~/modules/journeys/components/journeyDataVisualizer"
import SearchIcon from "~/resources/icons/searchIcon"
import { prisma } from "~/server/db"
import useJourneyMainComponent from "../hooks/useJourneyMainComponent"
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"
import { journeyDataAtom } from "../atoms/journeyAtoms"
import { useAtom } from "jotai"

export default () => {
    const [journeyData,setJourneyData] = useAtom(journeyDataAtom)
    const {fetchAdditionalJourneys} = useJourneyMainComponent({journeys:journeyData != null ? journeyData : []})

    return(
        <section className="w-[90%] mt-10 min-h-[50%] bg-BabyBlue rounded-md overflow-hidden">
                <p>{journeyData === null ? 0 : journeyData.length}</p>
                <div className="relative w-[90%] mx-auto bg-white mt-10 rounded-xl">
                <input className="pl-5 w-full h-[3.5rem] focus:outline-none rounded-xl" placeholder="Search by id..."></input>
                <SearchIcon />
                <DataVisualizer data={journeyData} fetchAdditionalJourneys={fetchAdditionalJourneys}/>
                </div>
        </section>
    )
}