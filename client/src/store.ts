import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { PageParamsSlice } from 'store/pageParamsSlice';
import { PokemonsByTypeSlice } from 'store/pokemonByTypesSlice';
import { PokemonsDataSlice } from 'store/pokemonsDataSlice';
import { PokemonSlice } from 'store/pokemonSlice';
import { PokemonsSlice } from 'store/pokemonsSlice';
import { TokenSlice } from 'store/tokenSlice';

const createStore = (options?: ConfigureStoreOptions['preloadedState']) =>
  configureStore({
    reducer: {
      pokemon: PokemonSlice.reducer,
      pokemons: PokemonsSlice.reducer,
      pageParams: PageParamsSlice.reducer,
      pokemonsByType: PokemonsByTypeSlice.reducer,
      pokemonsData: PokemonsDataSlice.reducer,
      token: TokenSlice.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    ...options,
  });

export const store = createStore();
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
