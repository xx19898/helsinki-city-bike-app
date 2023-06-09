import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const journeyRouter = createTRPCRouter({
    journeyList: publicProcedure.input(z.number()).query(async ({ctx,input}) => {
        const data = await ctx.prisma.journey.findMany({
            take:100,
            skip:1,
            cursor:{
                id:input
            },
            orderBy:{
                id:'asc'
            },
            include:{
                Station_Journey_departureStationIdToStation:true,
                Station_Journey_returnStationIdToStation:true
            }
        })
        return {data:data,lastId:data[data.length - 1]?.id}
    }),
    stationNamesAndIds: publicProcedure.query(async ({ctx,input}) => {
        const data = await ctx.prisma.station.findMany({
            take:1000,
            select:{
                name_FIN:true,
                id: true,
            }
        })
        
        return data
    }),
    createJourney: publicProcedure.input(
        z.object({
            coveredDistance: z.number(),
            duration:z.number(),
            departure: z.date(),
            return: z.date(),
            departureStationId: z.number(),
            returnStationId: z.number(),
        })
    )
    .mutation(async ({ctx,input}) => {

        await ctx.prisma.journey.create({
            data:{
                coveredDistance: input.coveredDistance,
                departure: input.departure,
                return: input.return,
                duration: input.duration,
                departureStationId: input.departureStationId,
                returnStationId: input.returnStationId,
            }
        })
    })
})