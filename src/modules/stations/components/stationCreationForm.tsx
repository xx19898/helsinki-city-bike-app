import { Input, TextField } from '@mui/material'
import {useForm, Controller } from 'react-hook-form'

import AddCircleIcon from '@mui/icons-material/AddCircle';
import { api } from '~/utils/api';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';
import { debounce } from 'lodash';

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
//Add trpc mutation possibility, write e2e to test it
export default function StationCreationForm({onSubmit}:IStationCreationForm){

    const { clearErrors,getFieldState,getValues,reset,formState:{errors,isValid,},control,setError,handleSubmit } = useForm({
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

    console.log('RERENDER')

    const createStation = api.stations.createStation.useMutation()

    const debounced = useDebouncedCallback(
        () => {
          validateFid()
        },
        1000
      )

    const fId = getValues('fId')
    const {refetch:rechekForStationsWithSameFid,data:FidIsAlreadyTaken} = api.stations.checkForStationsWithSameFid.useQuery(fId ,{enabled:false})

    async function validateFid(){
        const {data:fIdIsTaken} = await rechekForStationsWithSameFid({})
        console.log({fIdIsTaken})
        if(fIdIsTaken){
            setError('fId',{type:'fIdIsAlreadyTaken',message:'Sorry, but this fId is already taken, please take another one'})
            }else{
            clearErrors('fId')
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
                                onChange(e.target.value)
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
                            value={value} onChange={onChange} name={name} inputRef={ref} />
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
                                onChange(e.target.value)
                                console.log({newFidValue:e.target.value})
                                if(/^\d+$/.test(e.target.value)){
                                    debounced()
                                }else{
                                    console.log('fId cant be parsed to int')
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
}
