import { test, expect } from '@playwright/test'
import { PokemonService } from '../services/PokemonService'

test.describe('PokeApi - Validaçao de Pokémon', () => {
    let pokemonService

    test.beforeEach(async ({ request }) => {
        pokemonService = new PokemonService(request)
    })

    test('Should validate the datas of Pikachu with success', async ({request}) => {
        const response = await pokemonService.getPokemon('pikachu')

        expect(response.ok()).toBeTruthy()
        const body = await response.json()

        expect(response.ok()).toBe(true)
        expect(body.id).toBe(25)
        expect(body.types[0].type.name).toBe('electric')
    })

    test('It should return 400 when attempting a Get on an non-existent resource', async () => {
        const response = await pokemonService.getPokemon('/pokemon/agumon')
        expect(response.status()).toBe(400)
    })    
})