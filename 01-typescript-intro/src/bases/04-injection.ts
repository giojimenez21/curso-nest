import { Move, PokemonAPI } from "../interfaces/Pokemon";
import { HttpAdapter, PokeApiAdapter } from "../api/pokeApi.adapter";

export class Pokemon {
    get imageUrl(): string {
        return `https://pokemon.com/${this.id}.jpg`;
    }

    constructor(
        public readonly id: number,
        public name: string,
        private readonly http: HttpAdapter
    ) // Todo: inyectar dependencias

    {}

    scream() {
        console.log(`${this.name.toUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name}, ${this.name}`);
    }

    async getMoves(): Promise<Move[]> {
        const data = await this.http.get<PokemonAPI>('https://pokeapi.co/api/v2/pokemon/4');
        return data.moves;
    }
}

const pokeApi = new PokeApiAdapter();
export const charmander = new Pokemon(4, "Charmander", pokeApi);

charmander.getMoves();
