import { test, expect } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

const DEMO_URL = `file://${path.resolve(__dirname, '../../demo/demo-app.html')}`

test.describe('Tests using mocks @mock', async () => {
    test('Should display mocked pokemon on fron-end', async ({ page }) => {
        await page.route('**/api/v2/pokemon/pikachu', async (route) => {
            const json = {
                name: 'mewthree',
                id: 999,
                types: [{ type: { name: 'psychic'} }]
            }
            await route.fulfill({ json })
        })

        await page.goto(DEMO_URL)

        await expect(page.locator('#pokemon-name')).toHaveText('mewthree')
    })

    test('Should show error message when API fails @mock', async ({ page }) => {
        await page.route('**/api/v2/pokemon/*', route => {
            route.fulfill({
                status: 500,
                contentType: 'application/json',
                body: JSON.stringify({ error: 'Internal Server Error' })
            })
        })
   
        await page.goto(DEMO_URL)

        await expect(page.locator('.error-banner')).toBeVisible()
    })
})
