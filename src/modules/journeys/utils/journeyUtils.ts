import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService";

interface ISortData{
    data: JourneyWithStations[],
    idFilter:number | null,
    chosenReturnStation: string | null,
    chosenDepartureStation: string | null,
    distanceRange: number[],
    durationRange:number[],
}


function sortJourneyData({
    data,idFilter,chosenDepartureStation,
    chosenReturnStation,distanceRange,durationRange
}:ISortData){
    console.log({idFilter})
    console.log({chosenDepartureStation})
    console.log({chosenReturnStation})
    console.log({distanceRange})
    console.log({durationRange})
    let sortedData = sortById({data:data,id:idFilter})
    sortedData = sortByDepartureStation({data:sortedData,chosenDepartureStation:chosenDepartureStation})
    sortedData = sortByReturnStation({data:sortedData,chosenReturnStation:chosenReturnStation})
    return sortedData
}

     function sortById({data,id}:{data:JourneyWithStations[],id:number | null}){
        if(id === null) return data
        return data.filter( journey => journey.id === id)
    }

    function sortByDepartureStation({data,chosenDepartureStation}:{data:JourneyWithStations[],chosenDepartureStation:string | null}){
        if( chosenDepartureStation === null) return data
        return data.filter((journey) => journey.Station_Journey_departureStationIdToStation.name_FIN === chosenDepartureStation)
    }

    function sortByReturnStation({data,chosenReturnStation}:{data:JourneyWithStations[],chosenReturnStation:string | null}){
        if( chosenReturnStation === null ) return data
        return data.filter((journey) => journey.Station_Journey_returnStationIdToStation.name_FIN === chosenReturnStation)
    }

    

export {sortJourneyData}