import { test, expect} from '../fixtures/pokeFixture.js'
import { PokeAppPage} from '../pages/PokeAppPage.js'
import { PokemonService } from '../services/PokemonService.js'

test.describe('Final Challenge: UI + API + environment Mocks @mock', () =>  {

    test('Should validate Charizard data across layers', async ({ page, request, smartMock}) => {
        const pokePage = new PokeAppPage(page)
        const pokeApi = new PokemonService(request)

        await page.goto('/')
        await pokePage.searchAndOpenDetails('charizard')

        await expect(pokePage.cardTitle).toHaveText('mocked-charizard')
        await expect(pokePage.weightText).toHaveText('9999')

        const response = await pokeApi.getPokemon('charizard')
        expect(response.status()).toBe(200)

        const data = await response.json()

        console.log(`Verified Pokemon: ${data.name}`)

    })

})