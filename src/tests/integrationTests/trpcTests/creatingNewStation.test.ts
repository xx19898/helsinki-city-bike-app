import { expect, test } from "vitest";
import prisma from "../helpers/prisma";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";

test('Creating new station works',async () => {
     await prisma.station.deleteMany()
     
     const station = await prisma.station.findFirst({where:{
        name_FIN:'Kamppi'
     }})

     expect(station?.name_FIN).toBe(undefined)

     const caller = appRouter.createCaller({prisma})

     await caller.stations.createStation({
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
     })

     const allStations = await caller.stations.allStations()

     expect(allStations[0]?.name_FIN).toBe('Kamppi')
})