import bcrypt from 'bcrypt';

export const PORT = 9001;
export const LAST_POKEMON = 151;
export const PAGE_LIMIT = 20;

export const POKEMONS_API_URL = 'https://pokeapi.co/api/v2';
export const POKEMONS_URL = `${POKEMONS_API_URL}/pokemon/`;
export const TYPES_URL = `${POKEMONS_API_URL}/type/`;

// export const MONGO_URL = 'mongodb://localhost:27017/Pokemon';
export const MONGO_URL = 'mongodb://db:27017/Pokemon';

export const JWT_SECRET = 'secret_key';

export const SALT = bcrypt.genSaltSync(10);
