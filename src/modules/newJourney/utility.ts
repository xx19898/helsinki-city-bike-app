import { inferRouterOutputs } from "@trpc/server"
import { AppRouter } from "~/server/api/root"

export function eliminateStationNameDuplicates(stationInfo:  inferRouterOutputs<AppRouter>['journeys']['stationNamesAndIds']){
    const names = stationInfo.map(entry => entry.name_FIN)

    return stationInfo.filter((element,index) => {
        return names.indexOf(element.name_FIN) === index
    })
}

export function handleClickSubmit({departureStation,departureDate,distance,returnDate,returnStation}:{
    departureStation:string | null,
    departureDate:string | null,
    returnStation: string | null,
    returnDate: string | null,
    distance:string | null}){
        console.log('dummy')
}

export function checkIfStationCorrect(station:string,stationInfo:  inferRouterOutputs<AppRouter>['journeys']['stationNamesAndIds']){
    return stationInfo.some((stationInfo) => stationInfo.name_FIN === station)
}

export function enteredDataCorrect(
    {
        departureStation,departureDate,distance,returnDate,returnStation}:{
        departureStation:string | null,
        departureDate:string | null,
        returnStation: string | null,
        returnDate: string | null,
        distance:string | null
    }){
       console.log('dummy') 
}