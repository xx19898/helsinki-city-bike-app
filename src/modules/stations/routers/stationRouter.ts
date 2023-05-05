import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const stationRouter = createTRPCRouter({
    stationsList: publicProcedure.input(z.number()).query(async ({ctx,input}) => {
        const stationsData = await ctx.prisma.station.findMany({
            take:100,
            skip:1,
            orderBy:{
                id: 'asc',
            },
            cursor:{
                id:input
            },
        })

        return stationsData
    })
})