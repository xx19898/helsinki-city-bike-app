import { test, expect } from '@playwright/test';


test('basic test',async ({page}) => {
    
    await page.goto('http://localhost:3000/')

    const button = await page.getByText('View Journey')

    const count = await button.count()

    console.log(count)

    expect(count).toBe(1)
})