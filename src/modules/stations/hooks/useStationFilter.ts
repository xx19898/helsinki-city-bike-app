import { useState } from "react"

export type SortBy = 'departures' | 
'returns' | 'id' |
 'capacity'
 
export type SortType = 'Ascending' |'Descending'

export default () => {
    const [sortType,setSortType] = useState<SortType>('Ascending')
    const [sortBy,setSortBy] = useState<SortBy>('id')

    const [name,setName] = useState<string | null>(null)
    const [address,setAddress] = useState<string | null>(null)
     
    return {sortType,sortBy,setSortType,setSortBy,name,address,setName,setAddress}
}