import { Journey } from "@prisma/client"
import { useAtom, } from "jotai"
import { useHydrateAtoms } from 'jotai/utils'
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import { useEffect } from "react"
import { journeyCursorAtom, journeyDataAtom } from "~/modules/journeys/atoms/journeyAtoms"
import JourneyMainComponent from "~/modules/journeys/components/journeyMainComponent"
import { JourneyWithStations, getFirstHundredJourneys } from "~/server/service/dataAccessService/dataAccessService"

export const getServerSideProps: GetServerSideProps<{ journeys: JourneyWithStations[] }> = async (context:GetServerSidePropsContext) => {
    const data = await getFirstHundredJourneys()
    return {
        props:{
            journeys: data
        }
    }
}

const JourneysViewerPage = ({journeys}:InferGetServerSidePropsType<typeof getServerSideProps>) => {

    useHydrateAtoms([[journeyDataAtom, journeys]])
    useHydrateAtoms([[journeyCursorAtom, journeys[journeys.length - 1]?.id]])
    
    return(
        <div className="w-full min-h-screen h-[500px] flex flex-col justify-center items-center overflow-auto">
            <JourneyMainComponent/>
        </div>
        )}

export default JourneysViewerPage