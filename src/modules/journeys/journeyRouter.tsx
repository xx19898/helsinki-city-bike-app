import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const journeyRouter = createTRPCRouter({
    journeyList: publicProcedure.query(async (opts) => {
        const data = await opts.ctx.prisma.journey.findMany({
            take:100,
        })
    })
})