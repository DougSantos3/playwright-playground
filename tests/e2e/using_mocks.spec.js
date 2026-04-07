import { test, expect } from '@playwright/test'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url) 
const __dirname = path.dirname(__filename) 

const SITE_TO_BE_TESTED_URL = `file://${path.resolve(__dirname, '../../site_to_be_tested/site.html')}`

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

        await page.goto(SITE_TO_BE_TESTED_URL)

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
   
        await page.goto(SITE_TO_BE_TESTED_URL)

        await expect(page.locator('.error-banner')).toBeVisible()
    })
})
