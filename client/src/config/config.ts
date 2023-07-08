import bcrypt from 'bcryptjs';

export const POKEMONS_SERVER_API_URL = 'http://localhost:9001/api';
export const POKEMONS_URL = `${POKEMONS_SERVER_API_URL}/pokemons/`;
export const POKEMON_URL = `${POKEMONS_SERVER_API_URL}/pokemon/`;
export const TYPES_URL = `${POKEMONS_SERVER_API_URL}/type/`;
export const UPLOAD_URL = `${POKEMONS_URL}upload`;
export const LOGIN_URL = `${POKEMONS_SERVER_API_URL}/login`;
export const REGISTER_URL = `${POKEMONS_SERVER_API_URL}/register`;

export const SALT_ROUNDS = 10;
export const SALT = bcrypt.genSaltSync(SALT_ROUNDS);

export const PokemonTypes = [
  'shadow',
  'unknown',
  'fairy',
  'dark',
  'dragon',
  'ice',
  'psychic',
  'electric',
  'grass',
  'water',
  'fire',
  'steel',
  'ghost',
  'bug',
  'rock',
  'ground',
  'poison',
  'flying',
  'fighting',
  'normal',
];
