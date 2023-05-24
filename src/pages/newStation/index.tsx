import { Grid, Input, TextField } from "@mui/material";


export default function NewStation(){
    
    return(
        <div className="w-full min-h-screen h-auto flex flex-col justify-center items-center text-RichBlack">
            <h2 className="font-bold text-4xl mx-auto">Create a new station</h2>
            <form className=" sm:w-full md:w-2/3 md:grid md:grid-cols-2 md:gap-y-4 sm:gap-y-4 sm:flex sm:flex-col sm:justify-center sm:items-stretch">
                    <TextField className="px-6 sm:w-full md:w-1/2 mx-auto" placeholder="Name"/>
                    <TextField className="px-6 sm:w-full md:w-1/2 mx-auto" placeholder='Address' />
                    <TextField className="px-6 sm:w-full md:w-1/2 mx-auto" placeholder='Operator' />
                    <TextField className="px-6 sm:w-full md:w-1/2 mx-auto" placeholder='City' />
                    <div className="md:w-1/2 sm:w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>fId</label>
                        <Input className='w-full p-2' type='number' />
                    </div>
                    <div className="md:w-1/2 sm:w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>Capacity</label>
                        <Input className='w-full p-2' type='number' />
                    </div>
                    <div className="md:w-1/2 sm:w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>X</label>
                        <Input className='w-full p-2' type='number'/>
                    </div>
                    <div className="md:w-1/2 sm:w-full mx-auto flex flex-col justify-center items-center px-6">
                        <label>Y</label>
                        <Input className='w-full p-2' type='number'/>
                    </div>
            </form>
        </div>
    )
}