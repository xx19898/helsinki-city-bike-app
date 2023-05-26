import { Input, TextField } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";
import { api } from "~/utils/api";
import StationCreationForm from "~/modules/stations/components/stationCreationForm";


export default function NewStation(){
    const createNewStation = api.stations.createStation.useMutation()

    return(
        <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center text-RichBlack">
            <h2 className="font-bold text-4xl mx-auto mb-10">Create a new station</h2>
            <StationCreationForm onSubmit={() => console.log()}/>
        </div>
    )

}




/*



const [name,setName] = useState<string | null>(null)
    const [address,setAddress] = useState<string | null>(null)
    const [xy,setXY] = useState<{x:number | null,y: number | null}>({x:null,y:null})
    const [fId,setFId] = useState<number | null>(null)
    const [id,setId] = useState<number | null>(null)
    const [operator,setOperator] = useState<string | null>(null)
    const [capacity,setCapacity] = useState<number | null>(null)
    const [city,setCity] = useState<string | null>(null)

    const [cityIsCorrect,setCityIsCorrect] = useState<boolean>(false)
    const [nameIsCorrect,setNameIsCorrect] = useState<boolean>(false)
    const [addressIsCorrect,setAddressIsCorrect] = useState<boolean>(false)
    const [xyIsCorrect,setXYIsCorrect] = useState<boolean>(false)
    const [fIdIsCorrect,setFidIsCorrect] = useState<boolean>(false)
    const [idIsCorrect,setIdIsCorrect] = useState<boolean>(false)
    const [operatorIsCorrect,setOperatorIsCorrect] = useState<boolean>(false)
    const [capacityIsCorrect,setCapacityIsCorrect] = useState<boolean>(false)

    const allDataIsCorrect = (
        nameIsCorrect && addressIsCorrect && xyIsCorrect && fIdIsCorrect
        && idIsCorrect && operatorIsCorrect && capacityIsCorrect)
    
    return(
        <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center text-RichBlack">
            <h2 className="font-bold text-4xl mx-auto mb-10">Create a new station</h2>
            <form onSubmit={() => {
                if(allDataIsCorrect) createNewStation.mutate({
                    address:address as string,capacity: capacity as number,city_FIN:city as string,
                    city_SWE:city as string,fId:fId as number,id: id as number,name_ENG: name as string,
                    name_FIN: name as string,name_SWE: name as string,operator: operator as string,
                    x:xy.x as number,y: xy.y as number
                })
                }} className="sm:w-full md:w-1/2 md:grid md:grid-cols-2 md:gap-y-4 sm:gap-y-4 sm:flex sm:flex-col sm:justify-center sm:items-stretch">
                    <TextField className="px-6 w-full mx-auto" onChange={(e) => validateAndSetStringProperty(e.target.value,setNameIsCorrect,setName)} placeholder="Name"/>
                    <TextField className="px-6 w-full mx-auto" onChange={(e) => validateAndSetStringProperty(e.target.value,setAddressIsCorrect,setAddress)}
                        placeholder='Address' />
                    <TextField className="px-6 w-full mx-auto" placeholder='Operator'
                    onChange={(e) => validateAndSetStringProperty(e.target.value,setOperatorIsCorrect,setOperator)} />
                    <TextField className="px-6 w-full mx-auto" placeholder='City'  onChange={(e) => validateAndSetStringProperty(e.target.value,setCityIsCorrect,setCity)}/>
                    <div className="w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>fId</label>
                        <Input className='w-full p-2' value={fId === null ? '' : fId} onChange={(e) => {
                            if(new RegExp('^[0-9]*$').test(e.target.value)){
                                console.log('true')
                                setFId(parseInt(e.target.value))
                            }
                        }} type='number' />
                    </div>
                    <div className="w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>Id</label>
                        <Input className='w-full p-2' type='number' />
                    </div>
                    <div className="w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>Capacity</label>
                        <Input className='w-full p-2' type='number' />
                    </div>
                    <div className="w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>X</label>
                        <Input className='w-full p-2' type='number'/>
                    </div>
                    <div className="w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>Y</label>
                        <Input className='w-full p-2' type='number'/>
                    </div>
                    <button disabled={!allDataIsCorrect}>
                        <AddCircleIcon sx={{fontSize:100,color:'#BA1200'}}/>
                    </button>
            </form>
        </div>
    )

    function validateAndSetStringProperty(newValue:string,setIsCorrect: (status:boolean) => void, setFunction: (newValue: string) => void ){
        if(newValue.length === 0){
            setIsCorrect(false)
        }else{
            setIsCorrect(true)
        }
        setFunction(newValue)
    }

    */