import { test, expect } from '@playwright/test'
import { PokemonService } from '../services/PokemonService'
import { PlaywrightPage } from '../pages/PlaywrightPage.js'

test.describe('Automation Full Stack', () => {

    test('Should check contract of PokeApi', async ({ page, request }) => {
        const pokemonService = new PokemonService(request)
        const playwrightPage = new PlaywrightPage(page)

        const response = await pokemonService.getPokemon('pikachu')
        expect(response.status()).toBe(200)

        await playwrightPage.visit()
        await playwrightPage.searchFor('Api')

        await expect(page.locator('h1')).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.')
    })

    test('Should navigation in site of Playwright and search documentation', async ({ page }) => {
        await page.goto('/')

        const searchButton = page.getByRole('button', { name: 'Search' })
        await  searchButton.click()

        const searchInput = page.getByPlaceholder('Search docs')
        await searchInput.fill('API')
        await page.keyboard.press('Enter')

        await expect(page.locator('h1')).toContainText('Playwright enables reliable web automation for testing, scripting, and AI agents.')
    })
})