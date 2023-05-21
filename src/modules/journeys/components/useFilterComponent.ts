import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"
import { journeyStationsAtom } from "../atoms/journeyAtoms"
import { type JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"
import { sortJourneyData } from "../utils/journeyUtils"



export default ({journeyData,idFilter}:{journeyData:JourneyWithStations[],idFilter:number | null}) => {
    
    const [distanceRange,setDistanceRange] = useState<number[]>([0,10000])
    const [durationRange,setDurationRange] = useState<number[]>([0,10000])
    const [chosenDepartureStation,setChosenDepartureStation] = useState<string | null>(null)
    const [chosenReturnStation,setChosenReturnStation] = useState<string | null>(null)
    const stations = useAtomValue(journeyStationsAtom)
    console.log({chosenDepartureStation})
    console.log({chosenReturnStation})
    console.log('RERENDERING USEFILTERCOMP')

    const sortedData = useMemo(() => {
        console.log('recomputing')
        return journeyData === null ? [] : sortJourneyData(
            {
                data: journeyData,
                chosenDepartureStation:chosenDepartureStation,
                chosenReturnStation: chosenReturnStation,
                distanceRange: distanceRange,
                durationRange: durationRange,
                idFilter: idFilter,
            }
            )
    },[
        journeyData,
        chosenDepartureStation,
        chosenReturnStation,
        distanceRange,
        durationRange,
        idFilter
    ])

    return {
        distanceRange,setDistanceRange,
        durationRange,setDurationRange,
        stations,
        setChosenDepartureStation,
        setChosenReturnStation,
        chosenDepartureStation,
        chosenReturnStation,
        sortedData
    }
}