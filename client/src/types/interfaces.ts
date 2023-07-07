export interface PageParams {
  prevPage: string;
  currPage: string;
  nextPage: string;
}

export interface PokemonInfo {
  name: string;
  types: string[];
  height: number;
  weight: number;
  hp: number;
  attack: number;
  defense: number;
}

export interface Pokemon extends PokemonInfo {
  id: string;
}

export interface PokemonLayout {
  id: string;
  name: string;
  url: string;
}
