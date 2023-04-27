import { Journey } from "@prisma/client"
import {Column, useTable} from 'react-table'
import { useEffect, useMemo, useState } from "react"
import { useViewport } from "~/common/hooks/useViewport"
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService"
import { api } from "~/utils/api"
import { journeyCursorAtom } from "../atoms/journeyAtoms"
import { useAtom } from "jotai"

interface IDataVisualizer{
    data: JourneyWithStations[] | null,
    fetchAdditionalJourneys: (fetch:boolean) => void,
}

export default ({data,fetchAdditionalJourneys}:IDataVisualizer) => {
    const width = useViewport().width

    const rowData = useMemo(() => data, [data])

    const {columnsBigScreen,columnsSmallScreen} = getColumns()

    const columns = width > 1024 ? columnsBigScreen : columnsSmallScreen

    const tableInstance = useTable({columns:columns,data: rowData === null ? [] : rowData})

    const {
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
        if(scrolledInProcents === 100) fetchAdditionalJourneys(true)
      };

    return(
      <div className="flex flex-col h-[500px]  overflow-scroll" onScroll={(e) => handleScroll(e) }>
      <table {...getTableProps()} className="w-full table">

     <thead className="sticky top-0 bg-EngineeringOrange">

       {// Loop over the header rows

       headerGroups.map(headerGroup => (

         // Apply the header row props

         <tr {...headerGroup.getHeaderGroupProps()}>

           {// Loop over the headers in each row

           headerGroup.headers.map(column => (

             // Apply the header cell props

             <th {...column.getHeaderProps()}>

               {// Render the header

               column.render('Header')}

             </th>

           ))}

         </tr>

       ))}

     </thead>

     {/* Apply the table body props */}

     <tbody {...getTableBodyProps()} className="pt-10 bg-ColumbiaBlue">

       {// Loop over the table rows

       rows.map(row => {

         // Prepare the row for display

         prepareRow(row)

         return (

           // Apply the row props

           <tr {...row.getRowProps()} >

             {// Loop over the rows cells

             row.cells.map(cell => {

               // Apply the cell props

               return (

                 <td {...cell.getCellProps()} className="text-center">

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
  const columnsBigScreen:Column[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: 'Departure',
        accessor: (row:any) => row.departure.toDateString(),
      },
      {
        Header: 'Return',
        accessor: (row:any) => row.return.toDateString(),
        
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
    ],
    []
  )

  
const columnsSmallScreen:Column[] = useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id', // accessor is the "key" in the data
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
    ],
    []
  )

  return {columnsBigScreen,columnsSmallScreen}
}

