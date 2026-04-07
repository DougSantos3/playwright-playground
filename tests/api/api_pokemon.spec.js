import { test, expect } from '../../fixtures/index.js'

test.describe('PokeApi - Validaçao de Pokémon', () => {

    test('Should validate the datas of Pikachu with success', async ({ pokemonService }) => {
        const response = await pokemonService.getPokemon('pikachu')

        expect(response.ok()).toBeTruthy()
        const body = await response.json()

        expect(response.ok()).toBe(true)
        expect(body.id).toBe(25)
        expect(body.types[0].type.name).toBe('electric')
    })

    test('It should return 400 when attempting a Get on an non-existent resource', async ({ pokemonService }) => {
        const response = await pokemonService.getPokemon('/pokemon/agumon')
        expect(response.status()).toBe(400) 
    })    
})
