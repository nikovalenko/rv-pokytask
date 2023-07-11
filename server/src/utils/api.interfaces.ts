export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface PokemonResponse {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    stat: {
      name: string;
    };
    base_stat: number;
  }[];
}

export interface TypeResponse {
  pokemon: {
    pokemon: Pokemon;
  }[];
}
