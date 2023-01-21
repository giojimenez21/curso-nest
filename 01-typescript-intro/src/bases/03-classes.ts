import axios from "axios";
import { PokemonAPI } from "../interfaces/Pokemon";

export class Pokemon {
    public readonly id:number;
    public name:string;

    
    constructor(id:number, name:string) {
        this.id = id;
        this.name = name;
    }
    
    get imageUrl():string {
        return `https://pokemon.com/${ this.id }.jpg`;
    }

    scream() {
        console.log(`${ this.name.toUpperCase() }!!!`);
    }

    async getMoves() {
        const response = await axios.get<PokemonAPI>('https://pokeapi.co/api/v2/pokemon/4');
        return response.data.moves;
    }
}

export const charmander = new Pokemon(4, 'Charmander');

