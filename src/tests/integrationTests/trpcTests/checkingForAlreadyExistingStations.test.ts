import { PrismaClientValidationError } from "@prisma/client/runtime";
import { beforeAll, beforeEach, describe, expect, it, test } from "vitest";
import { appRouter } from "~/server/api/root";
import prisma from "~/tests/helpers/prisma";



describe('checking for already existing stations with same properties in db in order to eliminate duplicates should work',() => {
    beforeEach( async () => {
        await prisma.station.deleteMany()
        await prisma.station.create({
            data:{
                address: 'Kamppi',
                capacity: 100,
                city_FIN: 'Helsinki',
                city_SWE: 'Helsinki',
                fId: 1,
                id: 1,
                name_ENG: 'Kamppi',
                name_SWE: 'Kamppi',
                name_FIN: 'Kamppi',
                operator: 'HSL',
                x: 1,
                y: 1, 
            }
        })
    })

    test('should be able to check for databases with same name', async () => {

        //create station with name kamppi
        const caller = appRouter.createCaller({prisma})
        
        const stationWithNameKamppiIsInDB = await caller.stations.checkForStationsWithSameName('Kamppi')
        const stationWithNameRautatieAsemaIsInDB = await caller.stations.checkForStationsWithSameName('Rautatieasema')
        console.log({stationWithNameKamppiIsInDB})
        console.log({stationWithNameRautatieAsemaIsInDB})
        expect(stationWithNameKamppiIsInDB).toBe(true)
        expect(stationWithNameRautatieAsemaIsInDB).toBe(false)
    })

    test('should be able to check for stations with same id', async () => {
        const caller = appRouter.createCaller({prisma})

        const stationWithRandomIdIsInDB = await caller.stations.checkForStationsWithSameId(999)
        expect(stationWithRandomIdIsInDB).toBe(false)
        
        const stationWithIdOneIsInDB = await caller.stations.checkForStationsWithSameId(1)
        expect(stationWithIdOneIsInDB).toBe(true)
    })

    test('should be able to check for stations with same fId',async () => {
        const caller = appRouter.createCaller({prisma})
        
        const stationWithRandomFidIsInDB = await caller.stations.checkForStationsWithSameFid(888)
        expect(stationWithRandomFidIsInDB).toBe(false)
        
        const stationWithFidOneIsInDB = await caller.stations.checkForStationsWithSameFid(1)
        expect(stationWithFidOneIsInDB).toBe(true)
    })
})