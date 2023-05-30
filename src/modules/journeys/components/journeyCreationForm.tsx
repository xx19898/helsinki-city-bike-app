import { DateTimePicker } from "@mui/x-date-pickers"
import {useMemo, useState} from 'react'
import Autocomplete from "@mui/material/Autocomplete"
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { eliminateStationNameDuplicates } from "~/modules/newJourney/utility"
import { api } from "~/utils/api"

type FormValues = {
    departure: string,
    return : string,
    departureStation:{
        name_FIN:string,
        id: number,
    }
    returnStation:{
        name_FIN:string,
        id: number,
    },
    coveredDistance: number,
}

const defaultValues:FormValues = {
    coveredDistance:0,
    return: '',
    departure:'',
    departureStation:{
        id:0,
        name_FIN: ''
    },
    returnStation:{
        id:0,
        name_FIN:''
    }
}

const JourneyCreationForm = () => {
    const stationNamesAndIds = api.journeys.stationNamesAndIds.useQuery()
    const createJourney = api.journeys.createJourney.useMutation()
    const [render,setRender] = useState(false)

    const {getValues,setValue,reset,formState:{errors,isValid},control,handleSubmit} = useForm<FormValues>( {defaultValues:{...defaultValues},mode:'onChange',reValidateMode: 'onChange'})

    const values = getValues()

    console.log({values})

    const stationNamesAndIdsWithoutDuplicates = useMemo(() => {
        if(stationNamesAndIds.data){
            return eliminateStationNameDuplicates(stationNamesAndIds.data)
        }
    },[stationNamesAndIds])

    const stationNames = useMemo(() => {
        if(stationNamesAndIds.data){
            const names = eliminateStationNameDuplicates(stationNamesAndIds.data).map( value => {
                return {label:value}
            })
            return names
        }
    },[stationNamesAndIds.data])

    return(
        <form onSubmit={handleSubmit(submit)} className="w-full px-10 flex flex-col justify-center items-center">
                        <div className="w-full flex md:flex-row  sm:flex-col 
                        items-center justify-stretch gap-2">
                            <div aria-label='departureTimeContainer' className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Departure Time</label>
                                <Controller 
                                name='departure'
                                control={control}
                                rules={{required:{value:true,message:'Departure date can\'t be empty'}}}
                                render={({field:{name,onChange,value,ref},fieldState}) => {
                                    return(
                                        <>
                                            <DateTimePicker className="w-full" onChange={(newValue:any) => {
                                                console.log({fullObject:newValue})
                                                const dateString = (newValue["$d"] as Date).toISOString()
                                                console.log({departureDate:dateString})
                                                onChange(newValue)
                                                setRender(!render)
                                            }} value={value}/>    
                                        </>
                                    )
                                }}/>
                                </div>
                            <div aria-label='returnTimeContainer' className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                
                                <label>Return Time</label>
                                <Controller 
                                name='return'
                                control={control}
                                rules={{required:{value:true,message:'Return date can\'t be empty'}}}
                                render={({field:{name,onChange,value,ref},fieldState}) => {
                                    return(
                                        <>
                                            <DateTimePicker className="w-full" onChange={(newValue:any) => {
                                                const dateString = (newValue["$d"] as Date).toISOString()
                                                console.log({returnDate:dateString})
                                                onChange(dateString)
                                                setRender(!render)
                                            }}/>    
                                        </>
                                    )
                                }}/>
                            </div>
                        </div>
                        <div className="w-full flex md:flex-row sm:flex-col justify-stretch gap-2 items-stretch">
                        <div aria-label='departure-station-container' className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">
                            <label>Departure Station</label>
                            <Controller 
                                name='departureStation'
                                control={control}
                                rules={{required:{value:true,message:'Departure station can\'t be empty'}}}
                                render={({field:{name,onChange,value,ref},fieldState}) => {
                                    return(
                                        <>
                                            <Autocomplete
                                            className="w-full" 
                                            renderInput={(params) => <TextField  {...params} label="Departure station" />}
                                            getOptionLabel={(object) => object.name_FIN}
                                            options={stationNamesAndIdsWithoutDuplicates ? stationNamesAndIdsWithoutDuplicates : []}
                                            onChange={(event,value) => {
                                                setRender(!render)
                                                setValue('departureStation',value as {id:number,name_FIN:string})}}
                                            />    
                                        </>
                                    )
                            }}/>
                            
                        </div>
                        <div aria-label='return-station-container' className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">   
                            <label>Return Station</label>
                            <Controller 
                                name='returnStation'
                                control={control}
                                rules={{required:{value:true,message:'Departure station can\'t be empty'}}}
                                render={({field:{name,onChange,value,ref},fieldState}) => {
                                    return(
                                        <>
                                            <Autocomplete className="w-full" renderInput={(params) => <TextField  {...params} onChange={onChange} value={value}  error={fieldState.invalid} helperText={fieldState.error?.message} label="Return station" />}
                                            options={stationNamesAndIdsWithoutDuplicates ? stationNamesAndIdsWithoutDuplicates : []} 
                                            getOptionLabel={(option) => option.name_FIN}
                                            onChange={(event,value) => {
                                                setValue('returnStation',value as {id:number,name_FIN:string})
                                                setRender(!render)
                                            }}
                                            />    
                                        </>
                                    )
                            }}/>
                        </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <label>Distance</label>
                            <Controller 
                                name='coveredDistance'
                                control={control}
                                rules={{required:{value:true,message:'Distance can\'t be empty'}}}
                                render={({field:{name,onChange,value,ref},fieldState}) => {
                                    return(
                                        <>
                                            <Input value={value} onChange={onChange} error={fieldState.invalid} />
                                        </>
                                    )
                            }}/>
                        </div>
                        <button disabled={!isValid}><AddCircleIcon sx={{fontSize:100,color:'#BA1200'}}/></button>
            </form>
    )

    function submit(props:FormValues){
        const returnDate = new Date(props.return)
        const departureDate = new Date(props.departure)
        const duration = dayjs(props.return).diff(dayjs(props.departure),'seconds')
     //   createJourney.mutate({...props,return:returnDate,departure:departureDate,duration:duration})
    }


}

export default JourneyCreationForm