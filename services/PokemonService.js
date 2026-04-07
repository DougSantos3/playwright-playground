export class PokemonService {
    constructor(request, baseUrl) {
        this.request = request
        this.baseUrl = baseUrl
    }

    async getPokemon(name) { return await this.request.get(`${this.baseUrl}/pokemon/${name}`) }
}
