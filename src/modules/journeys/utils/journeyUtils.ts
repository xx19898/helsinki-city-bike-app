import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService";


export function sortData({data,idFilter}:{data: JourneyWithStations[],idFilter:number | null}){
    data = idFilter === null ? data : data.filter( journey => journey.id === idFilter)
    return data 
}