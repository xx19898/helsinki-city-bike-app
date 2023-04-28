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
})