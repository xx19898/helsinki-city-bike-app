import { atom } from "jotai";
import { JourneyWithStations } from "~/server/service/dataAccessService/dataAccessService";

export const journeyDataAtom = atom<JourneyWithStations[] | null>(null)
export const journeyCursorAtom = atom<number>(0)
export const journeyStationsAtom = atom<string[]>([])