import { test as base, expect } from '@playwright/test'
import { ApiService } from '../services/ApiService.js'
import { PokemonService } from '../services/PokemonService.js'

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
    },

    apiService: async ({ request }, use) => {
        const baseUrl = process.env.API_URL_JSONPLACEHOLDER || 'https://jsonplaceholder.typicode.com'
        await use(new ApiService(request, baseUrl))
    },

    pokemonService: async ({ request }, use) => {
        const baseUrl = process.env.API_URL_POKEAPI || 'https://pokeapi.co/api/v2'
        await use(new PokemonService(request, baseUrl))
    }
})

export { expect }
