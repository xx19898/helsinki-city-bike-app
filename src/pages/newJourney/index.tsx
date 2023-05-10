import { DateTimePicker } from "@mui/x-date-pickers"


interface IAddJourney{

}

export default (props:IAddJourney) => {
    return(
        <div className="min-h-screen w-full bg-ColumbiaBlue ">
            <form>
                <DateTimePicker />
            </form>
        </div>
    )
} 