import { Station } from "@prisma/client"
import { useMemo } from "react"
import { Column, useTable } from "react-table"



export default ({data}:{data:Station[]}) => {
    console.log({data})
    const stationData = useMemo(() => {
        return data
    },[data])
    const columns:Column[] = useMemo(() => 
            [
                {
                    Header: 'id',
                    accessor: 'id',
                },{
                    Header: 'Name',
                    accessor: 'name_FIN'
                },{
                    Header: 'Address',
                    accessor: 'address'
                },{
                    Header: 'City',
                    accessor: 'city_FIN'
                },{
                    Header: 'Operator',
                    accessor:'operator',
                },{
                    Header: 'Capacity',
                    accessor:'capacity'
                },
                {
                    Header: 'Returns',
                    accessor:'_count.Journey_Journey_returnStationIdToStation'
                },
                {
                    Header: 'Departures',
                    accessor:'_count.Journey_Journey_departureStationIdToStation'
                },
                {
                    Header: 'Coordinates',
                    columns:[{
                        Header:'x',
                        Cell: (props:any) => <p>{props.row.original.x}</p>,
                    },{
                        Header:'y',
                        Cell: (props:any) => <p>{props.row.original.y}</p>,
                    }]
                }]
        ,[])

    const{
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({columns,data:stationData})

    return(
        <div className=" text-center text-white w-full mx-auto p-[1em] min-h-[50px] bg-BabyBlue h-screen mb-[20%] overflow-y-scroll">
            <table {...getTableProps()} className="w-full rounded-[10px]">
                <thead className="sticky bg-EngineeringOrange rounded-md top-0">
                    {headerGroups.map(headerGroup => (
                    <tr className=" first:h-5 h-5 rounded-md" {...headerGroup.getHeaderGroupProps()}>
                        {
                        headerGroup.headers.map(column => (
                        <th className="rounded-md" {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()} className="max-h-[200px] bg-BabyBlue h-auto overflow-y-scroll">
                    {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr className="max-h-5 border-solid border-RichBlack" {...row.getRowProps()}>
                        {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                        </tr>
                    )
                    })}
                </tbody>
                </table>
        </div>
    )
}