import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { POKEMON_URL } from 'config/config';
import { fetchPokemons } from 'store/pokemonsSlice';
import { Pokemon } from 'types/interfaces';

interface PokemonState {
  pokemon: Pokemon;
}

const initialState: PokemonState = {
  pokemon: {
    id: '',
    name: '',
    types: [],
    height: 0,
    weight: 0,
    hp: 0,
    attack: 0,
    defense: 0,
  },
};

export const fetchPokemon = createAsyncThunk('pokemon/fetch', async (id: string) => {
  const url = `${POKEMON_URL}${id}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

export const PokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPokemon.fulfilled, (state, action) => {
      state.pokemon = action.payload;
    });

    builder.addCase(fetchPokemons.fulfilled, state => {
      state.pokemon = initialState.pokemon;
    });
  },
});

export default PokemonSlice.reducer;
