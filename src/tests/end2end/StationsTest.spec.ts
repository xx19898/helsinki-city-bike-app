import { expect, test } from "@playwright/test";
import prisma from "../integrationTests/helpers/prisma";



test('user can add new stations',async ({page}) => {
    await page.goto('http://localhost:3000')
    const addStationButton = await page.getByRole('button').getByText('Add new station')
    const count = await addStationButton.count()
    expect(count).toBe(1)
    await addStationButton.highlight()
    await addStationButton.click()
    await page.waitForURL('**/newStation')
    const url = await page.url()
    console.log({url})
    const nameField = await page.getByText('Create a new station')
    const nameFieldCount = await nameField.count()
    expect(nameFieldCount).toBe(1)
})