import { Autocomplete, TextField } from "@mui/material"
import { type SyntheticEvent, useMemo } from "react"
import RangeSlider from "~/common/components/rangeSlider/rangeSlider"


interface RangeSlider{
    distanceSetValueCallback: (newValue:number[]) => void,
    distanceValue: number[],

    setDurationCallback: (newValue:number[]) => void,
    durationValue: number[],

    stations: string[]

    setChosenDepartureStation: (newValue:string | null) => void,
    setChosenReturnStation: (newValue:string | null) => void,
}

export default function FilterComponent({
    distanceSetValueCallback,
    distanceValue,durationValue,
    setDurationCallback,stations,
    setChosenDepartureStation,setChosenReturnStation
}:RangeSlider){
    const stationLabels = useMemo(() => {
        const formattedStations =  stations.map(station => { return {label:station}})
        return formattedStations
    },[stations])

    return(
    <section className="w-full text-RichBlack flex flex-col justify-center items-center px-[2em]">
                <div className="w-full sm:flex sm:flex-col justify-center items-center md:flex-row">
                    <div className="w-full mx-4 flex flex-col justify-center items-center">
                        <span>Duration</span>
                        <RangeSlider min={0} max={10000} value={durationValue} valueCallback={setDurationCallback}/>    
                    </div>
                    <div className="w-full mx-4 flex flex-col justify-center items-center">
                        <span>Distance</span>
                        <RangeSlider max={10000} min={0} valueCallback={distanceSetValueCallback} value={distanceValue} />
                    </div>
                </div>
                <div className="w-full sm:flex sm:flex-col sm:gap-10 justify-center items-center md:flex-row my-4">
                    <Autocomplete
                    disablePortal
                    placeholder="Departure Station"
                    id="combo-box-demo"
                    onChange={(event:SyntheticEvent<Element, Event>,value: {label:string} | null) => {
                        if(value === null) setChosenDepartureStation(null)
                        else if(value != null) setChosenDepartureStation(value.label)
                        }}
                    
                    options={stationLabels}
                    sx={{ width: '100%', }}
                    renderInput={(params:any) => <TextField onChange={(e) => setChosenDepartureStation(e.target.value)} {...params} label="Departure Station" onCl />}
                    />
                    <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    placeholder="Return Station"
                    onChange={(event:SyntheticEvent<Element, Event>,value: {label:string} | null) => {
                        if(value === null) setChosenReturnStation(null)
                        else if(value != null) setChosenReturnStation(value.label)
                        }}
                    options={stationLabels}
                    sx={{ width: '100%' }}
                    renderInput={
                        (params:any) => <TextField {...params} onChange={(e) => setChosenReturnStation(e.target.value)} label="Return Station" />
                    }
                    />  
                </div>
    </section>    
    )


}