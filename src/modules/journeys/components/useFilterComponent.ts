import { useState } from "react"



export default () => {
    const [idFilter, setIdFilter] = useState<number | null>(null)

    function onIdInput(input:string){
        if(input === '') setIdFilter(null)
        if(typeof input != 'string') return false
        if(!isNaN(parseInt(input)) && !isNaN(parseFloat(input))) setIdFilter(parseInt(input)) 
    }

    return {idFilter,onIdInput}
}