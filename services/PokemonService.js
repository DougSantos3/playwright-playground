export class PokemonService {
    constructor(request) {
        this.request = request
        this.baseUrl = process.env.API_URL_POKEAPI ||'https://pokeapi.co/api/v2'
    }

    async getPokemon(name) { return await this.request.get(`${this.baseUrl}/pokemon/${name}`) }
}
