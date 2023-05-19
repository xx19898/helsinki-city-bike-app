import { inferRouterOutputs } from "@trpc/server";
import { beforeAll, describe, expect, it } from "vitest";
import { checkIfStationCorrect } from "~/modules/newJourney/utility";
import { AppRouter } from "~/server/api/root";



describe('testing addNewJourney page utility methods',() => {

    let stationInfo : inferRouterOutputs<AppRouter>['journeys']['stationNamesAndIds'];
    beforeAll(() => {
        stationInfo = [{
            id:1,
            name_FIN: 'Kamppi'
        },{
            id:2,
            name_FIN: 'Rautatieasema'
        }]
    })
    
    it('should return true if chosen station is in station info array received from the server',() => {

        const result = checkIfStationCorrect('Kamppi',stationInfo)

        expect(result).toBe(true)
    })

    it('should return false if chosen stations is not in station info array received from the server',() => {
        const result = checkIfStationCorrect('kamppi',stationInfo)
        
        expect(result).toBe(false)
    })
})