import { Journey, Prisma, PrismaClient } from "@prisma/client"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import DataVisualizer from "~/modules/journeys/components/journeyDataVisualizer"
import SearchIcon from "~/resources/icons/searchIcon"
import { prisma } from "~/server/db"
import useJourneyMainComponent from "../hooks/useJourneyMainComponent"
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"
import { journeyDataAtom } from "../atoms/journeyAtoms"
import { useAtom } from "jotai"
import useFilterComponent from "./useFilterComponent"
import { sortData } from "../utils/journeyUtils"
import FilterComponent from "./filterComponent"

export default () => {
    const [journeyData,setJourneyData] = useAtom(journeyDataAtom)
    const {fetchAdditionalJourneys} = useJourneyMainComponent({journeys:journeyData != null ? journeyData : []})
    const {idFilter,onIdInput} = useFilterComponent()
    const sortedData = journeyData === null ? [] : sortData({data:journeyData,idFilter})

    return(
        <section className="w-[90%] mt-10 min-h-[50%] bg-BabyBlue rounded-md overflow-hidden">
                <div className="relative w-[90%] mx-auto bg-white mt-10 rounded-xl">
                <input value={idFilter === null ? '' : idFilter} className="pl-5 w-full h-[3.5rem] focus:outline-none rounded-xl" placeholder="Search by id..." onChange={(e) => onIdInput(e.target.value)}>
                </input>
                <SearchIcon />
                <FilterComponent />
                <DataVisualizer data={sortedData} fetchAdditionalJourneys={fetchAdditionalJourneys} />
                </div>
        </section>
    )
}