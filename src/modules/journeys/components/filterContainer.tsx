import FilterComponent from "./filterComponent"
import useFilterComponent from "./useFilterComponent"


export default () => {
    const {
        distanceRange,setDistanceRange,
        durationRange,setDurationRange,
        stations,
        setChosenDepartureStation,
        setChosenReturnStation
        } = useFilterComponent()

    return(
        <FilterComponent 
        distanceValue={distanceRange} distanceSetValueCallback={setDistanceRange}
        durationValue={durationRange} setDurationCallback={setDurationRange} stations={stations}
        setChosenDepartureStation={setChosenDepartureStation}
        setChosenReturnStation={setChosenReturnStation}/>
    )
}