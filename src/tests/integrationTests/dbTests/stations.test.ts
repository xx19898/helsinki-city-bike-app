import { expect, test } from "vitest";
import prisma from "../helpers/prisma";


test('should create a new station with name Kamppi and fId 1',async () => {
    await prisma.station.create({
        data:{
            address: 'Kamppi',
            capacity:1000,
            city_FIN:'Helsinki',
            city_SWE:'Helsingfors',
            fId: 1,
            name_ENG: 'Kamppi',
            name_FIN: 'Kamppi',
            name_SWE: 'Kampen',
            operator:'HSL',
            x:1,
            y:1,
            id: 1,
        }
    })

    const createdStation = await prisma.station.findFirst({where:{
        id:1,
    }})

    expect(createdStation?.name_FIN).toBe('Kamppi')
})