import { useRef, useState } from "react";
import ReactSlider from "react-slider"
import rangeSlider from './rangeSlider.module.css'
import { Slider } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const palette = {
    primary: { main: '#BA1200',light: '#031927',dark:'#9DD1F1','contrastText':'#508AA8'},
    secondary: { main: '#542d4d' },
  };
  
  const themeName = 'hcbaTheme';
  
  export const theme = createTheme({ palette })

interface IRangeSlider{
    min: number,
    max: number,
    value: number[],
    valueCallback: (newValue:number[]) => void,
}

export default ({max,min,value,valueCallback}:IRangeSlider) => {
    
    
    const MIN_DIST = 1

    function handleChange(
        event:Event,
        newValue: number | number[],
        activeThumb:number
    ){
        if(!Array.isArray(newValue)) return
        if(newValue[0] === undefined || newValue[1] === undefined) return
        
        if(activeThumb === 0){
            valueCallback([Math.min(newValue[0],value[1] as number - MIN_DIST),value[1] as number])
        }else{
            valueCallback([value[0] as number,Math.max(newValue[1],value[0] as number + MIN_DIST)])
        }
    }
    
    return(
        <ThemeProvider theme={theme}>
            <Slider
            getAriaLabel={() => 'Temperature range'}
            defaultValue={[0,100]}
            value={value}
            disabled={false}
            min={min}
            max={max}
            onChange= {handleChange}
            valueLabelDisplay="auto"
            />
        </ThemeProvider>        
    )
}