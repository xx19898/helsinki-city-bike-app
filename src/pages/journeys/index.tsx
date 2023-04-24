import { Journey } from "@prisma/client"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
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
    return(
        <div className="w-full min-h-screen h-[500px] flex flex-col justify-center items-center overflow-auto">
            <JourneyMainComponent journeys={journeys}/>
        </div>
        )}

export default JourneysViewerPage