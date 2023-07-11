import { Pokemon } from "./api.interfaces";

export interface GetPokemonsResponse {
  nextPage: number | null;
  currPage: number;
  prevPage: number | null;
  pokemons: {
    name: string;
    id: number;
  }[];
}

export interface GetPokemonInfo {
  id: number;
  name: string;
  types: string[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
}

export interface GetPokemonsByType {
  pokemons: Pokemon[];
}


