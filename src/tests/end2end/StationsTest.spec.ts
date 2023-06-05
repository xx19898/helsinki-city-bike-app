import { expect, test } from "@playwright/test";
import prisma from '../helpers/prisma';
import { resetDb } from "../helpers/setup";

test.beforeEach(async ({page}) => {
    resetDb()
})

test('user can add new stations',async ({page}) => {
    
    const stations = await prisma.station.findMany()
    console.log({stations})
    
    await page.goto('http://localhost:3000/');
    await page.getByRole('button', { name: 'Add new station' }).click();
    await page.getByRole('textbox', { name: 'NameInput' }).click();
    await page.getByRole('textbox', { name: 'NameInput' }).fill('Kamppi');
    await page.getByRole('textbox', { name: 'AddressInput' }).click();
    await page.getByRole('textbox', { name: 'AddressInput' }).fill('Kamppi');
    await page.getByRole('textbox', { name: 'OperatorInput' }).click();
    await page.getByRole('textbox', { name: 'OperatorInput' }).fill('HSL');
    await page.getByRole('textbox', { name: 'CityInput' }).click();
    await page.getByRole('textbox', { name: 'CityInput' }).fill('Helsinki');
    await page.getByRole('spinbutton', { name: 'IdInput', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'IdInput', exact: true }).fill('9999');
    await page.getByRole('spinbutton', { name: 'FidInput' }).click();
    await page.getByRole('spinbutton', { name: 'FidInput' }).fill('123333');
    await page.getByRole('spinbutton', { name: 'CapacityInput' }).click();
    await page.getByRole('spinbutton', { name: 'CapacityInput' }).fill('123');
    await page.getByRole('spinbutton', { name: 'XInput' }).click();
    await page.getByRole('spinbutton', { name: 'XInput' }).fill('133');
    await page.getByRole('spinbutton', { name: 'YInput', exact: true }).click();
    await page.getByRole('spinbutton', { name: 'YInput', exact: true }).fill('142');

    await Promise.all([
        page.waitForResponse(resp => resp.url().includes('/api/trpc/stations.createStation')),
        page.getByRole('button', { name: 'SubmitButton' }).click()
    ]);

    await page.waitForTimeout(10*1000)

    await prisma.station.create({data:{
        address:'xcx',
        capacity: 1233,
        city_FIN: 'espoo',
        city_SWE:'esbo',
        fId: 2,
        id: 2,
        name_ENG: 'Asema',
        name_FIN: 'Asema',
        name_SWE: 'Asema',
        operator:'hsl',
        x: 2,
        y:1
    }})

    const mockStation = await prisma.station.findFirst({where:{id:2}})
    expect(mockStation?.name_FIN).toBe('Asema')

    const newStation = await prisma.station.findFirst({where: {
        id: 9999,
    }})


  console.log({newStation})
  expect(newStation?.name_FIN).toBe('Kamppi')
})