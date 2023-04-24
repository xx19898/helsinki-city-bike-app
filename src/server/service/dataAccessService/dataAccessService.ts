import { Journey, Prisma } from "@prisma/client";
import { prisma } from "~/server/db";

export type JourneyWithStations = Prisma.JourneyGetPayload<{include:{Station_Journey_departureStationIdToStation:true,Station_Journey_returnStationIdToStation:true}}>

export async function getFirstHundredJourneys(){
    const data:JourneyWithStations[] = await prisma.journey.findMany({take:100,orderBy:{id:'asc'},include:{Station_Journey_departureStationIdToStation:true,Station_Journey_returnStationIdToStation:true}})
    return data
}