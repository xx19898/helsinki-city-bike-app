import { DateTimePicker } from "@mui/x-date-pickers"
import { Autocomplete, Grid, MenuItem, Select, TextField } from "@mui/material"
import { api } from "~/utils/api"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid';
import { AppRouter } from "~/server/api/root";
import stations from "../stations";
import { inferRouterOutputs } from "@trpc/server";
import { checkIfStationCorrect, eliminateStationNameDuplicates } from "~/modules/newJourney/utility";
import Trpc from "../api/trpc/[trpc]";






export default () => {
    const stationNames = api.journeys.stationNamesAndIds.useQuery()

    const createNewJourney = api.journeys.createJourney.useMutation()
    
    
    const stationNameIdMap = useMemo(() => {
        if(stationNames.data){
            const map = new Map<string,number>()
            stationNames.data.forEach(stationNameAndId => map.set(stationNameAndId.name_FIN,stationNameAndId.id))
            return map
        }else{
            return new Map()
        }
    },[stationNames.data])

    const [departureDate,setDepartureDate] = useState<string | null>(null)
    const [returnDate,setReturnDate] = useState<string | null>(null)

    const [departureStation,setDepartureStation] = useState<string | null>(null)
    const [departureStationCorrect,setDepartureStationCorrect] = useState<boolean>(false)

    const [returnStation,setReturnStation] = useState<string | null>(null)
    const [returnStationCorrect,setReturnStationCorrect] = useState<boolean>(false)

    const [distanceIsCorrect,setDistanceIsCorrect] = useState<boolean>(true)
    const [distance,setDistance] = useState<string | null>(null)
    
    if(departureDate != null){
        console.log(
            dayjs(departureDate).format('YYYY-MM-DDTHH:mm:ssZ[Z]')
            )
    }

    if(departureDate != null && returnDate != null){
        const  duration = dayjs(returnDate).diff(dayjs(departureDate),'seconds')
        console.log({duration})
    }
    console.log({returnStation})

    return(
        <div className="min-h-screen w-full bg-ColumbiaBlue text-white">
            <h2 className="mx-auto mt-[400px] text-5xl font-bold text-center w-full">Create a new Journey</h2>
            <form onSubmit={() => console.log('SUBMITTED')} className="mt-10 w-3/4 mx-auto flex flex-col justify-center items-center">
                        <div className="w-full flex md:flex-row  sm:flex-col 
                        items-center justify-stretch gap-2">
                            <div className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Departure Time</label>
                                <DateTimePicker className="w-full" onChange={(newValue) => setDepartureDate(newValue as string)}/>
                            </div>
                            <div className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Return Time</label>
                                <DateTimePicker className="w-full" onChange={(newValue) => setReturnDate(newValue as string)}/>
                            </div>
                        </div>
                        <div className="w-full flex md:flex-row sm:flex-col justify-stretch gap-2 items-stretch">
                        <div className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">
                            <label>Departure Station</label>
                            <Autocomplete className="w-full" renderInput={(params) => <TextField  {...params} label="Name" />}
                            options={stationNames.data ? eliminateStationNameDuplicates(stationNames.data) : []} 
                            onChange={(event,value) => {
                                setDepartureStationCorrect(checkIfStationCorrect(value as string, stationNames.data === undefined ? [] : stationNames.data))
                                setDepartureStation(value)
                            }
                        }
                            
                            />
                        </div>
                        <div className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">   
                            <label>Return Station</label>
                            <Autocomplete className="w-full" renderInput={(params) => <TextField  {...params} label="Name" />}
                            options={stationNames.data ? eliminateStationNameDuplicates(stationNames.data) : []}
                            onChange={(event,value) => {
                                setReturnStationCorrect(checkIfStationCorrect(value as string, stationNames.data === undefined ? [] : stationNames.data))
                                setReturnStation(value)}}
                            />
                        </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <label>Distance</label>
                            <input type="text" className="w-1/2 bg-ColumbiaBlue text-RichBlack rounded-[5px] px-2 py-4 focus:border-0 focus:border-none border-[1px] border-solid border-RichBlack"
                             value={distance === null ? 0 : distance}
                             onChange={(event) => {
                                const isNumber = /^\d+$/.test(event.target.value)

                                    if(isNumber){
                                        console.log('OK')
                                        setDistance(event.target.value)
                                        setDistanceIsCorrect(true)
                                    }else{    
                                        console.log('NOT OK')
                                        setDistance(event.target.value)
                                        setDistanceIsCorrect(false)
                                    }
                                        }} style={{border: distanceIsCorrect === false ? '1px solid #BA1200' : ''}}/> 
                        </div>
                        <button disabled={!dataIsOk({
                            departureDate:departureDate,
                            departureStationIsCorrect:departureStationCorrect,
                            distanceIsCorrect:distanceIsCorrect,
                            returnDate:returnDate,
                            returnStationIsCorrect:returnStationCorrect
                            })}><AddCircleIcon sx={{fontSize:100,color:'#BA1200'}}/></button>
            </form>
        </div>
    )
    function dataIsOk({departureDate,departureStationIsCorrect,distanceIsCorrect,returnDate,returnStationIsCorrect}:{departureDate: string | null,returnDate: string | null,returnStationIsCorrect:boolean,departureStationIsCorrect:boolean,distanceIsCorrect:boolean}){
        return (departureDate != null && returnDate != null && departureStationIsCorrect && returnStationIsCorrect && distanceIsCorrect)
    }
}




