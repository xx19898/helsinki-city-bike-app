import { Journey } from "@prisma/client"
import { useViewport } from "~/common/hooks/useViewport"
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"

interface IDataVisualizer{
    data: JourneyWithStations[],
    keys: {bigScreenKeys:string[],smallScreenKeys:string[]},
    cursor: number,
    setCursor: (newCursor:number) => void,
    handleScrolledToTheBottom : () => void
}

export default ({data,keys,cursor,setCursor,handleScrolledToTheBottom}:IDataVisualizer) => {
    const width = useViewport().width

    const handleScroll = (event:React.UIEvent<HTMLElement>) => {
        if(event.currentTarget === null) throw new Error("problems with scroll on journeys")
        console.log('SCROLLED TO BOTTOM')
        const height = event.currentTarget.clientHeight
        const barHeight = event.currentTarget.scrollHeight
        const scrollTop = event.currentTarget.scrollTop;
        const scrolledInProcents = ((scrollTop + height) / barHeight) * 100
        if(scrolledInProcents === 100) handleScrolledToTheBottom()
      };

    return(
        <>
        {
        width > 1024 ? <table className="w-full bg-ColumbiaBlue font-thin font-sans h-full">
        <tbody>
            <tr className="font-normal text-white bg-RichBlack h-10">
                {
                    keys.bigScreenKeys.map((key) => {
                        return(
                            <th className="font-extrabold">{key}</th>
                        )
                    })
                }
            </tr>
            <div className="w-full h-full overflow-y-scroll" onScroll={(e) => handleScroll(e)}>
            {
                data.map(journey => {
                    return(
                        <tr className="even:bg-AirForceBlue">
                            <th>{journey.id}</th>
                            <th>{journey.departure.toDateString()}</th>
                            <th>{journey.return.toDateString()}</th>
                            <th>{journey.departureStationId}</th>
                            <th>{journey.returnStationId}</th>
                            <th>{journey.coveredDistance}</th>
                            <th>{journey.duration}</th>
                            <th>{journey.Station_Journey_departureStationIdToStation.name_FIN}</th>
                            <th>{journey.Station_Journey_returnStationIdToStation.name_FIN}</th>
                        </tr>
                    )
                })
            }
            </div>
        </tbody>
        </table>
        :
        <table className="w-full bg-ColumbiaBlue font-thin font-sans max-h-[400px] overflow-auto table">
            <thead className="w-full table-header-group"> 
            <tr className="w-full  h-full font-normal text-white bg-EngineeringOrange">
                    {
                        keys.smallScreenKeys.map((key) => {
                            return(
                                <th className="font-extrabold">{key}</th>
                            )
                        })
                    }
            </tr>
            </thead>
            <tbody className="w-full h-[200px] overflow-scroll bg-EngineeringOrange" onScroll={(e) => handleScroll(e)}>
                {
                    data.map(journey => {
                        return(
                            <tr className="even:bg-AirForceBlue h-[2.5rem]">
                                <th>{journey.id}</th>
                                <th>{journey.departure.toDateString()}</th>
                                <th>{journey.return.toDateString()}</th>
                                <th>{journey.coveredDistance}</th>
                                <th>{journey.duration}</th>
                                <th className="overflow-y-scroll">{journey.Station_Journey_departureStationIdToStation.name_FIN}</th>
                                <th className="overflow-y-scroll">{journey.Station_Journey_returnStationIdToStation.name_FIN}</th>
                            </tr>
                        )
                    })
                }
            </tbody>
            </table>
            }
        </>
    )
}

