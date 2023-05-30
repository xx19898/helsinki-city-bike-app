import {test,expect, selectors} from '@playwright/test'
import prisma from '../integrationTests/helpers/prisma'
import playwrightConfig from 'playwright.config'


test('adding journeys works as intended',async ({page}) => {

    await page.goto('http://localhost:3000')
    
    let url = await page.url()

    expect(url).toBe('http://localhost:3000/')

    const addNewJourneyButton = await page.getByRole('button').getByText('Add new journey')

    const count = await addNewJourneyButton.count()

    expect(count).toBe(1)

    await addNewJourneyButton.click()

    await page.waitForURL('**/newJourney')

    url = await page.url()

    await page.goto('http://localhost:3000/newJourney')

    expect(url).toBe('http://localhost:3000/newJourney')

    //Setting departure time
    const departureTimeInput = await page.getByLabel('departureTimeContainer')

    url = await page.url()
    console.log({url})

    expect(await departureTimeInput.count()).toBe(1)

    await departureTimeInput.click()
    
    await departureTimeInput.type('120220001015AM')

    expect(await departureTimeInput.inputValue()).toBe('12/02/2000 10:15 AM')

    //Setting return time
    const returnTimeInput = await page.getByLabel('returnTimeContainer').getByPlaceholder('MM/DD/YYYY hh:mm aa')

    expect(await returnTimeInput.count()).toBe(1)

    await returnTimeInput.click()
    
    await returnTimeInput.type('1202200011:15AM')

    expect(await returnTimeInput.inputValue()).toBe('12/02/2000 11:15 AM')

    //Setting departure station
   // const departureStationInput = 
})