import { Station } from "@prisma/client";
import StationViewer from "~/modules/stations/components/stationDataVisualizer"
import { prisma } from "~/server/db";



export async function getServerSideProps() {
    const stationsData = await prisma.station.findMany({orderBy:{id:'asc'},take:100})    
    return {
      props: {
        stationsData:stationsData,
      } 
    };
  }

export default (props: {stationsData:Station[]}) => {
    return(
        <div className="min-h-screen w-auto bg-AirForceBlue">
            <h1 className="text-white text-center text-5xl font-bold mt-10 mx-auto">Stations</h1>
            <StationViewer data={props.stationsData}/>
        </div>
    )
}