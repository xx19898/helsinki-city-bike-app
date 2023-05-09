import { useState } from "react"

export type SortBy = 'Number of returns' | 
'Number of departures' | 'Id' |
 'Capacity'
 
export type SortType = 'Ascending' |'Descending'

export default () => {
    const [sortType,setSortType] = useState<SortType>('Ascending')
    const [sortBy,setSortBy] = useState<SortBy>('Id')

    const [name,setName] = useState<string | null>(null)
    const [address,setAddress] = useState<string | null>(null)
     
    return {sortType,sortBy,setSortType,setSortBy,name,address,setName,setAddress}
}