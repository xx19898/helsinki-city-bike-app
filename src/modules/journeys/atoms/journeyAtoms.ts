import { atom } from "jotai";
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService";

export const journeyDataAtom = atom<JourneyWithStations[] | null>(null)