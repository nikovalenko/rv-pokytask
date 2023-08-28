import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from 'store/pokemonsSlice';
import { PageParams } from 'types/interfaces';

interface PageParamsState {
  pageParams: PageParams;
}

const initialState: PageParamsState = {
  pageParams: {
    prevPage: '',
    currPage: `1`,
    nextPage: ``,
  },
};

export const PageParamsSlice = createSlice({
  name: 'pageParams',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      const { prevPage, currPage, nextPage } = action.payload;
      state.pageParams = { prevPage, currPage, nextPage };
    });
  },
});

export default PageParamsSlice.reducer;
