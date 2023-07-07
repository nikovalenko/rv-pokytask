import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { TYPES_URL } from '../config/config';
import { Pokemon } from '../types/interfaces';

interface PokemonsByTypeState {
  pokemonsByType: Pokemon[];
}

const initialState: PokemonsByTypeState = {
  pokemonsByType: [],
};

export const fetchPokemonsByType = createAsyncThunk('types/fetch', async (type: string) => {
  const url = `${TYPES_URL}${type}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

export const PokemonsByTypeSlice = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
      state.pokemonsByType = action.payload.pokemons;
    });
  },
});

export default PokemonsByTypeSlice.reducer;
