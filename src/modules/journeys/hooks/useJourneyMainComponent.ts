import { Journey } from "@prisma/client"
import { useState } from "react"
import { api } from "~/utils/api"
import { journeyCursorAtom, journeyDataAtom } from "../atoms/journeyAtoms"
import { useAtom } from "jotai"

export default({journeys}:{journeys:Journey[]}) => {
    const [cursor,setCursor] = useAtom(journeyCursorAtom)
    console.log({cursor})
    const [journeyData,setJourneyData] = useAtom(journeyDataAtom)
    const [shouldFetchAdditionalJourneys,setShouldFetchAdditionalJourneys] = useState(false)
    const {data} = api.journeys.journeyList.useQuery(cursor,{enabled:shouldFetchAdditionalJourneys,onSuccess: ({data,lastId}) => {
        const newDatax = journeyData?.concat(data)
        if(newDatax === undefined) throw new Error()
        console.log({oldData:journeyData})
        console.log({newDataEntries:newDatax})
        console.log({newDatax})
        console.log({dataLength:data.length})
        console.log({newDataLength:newDatax.length})
        setJourneyData(newDatax)
        if(lastId!=null) setCursor(lastId)
        setShouldFetchAdditionalJourneys(false)
    }})
    return {cursor:cursor,setCursor:setCursor,fetchAdditionalJourneys:setShouldFetchAdditionalJourneys}
}
