import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { saveAs } from 'file-saver';

import { Pokemon } from '../types/interfaces';

interface PokemonsDataState {
  pokemons: Pokemon[];
}

const initialState: PokemonsDataState = {
  pokemons: [],
};

const saveFetchedJsonToFile = (state: PokemonsDataState, action: PayloadAction<{ pokemons: Pokemon[] }>) => {
  try {
    const jsonData = JSON.stringify(action.payload, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    saveAs(blob, 'data.json');
  } catch (error) {
    console.error('Error saving JSON to file:', error);
  }
};

export const PokemonsDataSlice = createSlice({
  name: 'pokemonsDataSlice',
  initialState,
  reducers: {
    saveFetchedJson: saveFetchedJsonToFile,
  },
});

export const { saveFetchedJson } = PokemonsDataSlice.actions;

export default PokemonsDataSlice.reducer;