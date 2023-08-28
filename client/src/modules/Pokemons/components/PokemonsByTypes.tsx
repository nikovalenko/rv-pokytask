import 'tailwindcss/tailwind.css';

import { PokemonTypes } from 'config/config';
import { TypeSelect } from 'modules/Pokemons/TypeSelector';
import React, { FC } from 'react';
import { useAppSelector } from 'store';
import { Pokemon } from 'types/interfaces';

import PokemonComponent from './Pokemon/PokemonComponent';

const PokemonsByTypes: FC = () => {
  const pokemons = useAppSelector(state => {
    return state.pokemonsByType.pokemonsByType;
  }).map((pokemon: Pokemon) => {
    return <PokemonComponent key={pokemon.name} {...pokemon} />;
  });

  return (
    <>
      <div className="h-4/5 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 md:grid-rows-4 gap-4 ">{pokemons}</div>
      <div className="flex justify-center pt-6 bottom-5 inset-x-2/4">
        <TypeSelect options={PokemonTypes} />
      </div>
    </>
  );
};

export default PokemonsByTypes;
