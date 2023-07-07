export interface GenericError extends Error {
  status?: number;
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonsResponse {
  next: string;
  previous: string;
  results: Pokemon[];
}

export interface Stat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export interface Type {
  type: {
    name: string;
  };
}

export interface PokemonResponse {
  name: string;
  id: number;
  height: number;
  weight: number;
  types: Type[];
  stats: Stat[];
}

export interface TypePokemon {
  pokemon: Pokemon;
}

export interface TypeResponse {
  pokemon: TypePokemon[];
}

export interface PokemonInfo {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
}
