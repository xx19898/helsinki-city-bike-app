import { Station } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { useMemo } from "react";
import StationTable from "~/modules/stations/components/stationDataVisualizer"
import StationFilter from "~/modules/stations/components/stationFilter";
import useStationFilter, { SortBy, SortType } from "~/modules/stations/hooks/useStationFilter";
import { prisma } from "~/server/db";

type ReturnAndDepartureCount = {
  _count:{
    Journey_Journey_departureStationIdToStation: number,
    Journey_Journey_returnStationIdToStation: number, 
  }}

type StationWithReturnAndDepartureCounts = Station & ReturnAndDepartureCount
export async function getServerSideProps() {
    const stationsData:StationWithReturnAndDepartureCounts[] = await prisma.station.findMany({
      orderBy:{id:'asc'},take:1000,
      include:{
        _count:{
          select:{
            Journey_Journey_departureStationIdToStation:true,
            Journey_Journey_returnStationIdToStation:true
          }
        }
      }
    })


    return {
      props: {
        stationsData:stationsData,
      } 
    };
  }

export default (props: {
  stationsData: StationWithReturnAndDepartureCounts[]
}) => {
    type stationsData = typeof props
    const filterData = useMemo(() => {
      let stationNames:string[] = []
      let stationAddresses:string[] = []
      props.stationsData.forEach( (stationData) => {
        stationNames.push(stationData.name_FIN)
        stationAddresses.push(stationData.address)
      })
      return {
        stationNames:stationNames,
        stationAddresses:stationAddresses
      }
    },[props])

    const {
      setSortBy,setSortType,
      sortBy,sortType,
      address,name,
      setAddress,setName
    } = useStationFilter()

    const filteredData = useMemo(() => {
      return filterStationData({address:address,data:props.stationsData,name:name,sortBy:sortBy,sortType:sortType})
    },[address,props.stationsData,name,sortBy,sortType])

    

    return(
        <div className="min-h-screen w-auto bg-AirForceBlue flex flex-col justify-center items-center">
            <h1 className="text-white text-center text-5xl font-bold mt-10 mx-auto">Stations</h1>
            <section className="w-[80%] rounded-md">
              <StationFilter 
              setSortBy={setSortBy}
              sortBy={sortBy}

              stationNames={filterData.stationNames}
              stationAddresses={filterData.stationAddresses}

              setSortType={setSortType}
              sortType={sortType}

              address={address}
              setAddress={setAddress}

              name={name}
              setName={setName}
              />
              <StationTable data={filteredData}/>
            </section>
        </div>
    )



    function filterStationData(
      {data,address,name,sortBy,sortType}:{
        data:StationWithReturnAndDepartureCounts[],address:string | null,
        name:string | null,sortBy:SortBy,
        sortType:SortType
      }){
        let dataTemp = [...data]
        
        if(address != null && address.length > 0) dataTemp = dataTemp.filter(stationDataEntry => stationDataEntry.address === address)
        
        if(name != null && name.length > 0) dataTemp = dataTemp.filter(stationDataEntry => stationDataEntry.name_FIN === name)

        
        return dataTemp.sort(function(a,b){
          let sortByRealForm = sortBy as string

          if(sortBy != 'capacity' && sortBy != 'id'){
            if(sortBy === 'departures') sortByRealForm = 'Journey_Journey_departureStationIdToStation'
            else{
              sortByRealForm = 'Journey_Journey_returnStationIdToStation'
            }
          }

          if(sortType === 'Ascending'){
            if(sortBy != 'capacity' && sortBy != 'id'){
              return b._count[sortByRealForm as keyof typeof b._count] - a._count[sortByRealForm as keyof typeof a._count]
            }else{
              return b[sortBy] - a[sortBy]
            }
          }else{
            if(sortBy != 'capacity' && sortBy != 'id'){
              return a._count[sortByRealForm as keyof typeof a._count] - b._count[sortByRealForm as keyof typeof b._count]
            }else{
              return a[sortBy] - b[sortBy]
            }
          }
        })
    }
  
}