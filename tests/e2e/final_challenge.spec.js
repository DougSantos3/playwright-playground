import { test, expect } from '../../fixtures/index.js'
import { PokeAppPage} from '../../pages/PokeAppPage.js'

test.describe('Final Challenge: UI + API + environment Mocks @mock', () =>  {

    test('Should validate Charizard data across layers', async ({ page, pokemonService, smartMock}) => {
        const pokePage = new PokeAppPage(page)

        await page.goto('/')
        await pokePage.searchAndOpenDetails('charizard')

        await expect(pokePage.cardTitle).toHaveText('mocked-charizard')
        await expect(pokePage.weightText).toHaveText('9999')

        const response = await pokemonService.getPokemon('charizard')
        expect(response.status()).toBe(200)

        const data = await response.json()

        console.log(`Verified Pokemon: ${data.name}`)

    })

})
