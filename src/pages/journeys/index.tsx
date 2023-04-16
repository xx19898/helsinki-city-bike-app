import { Journey } from "@prisma/client"
import { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import JourneyMainComponent from "~/modules/journeys/components/journeyMainComponent"
import { getFirstHundredJourneys } from "~/server/service/dataAccessService/dataAccessService"

interface IData {journeys: Journey[]}

export const getServerSideProps: GetServerSideProps<{ journeys: Journey[] }> = async (context:GetServerSidePropsContext) => {
    const data = await getFirstHundredJourneys()
    return {
        props:{
            journeys:data
        }
    }
}

const JourneysViewerPage = ({journeys}:InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return(
        <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center">
            <JourneyMainComponent journeys={journeys}/>
        </div>
        )}

export default JourneysViewerPage