import { Autocomplete, Grid, MenuItem, Select, TextField } from "@mui/material"
import { v4 as uuidv4 } from 'uuid';
import { SortBy, SortType } from "../hooks/useStationFilter";

interface IStationFilter{
    stationNames: string[],
    stationAddresses: string[],
    
    sortBy: string,
    sortType: string,
    
    setSortBy: (v:SortBy) => void,
    setSortType: (v:SortType) => void,
    
    address: string | null,
    setAddress: (v:string | null) => void,

    name: string | null,
    setName: (v:string | null) => void
}

export default ({
    stationNames,stationAddresses,
    setSortBy,setSortType,
    sortBy,sortType,
    address,setAddress,
    name,setName
}:IStationFilter) => {

    return(
        <Grid className="bg-white mx-auto w-full rounded-t-md" container justifyContent="center" alignItems="center" 
        style={{alignItems: "center",justifyContent:'center',display:'flex',width:'100%'}}>
            <Grid item xs={12} md={6} style={{alignItems: "center",justifyContent:'center',display:'flex',width:'100%',padding:'1em'}}>
            <Autocomplete
            className="bg-white rounded-md"
             disablePortal
             id="combo-box-demo"
             options={stationNames}
             value={name}
             onChange={(event,value,reason,details) => setName(value)}
             renderOption={(props,option) => {
                return(
                <li {...props} key={uuidv4()}>
                    {option}
                </li>)
             }}
             sx={{ width: 300 }}
             renderInput={(params) => <TextField  {...params} label="Name" />}
             style={{width:'100%'}}
             />
             </Grid>
             <Grid item xs={12} md={6} style={{alignItems: "center",justifyContent:'center',display:'flex',width:'100%',padding:'1em'}}>
                <Autocomplete
                className="bg-white rounded-md"
                disablePortal
                value={address}
                onChange={(event,value) => setAddress(value)}
                id="combo-box-demo"
                options={stationAddresses}
                renderOption={(props,option) => {
                    return(<li {...props} key={uuidv4()}>
                        {option}
                    </li>)
                }}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField  {...params} label="Address" />}
                style={{width:'100%'}}
                />
             </Grid>
             <Grid item xs={12} md={6} 
             style={{alignItems: "center",gap:'2em',justifyContent:'space-between',display:'flex',width:'100%',padding:'1em'}}>
                <p className="text-RichBlack">Sort By:</p>
                <Select
                className="w-full bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                >                        
                    <MenuItem value={'returns'}>Number of returns</MenuItem>
                    <MenuItem value={'departures'}>Number of departures</MenuItem>
                    <MenuItem value={'id'}>Id</MenuItem>
                    <MenuItem value={'capacity'}>Capacity</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={12} md={6}
            style={{alignItems: "center",gap:'2em',justifyContent:'space-between',display:'flex',width:'100%',padding:'1em'}}> 
                <p className='text-RichBlack'>Sort Type:</p>
                <Select
                value={sortType}
                onChange={(e) => setSortType(e.target.value as SortType)}
                className="w-full bg-white"
                >                        
                    <MenuItem value={'Ascending'}>Ascending</MenuItem>
                    <MenuItem value={'Descending'}>Descending</MenuItem>
                </Select>
             </Grid>
        </Grid>
    )
}