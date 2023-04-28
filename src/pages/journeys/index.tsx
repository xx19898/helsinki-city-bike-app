import { Journey } from "@prisma/client"
import { useAtom, } from "jotai"
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import { journeyCursorAtom, journeyDataAtom, journeyStationsAtom } from "~/modules/journeys/atoms/journeyAtoms"
import JourneyMainComponent from "~/modules/journeys/components/journeyMainComponent"
import { JourneyWithStations, getFirstHundredJourneys, getUniqueStationNames } from "~/server/service/dataAccessService/dataAccessService"

export const getServerSideProps: GetServerSideProps<{ journeys: JourneyWithStations[],stationNames:string[] }> = async (context:GetServerSidePropsContext) => {
    const data = await getFirstHundredJourneys()
    const uniqueStationNames = await getUniqueStationNames()

    return {
        props:{
            journeys: data,
            stationNames: uniqueStationNames
        }
    }
}

const JourneysViewerPage = ({journeys,stationNames}:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    useHydrateAtoms([[journeyDataAtom, journeys]])
    useHydrateAtoms([[journeyCursorAtom, journeys[journeys.length - 1]?.id]])
    useHydrateAtoms([[journeyStationsAtom,stationNames]])
    
    return(
        <div className="w-full min-h-screen h-[500px] flex flex-col justify-center items-center overflow-auto">
            <JourneyMainComponent/>
        </div>
        )
}

export default JourneysViewerPage