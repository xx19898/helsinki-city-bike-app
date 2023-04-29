import { useAtomValue } from "jotai"
import { useState } from "react"
import { journeyStationsAtom } from "../atoms/journeyAtoms"



export default () => {
    
    const [distanceRange,setDistanceRange] = useState<number[]>([0,10000])
    const [durationRange,setDurationRange] = useState<number[]>([0,10000])
    const [chosenDepartureStation,setChosenDepartureStation] = useState<string>('NONE')
    const [chosenReturnStation,setChosenReturnStation] = useState<string>('NONE')
    

    const stations = useAtomValue(journeyStationsAtom)


    return {
        distanceRange,setDistanceRange,
        durationRange,setDurationRange,
        stations,
        setChosenDepartureStation,
        setChosenReturnStation,
        chosenDepartureStation,
        chosenReturnStation,
        
    }
}