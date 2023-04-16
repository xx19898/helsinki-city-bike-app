import { prisma } from "~/server/db";

export async function getFirstHundredJourneys(){
    const data = await prisma.journey.findMany({take:10})
    return data
}