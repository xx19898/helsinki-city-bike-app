import { createTRPCRouter } from "~/server/api/trpc";
import { journeyRouter } from "~/modules/journeys/routers/journeyRouter";
import { stationRouter } from "~/modules/stations/routers/stationRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  journeys: journeyRouter,
  stations: stationRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
