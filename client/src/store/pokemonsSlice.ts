import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { POKEMONS_URL } from 'config/config';
import { Pokemon } from 'types/interfaces';

interface PokemonsState {
  pokemons: Pokemon[];
}

const initialState: PokemonsState = {
  pokemons: [],
};

export const fetchPokemons = createAsyncThunk('pokemons/fetch', async (page: string) => {
  const url = `${POKEMONS_URL}${page}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});

export const PokemonsSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.pokemons = action.payload.pokemons;
    });
  },
});

export default PokemonsSlice.reducer;
