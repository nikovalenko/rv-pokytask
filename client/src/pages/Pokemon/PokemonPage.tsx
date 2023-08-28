import 'tailwindcss/tailwind.css';

import { Image, Page } from 'components';
import { PokemonInfo, PokemonNav } from 'modules/Pokemons/components';
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { fetchPokemon } from 'store/pokemonSlice';

interface PokemonPageProps {
  id?: string;
}

const PokemonPage: FC<PokemonPageProps> = () => {
  const dispatch = useAppDispatch();

  const { id = '0' } = useParams<{ id?: string }>();

  const pokemon = useAppSelector(state => state.pokemon.pokemon);

  useEffect(() => {
    dispatch(fetchPokemon(id));
  }, [dispatch, id]);

  return (
    <Page>
      <div className="flex flex-col">
        <PokemonNav name={pokemon.name} />
        <div className="flex flex-col items-center md:flex-row md:items-start">
          <Image className="min-w-[256px] w-[256px] h-[256px]" {...pokemon} />
          <PokemonInfo {...pokemon} />
        </div>
      </div>
    </Page>
  );
};

export default PokemonPage;
