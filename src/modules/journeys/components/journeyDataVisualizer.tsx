


/* eslint-disable */

import { v4 as uuidv4 } from 'uuid';
import {type Column, useTable} from 'react-table'
import { useMemo } from "react"
import { useViewport } from "~/common/hooks/useViewport"
import { type JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"
import dayjs from "dayjs"

interface IDataVisualizer{
    data: JourneyWithStations[] | null,
    fetchAdditionalJourneys: (fetch:boolean) => void,
}

export default function JourneyDataVisualizer ({data,fetchAdditionalJourneys}:IDataVisualizer){
    const width = useViewport().width

    const rowData = useMemo(() => data,
     [data]
     )

    const {columnsBigScreen,columnsSmallScreen} = getColumns()

    const columns = width > 1024 ? columnsBigScreen : columnsSmallScreen

    const tableInstance = useTable({columns:columns,data: rowData === null ? [] : rowData})

    const{
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow
    } = tableInstance

    const handleScroll = (event:React.UIEvent<HTMLElement>) => {
        if(event.currentTarget === null) throw new Error("problems with scroll on journeys")
        const height = event.currentTarget.clientHeight
        const barHeight = event.currentTarget.scrollHeight
        const scrollTop = event.currentTarget.scrollTop;
        const scrolledInProcents = ((scrollTop + height) / barHeight) * 100
        if(scrolledInProcents >= 92 ) fetchAdditionalJourneys(true)
        //TODO: make it so that if ANY of the filters are active, no fetching occurs, add button to turn off all of
      };

    return(
      <div className="h-[400px] overflow-y-scroll overflow-x-auto w-full" onScroll={(e) => handleScroll(e) }>
      <table {...getTableProps()} className="w-full table overflow-y-scroll h-auto mb-10">

      <thead className="sticky top-0 bg-EngineeringOrange text-white overflow-x-scroll">

       {// Loop over the header rows

       headerGroups.map(headerGroup => (

         // Apply the header row props

         <tr {...headerGroup.getHeaderGroupProps()} className="bg-white" key={uuidv4()}>

           {// Loop over the headers in each row

           headerGroup.headers.map(column => (

             // Apply the header cell props

             <th {...column.getHeaderProps()} key={uuidv4()} className="text-center bg-EngineeringOrange rounded-none break-words">

               {
               column.render('Header')
               }

             </th>

           ))}

         </tr>

       ))}

     </thead>

     {/* Apply the table body props */}

     <tbody {...getTableBodyProps()} className="pt-10 bg-ColumbiaBlue t-white">

       {// Loop over the table rows

       rows.map(row => {

         // Prepare the row for display

         prepareRow(row)

         return (

           // Apply the row props

           <tr {...row.getRowProps()} key={uuidv4()}>

             {// Loop over the rows cells

             row.cells.map(cell => {

               // Apply the cell props

               return (

                 <td {...cell.getCellProps()} key={uuidv4()} className="text-center bg-AirForceBlue p-0 m-0 text-white w-fit">

                   {// Render the cell contents

                   cell.render('Cell')}

                 </td>

               )

             })}

           </tr>

         )

       })}

     </tbody>

   </table>
   </div>
    )
}

function getColumns(){
  const columnsBigScreen:Column[] = [
      {
        Header: 'Id',
        accessor: 'id', 
      },
      {
        Header: 'Departure',
        accessor: (row:any) => dayjs(row.departure).format('DD/MM/YYYY'),
      },
      {
        Header: 'Return',
        accessor: (row:any) => dayjs(row.return).format('DD/MM/YYYY hh:mm:ss'),
        
      },
      {
        Header: 'Departure Station Id',
        accessor: 'departureStationId',
      },
      {
        Header: 'Return Station Id',
        accessor: 'returnStationId',
      },
      {
        Header: 'Distance',
        accessor: 'coveredDistance',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
      },
      {
        Header: 'Departure Station Name',
        accessor: 'Station_Journey_departureStationIdToStation.name_FIN',
      },
      {
        Header: 'Return Station Name',
        accessor: 'Station_Journey_returnStationIdToStation.name_FIN',
      },
    ]

  
    const columnsSmallScreen:Column[] = [
      {
        Header: 'Id',
        accessor: 'id', 
      },
      {
        Header: 'Distance',
        accessor: 'coveredDistance',
      },
      {
        Header: 'Duration',
        accessor: 'duration',
      },
      {
        Header: 'Departure Station Name',
        accessor: 'Station_Journey_departureStationIdToStation.name_FIN',
      },
      {
        Header: 'Return Station Name',
        accessor: 'Station_Journey_returnStationIdToStation.name_FIN',
      },
    ]

  return {columnsBigScreen,columnsSmallScreen}
}


/* eslint-enable */

