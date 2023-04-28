import { Grid } from "@mui/material"
import RangeSlider from "~/common/components/rangeSlider/rangeSlider"


interface RangeSlider{
    distanceSetValueCallback: (newValue:number[]) => void,
    distanceValue: number[],

    setDurationCallback: (newValue:number[]) => void,
    durationValue: number[],

    stations: string[]
}
export default ({distanceSetValueCallback,distanceValue,durationValue,setDurationCallback,stations}:RangeSlider) => {

    return(
    <section className="w-full text-RichBlack flex flex-col justify-center items-center">
        <Grid container justifyContent={'center'} alignItems={'center'} width={'100%'} className="w-full">
            <Grid container xs={10} gap={1} direction={'column'} sm={10} md={12}  justifyContent={'center'} alignItems={'center'} width={'100%'}>
                <span>Duration</span>
                <RangeSlider min={0} max={10000} value={durationValue} valueCallback={setDurationCallback}/>
                <span>Distance</span>
                <RangeSlider max={10000} min={0} valueCallback={distanceSetValueCallback} value={distanceValue}/>
                <span>Departure Station</span>
                
                <span>Return Statio</span>
            </Grid>
        </Grid>
    </section>    
    )
}

            //Departure Station

            //Return Station

            //Departure

            //Return
