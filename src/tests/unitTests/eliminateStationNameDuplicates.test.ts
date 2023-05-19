import { inferRouterOutputs } from "@trpc/server";
import { describe, expect, it } from "vitest";
import { eliminateStationNameDuplicates } from "~/modules/newJourney/utility";
import { AppRouter } from "~/server/api/root";


describe.only('testing that eliminating station name duplicates works',() => {

    it('should eliminate duplicates',() => {
        const testData:inferRouterOutputs<AppRouter>['stations']['stationsList'] = [{
            address: 'x',
            capacity: 10,
            city_FIN:'hki',
            city_SWE: 'hkistad',
            fId:0,
            id: 1,
            name_ENG: 'Kamppi',
            name_SWE: 'Kampen',
            name_FIN: 'Kamppi',
            operator: 'hsl',
            x:1,
            y:1
        },{
            address: 'x',
            capacity: 10,
            city_FIN:'Kamppi',
            city_SWE: 'Kampen',
            fId:1,
            id: 2,
            name_ENG: 'Kamppi',
            name_SWE: 'Kamppi',
            name_FIN:'Kamppi',
            operator: 'hsl',
            x:1,
            y:1
        },]

        const result = eliminateStationNameDuplicates(testData)
        console.log({result})
        expect(result).toEqual(['Kamppi'])
    })
})