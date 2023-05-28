
import { api } from "~/utils/api"
import { useMemo} from "react";
import JourneyCreationForm from "~/modules/journeys/components/journeyCreationForm";

export default function NewJourney(){
    const stationNames = api.journeys.stationNamesAndIds.useQuery()


    const stationNameIdMap = useMemo(() => {
        if(stationNames.data){
            const map = new Map<string,number>()
            stationNames.data.forEach(stationNameAndId => map.set(stationNameAndId.name_FIN,stationNameAndId.id))
            return map
        }else{
            return new Map()
        }
    },[stationNames.data])

    return(
        <div className="min-h-screen w-full bg-ColumbiaBlue text-white">
            <h2 className="mx-auto mt-[400px] text-5xl font-bold text-center w-full">Create a new Journey</h2>
            <JourneyCreationForm />
        </div>
    )
}




