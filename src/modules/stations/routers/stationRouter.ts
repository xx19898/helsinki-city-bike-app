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
        fId: z.coerce.number(),
        id: z.coerce.number(),
        name_FIN:z.string(),
        name_SWE: z.string(),
        name_ENG: z.string(),
        address: z.string(),
        city_FIN: z.string(),
        city_SWE: z.string(),
        operator: z.string(),
        capacity: z.coerce.number(),
        x:z.coerce.number(),
        y:z.coerce.number(),
    })).mutation(async ({ctx,input}) => {
        const data = await ctx.prisma.station.create({data:input})
        return data
    }),
    checkForStationsWithSameName: publicProcedure.input(z.string()).mutation(
        async ({ctx,input}) => {
            const stations = await ctx.prisma.station.findFirst({where:{
                name_FIN: input
            }})
            
            return stations !== null
        }
    ),
    checkForStationsWithSameId: publicProcedure.input(z.number()).mutation(
        async ({ctx,input}) => {
            const stations = await ctx.prisma.station.findFirst({where:{id:input}})

            return stations !== null
        }
    ),
    checkForStationsWithSameFid: publicProcedure.input(z.object({fId:z.coerce.number()})).mutation(
        async ({ctx,input}) => {
            const foundStations = await ctx.prisma.station.findFirst({where:{fId:input.fId}})
            console.log({soughtFid:input})
            console.log({foundStations})
            console.log({finalReturn:foundStations !== null})
            return foundStations !== null
        }
    )
})