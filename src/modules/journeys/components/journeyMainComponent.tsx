import DataVisualizer from "~/modules/journeys/components/journeyDataVisualizer"
import SearchIcon from "~/resources/icons/searchIcon"
import useJourneyMainComponent from "../hooks/useJourneyMainComponent"
import useFilterComponent from "./useFilterComponent"
import FilterComponent from "./filterComponent"

export default function JourneyMainComponent(){
    const {fetchAdditionalJourneys,journeyData,idFilter,onIdInput} = useJourneyMainComponent()
    const {
           distanceRange,setDistanceRange,
           durationRange,setDurationRange,
           setChosenDepartureStation,
           setChosenReturnStation,
           stations,
           sortedData
        } = useFilterComponent({idFilter:idFilter,journeyData:journeyData === null ? [] : journeyData})
    
    console.log('RERENDERED_JOURNEY_MAIN')

    return(
        <section className="w-[90%] mt-10 min-h-[50%] bg-BabyBlue rounded-md overflow-hidden mb-10">
                <div className="relative w-[90%] mx-auto bg-white mt-10 rounded-xl">
                <input value={idFilter === null ? '' : idFilter} className="pl-5 w-full h-[3.5rem] focus:outline-none rounded-xl" placeholder="Search by id..." onChange={(e) => onIdInput(e.target.value)}>
                </input>
                <SearchIcon />
                <FilterComponent 
                distanceValue={distanceRange} distanceSetValueCallback={setDistanceRange}
                durationValue={durationRange} setDurationCallback={setDurationRange} stations={stations}
                setChosenDepartureStation={setChosenDepartureStation}
                setChosenReturnStation={setChosenReturnStation}/>
                <DataVisualizer data={sortedData} fetchAdditionalJourneys={fetchAdditionalJourneys} />
                </div>
        </section>
    )
}