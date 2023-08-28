import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Pokemon } from 'types/interfaces';

interface UploadState {
  csvPokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  csvPokemons: [],
  loading: false,
  error: null,
};

const uploadSlice = createSlice({
  name: 'pokemons/upload',
  initialState,
  reducers: {
    uploadRequest: state => {
      state.loading = true;
      state.error = null;
    },
    uploadSuccess: (state, action: PayloadAction<Pokemon[]>) => {
      state.loading = false;
      state.csvPokemons = action.payload;
    },
    uploadFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { uploadRequest, uploadSuccess, uploadFailure } = uploadSlice.actions;
export default uploadSlice.reducer;
