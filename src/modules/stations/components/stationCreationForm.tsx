import { Input, TextField } from '@mui/material'
import {useForm, Controller } from 'react-hook-form'

import AddCircleIcon from '@mui/icons-material/AddCircle';

interface IStationCreationForm{
    onSubmit: () => void
}
export default function StationCreationForm({onSubmit}:IStationCreationForm){

    const { getFieldState,getValues,formState:{errors,isValid,},control, handleSubmit } = useForm({
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

    console.log({})

    const buttonColor = isValid ? '#BA1200' : ''

    const mockSubmit = (data:{name:string}) => console.log(data)

    console.log('Id is ' + getValues('id'))
    
    return(
        <form 
        onSubmit={handleSubmit(mockSubmit)}
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
                            error={fieldState.invalid}
                            helperText={fieldState.error != undefined ? fieldState.error.message : ''}
                            value={value} onChange={onChange} name={name} inputRef={ref}  />
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
                name='capacity'
                control={control}
                rules={{required:{message: 'Id should be positive number and it can\'t be empty',value:true},pattern:{value:new RegExp('^(0|[1-9][0-9]*)$'),message:'Please pass a adequate number as an id'}}}
                render={({field:{name,onChange,value,ref},fieldState}) => {
                    return(
                        <>
                            <label>Capacity</label>
                            <TextField
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
            <button>
                <AddCircleIcon sx={{fontSize:'100px',color: `${buttonColor}`}}/>
            </button>
        </form>
    )
}