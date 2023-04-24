import { Journey } from "@prisma/client"
import { useState } from "react"
import { api } from "~/utils/api"
import { journeyDataAtom } from "../atoms/journeyAtoms"
import { useAtom } from "jotai"

export default({journeys}:{journeys:Journey[]}) => {
    const keys = getJourneyKeys(journeys)
    const [cursor,setCursor] = useState(100)
    const [journeyData,setJourneyData] = useAtom(journeyDataAtom)
    async function handleScrollToTheBottom(){
    
        const newData = await api.journeys.journeyList.useQuery(cursor + 100).data
        if(newData != undefined){
            setJourneyData(newData)
            setCursor(cursor + 100)
        }
        else{
            throw new Error("Fetching journey data from the server when scrolled to the bottom of the list went wrong")
        }
    }

    return {journeyKeys: keys,cursor:cursor,setCursor:setCursor,handleScrollToTheBottom: handleScrollToTheBottom}
}

function getJourneyKeys(journeys:Journey[]){
    
    const nonUndefinedJourney = journeys.find(journey => journey != undefined)
    
    return  {
        bigScreenKeys: 
        ['Id','Departure','Return',
        'Departure Station Id','Return Station Id',
        'Distance',
        'Duration','Departure Station Name',
        'Return Station Name'],
        smallScreenKeys:
        ['Id','Departure','Return',
        'Distance','Duration','Departure Station',
        'Return Station'],
    }
}



export function capitalLeadingLetterAndSeparateWords(keys:string[]){
    return keys.map((key) => {
        let keyCopy = key.charAt(0).toUpperCase() + key.slice(1,key.length)

        for(let i = 0;i < keyCopy.length;i++){ 
            if(i != 0 && keyCopy[i] === keyCopy[i]?.toUpperCase()){
                keyCopy = keyCopy.slice(0,i) + " " + keyCopy.slice(i,keyCopy.length)
                i++
            }
        }
        return keyCopy
    })
}

