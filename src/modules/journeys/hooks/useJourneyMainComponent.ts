import { Journey } from "@prisma/client"
import { useState } from "react"
import { api } from "~/utils/api"
import { journeyCursorAtom, journeyDataAtom, journeyStationsAtom } from "../atoms/journeyAtoms"
import { useAtom, useAtomValue } from "jotai"

export default() => {
    const [idFilter, setIdFilter] = useState<number | null>(null)
    const [cursor,setCursor] = useAtom(journeyCursorAtom)
    const [journeyData,setJourneyData] = useAtom(journeyDataAtom)
    const stations = useAtomValue(journeyStationsAtom)
    const [shouldFetchAdditionalJourneys,setShouldFetchAdditionalJourneys] = useState(false)
    
    const {data} = api.journeys.journeyList.useQuery(cursor,{enabled:shouldFetchAdditionalJourneys,onSuccess: ({data,lastId}) => {
        const newDatax = journeyData?.concat(data)
        if(newDatax === undefined) throw new Error()
        setJourneyData(newDatax)
        if(lastId!=null) setCursor(lastId)
        setShouldFetchAdditionalJourneys(false)
    }})

    function onIdInput(input:string){
        if(input === '') setIdFilter(null)
        if(typeof input != 'string') return false
        if(!isNaN(parseInt(input)) && !isNaN(parseFloat(input))) setIdFilter(parseInt(input)) 
    }

    return {
        cursor:cursor,setCursor:setCursor,
        fetchAdditionalJourneys:setShouldFetchAdditionalJourneys,
        journeyData:journeyData,
        onIdInput,idFilter
    }
}
