import { describe, expect, it } from "vitest";
import prisma from '../helpers/prisma'

describe('journey gets created', () => {
    it('should create a journey from Kamppi to Kamppi with id of 1', async () => {
        const newStation = await prisma.station.create({
            data:{
                address: 'Kamppi',
                city_FIN:'Kamppi',
                city_SWE:'Kamppi',
                capacity:10,
                fId:1,
                id:1,
                name_ENG:'Kamppi',
                name_FIN:'Kamppi',
                name_SWE:'Kamppi',
                operator:'HSL',
                x:0,
                y:0,
            }
        })
        

        await prisma.journey.create({
            data:{
                coveredDistance: 10,
                departure: new Date(),
                duration: 30,
                return: new Date(),
                id:1,
                departureStationId: 1,
                returnStationId: 1,
            }
        })

        const newJourney = await prisma.journey.findFirst({
            where:{
                id:1,
            },
            include:{
                Station_Journey_departureStationIdToStation:true,
            }
        })

        expect(newJourney?.Station_Journey_departureStationIdToStation.name_FIN).toEqual('Kamppi')


        

    })
})