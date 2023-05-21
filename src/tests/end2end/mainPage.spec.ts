import { test, expect } from '@playwright/test';


test('basic test',async ({page}) => {
    
    await page.goto('http://localhost:3000/')

    const welcome = page.getByText('Welcome')
    expect(welcome.innerText()).toBe('Welcome')
})