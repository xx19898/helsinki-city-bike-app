import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService";

interface ISortData{
    data: JourneyWithStations[],
    idFilter:number | null,
    chosenReturnStation: string,
    chosenDepartureStation: string,
    distanceRange: number[],
    durationRange:number[],
}

export function sortData({data,idFilter,chosenDepartureStation,chosenReturnStation,distanceRange,durationRange}:ISortData){
    data = idFilter === null ? data : data.filter( journey => journey.id === idFilter)
    return data 
}