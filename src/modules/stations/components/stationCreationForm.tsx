import { TextField } from '@mui/material'
import {useForm, Controller } from 'react-hook-form'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { api } from '~/utils/api';
import { useDebouncedCallback } from 'use-debounce';

interface IStationCreationForm{
    onSubmit: () => void
}

interface IDebounced{
    function: () => void,
}

type FormValues = {
    name: string,
    address:string,
    operator:string,
    city:string,
    id: number,
    fId: number,
    x:number,
    y:number,
    capacity:number
}

export default function StationCreationForm({onSubmit}:IStationCreationForm){

    const { clearErrors,getFieldState,getValues,reset,formState:{errors,isValid},control,setError,handleSubmit } = useForm({
        defaultValues: {
            name: '',
            address:'',
            operator:'',
            city:'',
            id: 1,
            fId: 1,
            x:1,
            y:1,
            capacity:1
        },
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const createStation = api.stations.createStation.useMutation()

    const checkForStationsWithSameFid = api.stations.checkForStationsWithSameFid.useMutation()

    const checkForStationsWithSameName = api.stations.checkForStationsWithSameName.useMutation()
    
    const checkForStationsWithSameId = api.stations.checkForStationsWithSameId.useMutation()

    const debounceCheckForStationWithSameFid = useDebouncedCallback((newFid:number) => validateFid(newFid),1000)
    
    const debounceCheckForStationWithSameName = useDebouncedCallback((newName:string) => validateName(newName),1000)
    
    const debounceCheckForStationWithSameId = useDebouncedCallback((newId:number) => validateId(newId),1000)
    
    async function validateFid(fId: number){
        const fIdIsTaken = await checkForStationsWithSameFid.mutateAsync({fId:fId})
        if(fIdIsTaken){
            setError('fId',{type:'fIdIsAlreadyTaken',message:'Sorry, but this fId is already taken, please take another one'})
            }else{
            clearErrors('fId')
        }   
    }

    async function validateName(newName:string){
        const nameIsTaken = await checkForStationsWithSameName.mutateAsync(newName)
        if(nameIsTaken){
            setError('name',{type:'NameAlreadyTaken',message:'Sorry, but this name is already taken, please take another one'})
        }else{
            clearErrors('name')
        } 
    }

    async function validateId(newId:number){
        const idIsTaken = await checkForStationsWithSameId.mutateAsync(newId)
        if(idIsTaken){
            setError('id',{type:'IdAlreadyInUse',message:'Sorry, but this id is already in use. Please choose another one'})
        }else{
            clearErrors('id')
        }
    }

    const buttonColor = isValid ? '#BA1200' : ''

    function submit(props:FormValues){
        console.log({
            address:props.address,
            capacity:props.capacity,
            city_FIN:props.city,
            city_SWE:props.city,
            fId:props.fId,
            id:props.id,
            name_ENG:props.city,
            name_FIN:props.name,
            name_SWE:props.name,
            operator:props.operator,
            x:props.x,
            y:props.y})
       // reset()
    }
    
    return(
        <form 
        onSubmit={handleSubmit(submit)}
        className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:w-full sm:px-[10%] sm:gap-4">
            <Controller
                name='name'
                control={control}
                rules={{required:{message: 'Name can\'t be empty',value:true}}}
                render={({field:{name,onChange,value,onBlur,ref},fieldState}) => {
                    return(
                        <>
                            <label>Name</label>
                            <TextField
                            className='w-full' 
                            inputProps={{"aria-label":'NameInput'}}
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={(e) => {
                                const newName = e.target.value
                                onChange(newName)
                                debounceCheckForStationWithSameName(newName)
                                }} name={name} inputRef={ref}  />
                        </>
                    )
                }}/>
            <Controller
                name='address'
                control={control}
                rules={{required:{message: 'Address can\'t be empty',value:true}}}
                render={({field:{name,onChange,value,onBlur,ref},fieldState}) => {
                    return(
                        <>
                            <label>Address</label>
                            <TextField
                            className='w-full'
                            inputProps={{'aria-label':'AddressInput'}} 
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={onChange} name={name} inputRef={ref}  /> 
                        </>
                    )
                }}/>
            <Controller
                name='operator'
                control={control}
                rules={{required:{message: 'Operator name can\'t be empty',value:true}}}
                render={({field:{name,onChange,value,onBlur,ref},fieldState}) => {
                    return(
                        <>
                            <label>Operator</label>
                            <TextField
                            className='w-full'
                            inputProps={{'aria-label':'OperatorInput'}}
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={onChange} name={name} inputRef={ref}  />
                            
                        </>
                    )
                }}/>
            <Controller
                name='city'
                control={control}
                rules={{required:{message: 'City name can\'t be empty',value:true}}}
                render={({field:{name,onChange,value,onBlur,ref},fieldState}) => {
                    return(
                        <>
                            <label>City</label>
                            
                            <TextField
                            inputProps={{'aria-label':'City'}}
                            className='w-full' 
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={onChange} name={name} inputRef={ref}  />
                            
                        </>
                    )
                }}/>
            <Controller
                name='id'
                control={control}
                rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                render={({field:{name,onChange,value,ref},fieldState}) => {
                    return(
                        <>
                            <label>Id</label>
                            <TextField
                            inputProps={{'aria-label':'IdInput'}}
                            className='w-full' 
                            type='number'
                            variant='filled'
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            onChange={(e) => {
                                
                                const newId = e.target.value
                                if(isNumber(newId)){
                                    debounceCheckForStationWithSameId(parseInt(newId))
                                }else{
                                    clearErrors('id')
                                    console.log('Id should be a number')
                                }
                            }} name={name} inputRef={ref} />
                        </>
                    )
                }}/>
                <Controller
                name='fId'
                control={control}
                rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                render={({field:{name,onChange,value,ref},fieldState}) => {
                    return(
                        <>
                            <label>fId</label>
                            <TextField
                            inputProps={{'aria-label':'FidInput'}}
                            className='w-full' 
                            type='number'
                            variant='filled'
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            onChange={(e) => {
                                const newValue = e.target.value
                                onChange(newValue)
                                if(isNumber(newValue)){
                                    debounceCheckForStationWithSameFid(parseInt(newValue))
                                }else{
                                    console.log('Invalid fId value')
                                }
                            }} name={name} inputRef={ref} />
                        </>
                    )
                }}/>
                <Controller
                name='capacity'
                control={control}
                rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                render={({field:{name,onChange,value,ref},fieldState}) => {
                    return(
                        <>
                            <label>Capacity</label>
                            <TextField
                            inputProps={{'aria-label':'CapacityInput'}}
                            className='w-full' 
                            type='number'
                            variant='filled'
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={onChange} name={name} inputRef={ref} />
                        </>
                    )
                }}/>
                <div className='w-full flex flex-row justify-center items-center gap-x-2'>
                    <Controller
                    name='x'
                    control={control}
                    rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                    render={({field:{name,onChange,value,ref},fieldState}) => {
                        return(
                            <div className='w-full flex flex-col justify-center items-center'>
                                <label>X</label>
                                <TextField
                                inputProps={{'aria-label':'XInput'}}
                                className='w-full' 
                                type='number'
                                variant='filled'
                                error={fieldState.invalid}
                                helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                                value={value} onChange={onChange} name={name} inputRef={ref} />
                            </div>
                        )
                    }}/>
                    <Controller
                    name='y'
                    control={control}
                    rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                    render={({field:{name,onChange,value,ref},fieldState}) => {
                        return(
                            <div className='w-full flex flex-col justify-center items-center'>
                                <label>Y</label>
                                <TextField
                                inputProps={{'aria-label':'YInput'}}
                                className='w-full' 
                                type='number'
                                variant='filled'
                                error={fieldState.invalid}
                                helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                                value={value} onChange={onChange} name={name} inputRef={ref} />
                            </div>
                        )
                    }}/>
                </div>
            <button aria-label='SubmitButton'>
                <AddCircleIcon sx={{fontSize:'100px',color: `${buttonColor}`}}/>
            </button>
        </form>
    )

    function isNumber(value:string){
        return /^\d+$/.test(value)
    }
}
