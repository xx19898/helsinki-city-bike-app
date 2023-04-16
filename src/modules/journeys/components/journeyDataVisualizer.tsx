import { Journey } from "@prisma/client"

type T = Journey
type dataType = 'JOURNEY' | 'STATION'

interface IDataVisualizer{
    data: Journey[],
    keys: string[]
}

export default ({data,keys}:IDataVisualizer) => {

    return(
        <table className="w-full bg-ColumbiaBlue font-thin font-sans h-full overflo-y-scroll">
            <tbody>
                <tr className="font-normal text-white bg-RichBlack h-10">
                    {
                        keys.map((key) => {
                            return(
                                <th className="font-extrabold">{key}</th>
                            )
                        })
                    }
                </tr>
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
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}



