import { test as base, expect } from '@playwright/test'

export const test = base.extend({
    smartMock: async ({ page }, use)  => {
        const isDev = process.env.BASE_URL?.includes('dev')

        if (isDev) {
            console.log('🛠️ [MOCK] Dev environment detected. Intercepting API...')
            await page.route('**/api/v2/pokemon/charizard', async (route) => {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        name: 'mocked-charizard',
                        weight: 9999,
                        abilities: [{ ability: { name: 'unlimited-power'}}]
                    })
                })
            })
        } else {
            console.log('🌐 [REAL] QA/Prod detected. Using live API')
        }
        await use(page)
    }
})

export { expect }