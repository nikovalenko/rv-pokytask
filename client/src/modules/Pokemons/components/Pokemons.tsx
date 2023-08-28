import 'tailwindcss/tailwind.css';

import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchPokemons } from 'store/pokemonsSlice';
import { Pokemon } from 'types/interfaces';

import NextPage from '../NextPage';
import PokemonComponent from './Pokemon/PokemonComponent';

const Pokemons: FC = () => {
  const dispatch = useAppDispatch();

  const pokemons = useAppSelector(state => {
    return state.pokemons.pokemons;
  }).map((pokemon: Pokemon) => {
    return <PokemonComponent key={pokemon.name} {...pokemon} />;
  });

  useEffect(() => {
    dispatch(fetchPokemons('1'));
  }, [dispatch]);

  return (
    <>
      <div className="h-4/5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 md:grid-rows-4 gap-4 ">{pokemons}</div>
      <div className="flex justify-center pt-6 bottom-5 inset-x-2/4">
        <NextPage />
      </div>
    </>
  );
};

export default Pokemons;
