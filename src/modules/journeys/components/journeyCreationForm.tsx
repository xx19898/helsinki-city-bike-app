import dayjs from "dayjs"
import { Controller, useForm } from "react-hook-form"
import { api } from "~/utils/api"

type FormValues = {
    departure: string,
    return: string,
    departureStationId:number,
    returnStationId:number,
    coveredDistance: number,
}


const JourneyCreationForm = () => {
    const createJourney = api.journeys.createJourney.useMutation()
    const {getValues,reset,formState:{errors,isValid},control,handleSubmit} = useForm<FormValues>({defaultValues:{
        coveredDistance:0,
        departure:'XX-XX',
        return:'XX-XX',
        departureStationId:0,
        returnStationId:0,
    },
    mode:'onChange',
    reValidateMode: 'onChange'
})
    function submit(props:FormValues){
        const returnDate = new Date(props.return)
        const departureDate = new Date(props.departure)
        const duration = dayjs(props.return).diff(dayjs(props.departure),'seconds')
        createJourney.mutate({...props,return:returnDate,departure:departureDate,duration:duration})
    }

    return(
        <form onSubmit={handleSubmit(submit)} className="w-full flex flex-col justify-center items-center">
                        <div className="w-full flex md:flex-row  sm:flex-col 
                        items-center justify-stretch gap-2">
                            <div aria-label='departureTimeContainer' className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Departure Time</label>
                                <Controller />
                                <DateTimePicker className="w-full" onChange={(newValue) => setDepartureDate(newValue as string)}/>
                            </div>
                            <div aria-label='returnTimeContainer' className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                
                                <label>Return Time</label>
                                <DateTimePicker className="w-full" onChange={(newValue) => setReturnDate(newValue as string)}/>
                            </div>
                        </div>
                        <div className="w-full flex md:flex-row sm:flex-col justify-stretch gap-2 items-stretch">
                        <div aria-label='departure-station-container' className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">
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
                        <div aria-label='return-station-container' className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">   
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
    )


}

export default JourneyCreationForm