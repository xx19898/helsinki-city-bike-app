import { Journey } from "@prisma/client"

export default({journeys}:{journeys:Journey[]}) => {
    const keys = getJourneyKeys(journeys)


   return {journeyKeys: keys}
   
}

function getJourneyKeys(journeys:Journey[]){
    
    const nonUndefinedJourney = journeys.find(journey => journey != undefined)
    
    if(nonUndefinedJourney != undefined) return capitalLeadingLetterAndSeparateWords(Object.keys(nonUndefinedJourney))
    throw new Error('GetJourneyKeys fails cause the journey server tries to get keys on is undefined')
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

