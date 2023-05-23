import { Grid, Input, TextField } from "@mui/material";


export default function NewStation(){
    
    return(
        <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center text-RichBlack">
            <h2 className="font-bold text-4xl mx-auto">Create a new station</h2>
            <form className="w-full md:grid md:grid-cols-2 md:gap-y-4 sm:gap-y-4 sm:flex sm:flex-col sm:justify-center sm:items-stretch">
                    <TextField className="px-6" placeholder="Name"/>
                    <div className="flex flex-col justify-center items-center px-6">
                        <label>fId</label>
                        <Input className='w-full' type='number' />
                    </div>
                    <TextField className="px-6" placeholder='Address' />
                    <TextField className="px-6" placeholder='Operator' />
                    <div className="flex flex-col justify-center items-center px-6">
                        <label>Capacity</label>
                        <Input className='w-full p-4' type='number' />
                    </div>
                    <div className="flex flex-col justify-center items-center px-6">
                        <label>X</label>
                        <Input className='w-full' type='number'/>
                    </div>
                    <div className="flex flex-col justify-center items-center px-6">
                        <label>Y</label>
                        <Input className='w-full' type='number'/>
                    </div>
            </form>
        </div>
    )
}