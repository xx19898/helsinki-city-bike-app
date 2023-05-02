


import { JourneyWithStations } from "src/server/service/dataAccessService/dataAccessService";
import { sortJourneyData } from "../../src/modules/journeys/utils/journeyUtils";

const mockData:JourneyWithStations[] =
[
    {
        coveredDistance: 10,
        departure: new Date(),
        departureStationId: 1,
        duration: 100,
        id:1,
        return:new Date(),
        returnStationId: 2,
        Station_Journey_departureStationIdToStation:{
            address: 'xy',
            capacity: 10,
            city_FIN:'Helsinki',
            city_SWE:'Helsingfors',
            fId:1009,
            id:2,
            name_ENG: 'Pasila',
            name_FIN: 'Pasila',
            name_SWE: 'Böle',
            operator: 'HSL',
            x:100,
            y: 200,
        },
    Station_Journey_returnStationIdToStation:{
        address: 'xy',
        capacity: 10,
        city_FIN:'Helsinki',
        city_SWE:'Helsingfors',
        fId:1009,
        id:2,
        name_ENG: 'Rautatieasema',
        name_FIN: 'Rautatieasema',
        name_SWE: 'Järnvägsstation',
        operator: 'HSL',
        x:100,
        y: 200,
    },
},
    {
        coveredDistance: 100,
        departure: new Date(),
        departureStationId: 3,
        duration: 100,
        id:1,
        return:new Date(),
        returnStationId: 4,
        Station_Journey_departureStationIdToStation:{
            address: 'xy',
            capacity: 100,
            city_FIN:'Helsinki',
            city_SWE:'Helsingfors',
            fId:193,
            id:5,
            name_ENG: 'Kamppi',
            name_FIN: 'Kamppi',
            name_SWE: 'Kampen',
            operator: 'HSL',
            x:190,
            y: 493,
        },
        Station_Journey_returnStationIdToStation:{
            address: 'xy',
            capacity: 10,
            city_FIN:'Helsinki',
            city_SWE:'Helsingfors',
            fId:1009,
            id:2,
            name_ENG: 'Pasila',
            name_FIN: 'Pasila',
            name_SWE: 'Böle',
            operator: 'HSL',
            x:100,
            y: 200,
        }
    }]

describe('testing that sorting journeys functions as it should',() => {
    test('data gets returned as it is if all filters are off',() => {
            const initialLength = mockData.length
            const dataLengthAfterSorting = sortJourneyData(
            {
                data:mockData,chosenDepartureStation:'NONE',chosenReturnStation:'NONE',
                distanceRange:[0,1000000],durationRange:[0,100000],idFilter:null
            }
            ).length
            console.log({dataLengthAfterSorting})
            expect(initialLength).toBe(dataLengthAfterSorting)
    },)

    test('filtering by departure station works', () => {
        const initialLength = mockData.length
        const dataAfterSorting = sortJourneyData({
            chosenDepartureStation:'Kamppi',
            chosenReturnStation: 'NONE',
            data:mockData,
            distanceRange:[0,100000],
            durationRange:[0,100000],
            idFilter: null
        })
        expect(dataAfterSorting.length).toBe(1)
        expect(dataAfterSorting[0]?.Station_Journey_departureStationIdToStation.name_FIN).toBe('Kamppi')
    })

    test('filtering by departure station works', () => {
        const initialLength = mockData.length
        const dataAfterSorting = sortJourneyData({
            chosenDepartureStation:'NONE',
            chosenReturnStation: 'Pasila',
            data:mockData,
            distanceRange:[0,100000],
            durationRange:[0,100000],
            idFilter: null
        })
        expect(dataAfterSorting.length).toBe(1)
        expect(dataAfterSorting[0]?.Station_Journey_returnStationIdToStation.name_FIN).toBe('Pasila')
    })


    
})