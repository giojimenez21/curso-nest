class NewPokemon {
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream() {
        console.log(this.name.toUpperCase);
    }
}

const MyDecorator = () => {
    return (target: Function) => {
        return NewPokemon;
    }
}

@MyDecorator()
export class Pokemon {
    constructor(
        public readonly id: number,
        public name: string
    ) {}

    scream() {
        console.log(this.name.toUpperCase);
    }
}

export const charmander = new Pokemon(4, 'charmander');
charmander.scream();