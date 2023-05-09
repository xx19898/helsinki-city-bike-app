import { Station } from "@prisma/client";
import { useMemo } from "react";
import StationTable from "~/modules/stations/components/stationDataVisualizer"
import StationFilter from "~/modules/stations/components/stationFilter";
import useStationFilter from "~/modules/stations/hooks/useStationFilter";
import { prisma } from "~/server/db";



export async function getServerSideProps() {
    const stationsData = await prisma.station.findMany({
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

export default (props: {stationsData:Station[]}) => {
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



    return(
        <div className="min-h-screen w-auto bg-AirForceBlue flex flex-col justify-center items-center">
            <h1 className="text-white text-center text-5xl font-bold mt-10 mx-auto">Stations</h1>
            <section className="w-[80%]">
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
              <StationTable data={props.stationsData}/>
            </section>
        </div>
    )
}