import { DateTimePicker } from "@mui/x-date-pickers"
import { Autocomplete, Grid, MenuItem, Select, TextField } from "@mui/material"
import { api } from "~/utils/api"
import AddCircleIcon from '@mui/icons-material/AddCircle';





export default () => {
    const stationNames = api.journeys.stationNames.useQuery()
    
    if(stationNames.isFetched){
        stationNames.data
    }

    return(
        <div className="min-h-screen w-full bg-ColumbiaBlue text-white">
            <h2 className="mx-auto text-5xl font-bold text-center w-full">Create a new Journey</h2>
            <form className="mt-10 w-3/4 mx-auto flex flex-col justify-center items-center">
                        <div className="w-full flex md:flex-row  sm:flex-col 
                        items-center justify-stretch gap-2">
                            <div className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Departure Time</label>
                                <DateTimePicker className="w-full"/>
                            </div>
                            <div className="w-1/2 sm:w-full flex flex-col justify-center items-center">
                                <label>Return Time</label>
                                <DateTimePicker className="w-full"/>
                            </div>
                        </div>
                        <div className="w-full flex md:flex-row sm:flex-col justify-stretch gap-2 items-stretch">
                        <div className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">
                            <label>Departure Station</label>
                            <Autocomplete className="w-full" renderInput={(params) => <TextField  {...params} label="Name" />}
                            options={stationNames.data ? stationNames.data.map(entry => entry.name_FIN) : []} />
                        </div>
                        <div className="sm:w-full md:w-1/2 flex flex-col justify-stretch items-center">   
                            <label>Departure Station</label>
                            <Autocomplete className="w-full" renderInput={(params) => <TextField  {...params} label="Name" />}
                            options={stationNames.data ? stationNames.data.map(entry => entry.name_FIN) : []} />
                        </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-center">
                            <label>Distance</label>
                            <TextField className="w-full"/> 
                        </div>
                        <button><AddCircleIcon sx={{fontSize:100,color:'#BA1200'}}/></button>
            </form>
        </div>
    )
} 