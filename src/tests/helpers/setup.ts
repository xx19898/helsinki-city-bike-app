import prisma from "./prisma";


export async function resetDb(){
  await prisma.station.deleteMany()
  await prisma.journey.deleteMany()
}