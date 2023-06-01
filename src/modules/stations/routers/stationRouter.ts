import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const stationRouter = createTRPCRouter({
    allStations: publicProcedure.query(async ({ctx}) => {
        const data = await ctx.prisma.station.findMany()
        return data
    }),
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
    }),
    createStation: publicProcedure.input(z.object({
        fId: z.number(),
        id: z.number(),
        name_FIN:z.string(),
        name_SWE: z.string(),
        name_ENG: z.string(),
        address: z.string(),
        city_FIN: z.string(),
        city_SWE: z.string(),
        operator: z.string(),
        capacity: z.number(),
        x:z.number(),
        y:z.number(),
    })).mutation(async ({ctx,input}) => {
        const data = await ctx.prisma.station.create({data:input})
        return data
    }),
    checkForStationsWithSameName: publicProcedure.input(z.string()).query(
        async ({ctx,input}) => {
            const stations = await ctx.prisma.station.findFirst({where:{
                name_FIN: input
            }})
            
            return stations !== null
        }
    ),
    checkForStationsWithSameId: publicProcedure.input(z.number()).query(
        async ({ctx,input}) => {
            const stations = await ctx.prisma.station.findFirst({where:{id:input}})

            return stations !== null
        }
    ),
    checkForStationsWithSameFid: publicProcedure.input(z.coerce.number()).query(
        async ({ctx,input}) => {
            const foundStations = await ctx.prisma.station.findFirst({where:{fId:input}})
            console.log({soughtFid:input})
            console.log({foundStations})
            console.log({finalReturn:foundStations !== null})
            return foundStations !== null
        }
    )
})