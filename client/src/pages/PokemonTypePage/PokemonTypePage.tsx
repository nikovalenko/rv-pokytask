import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

import { Page } from '../../components';
import { PokemonsByTypes } from '../../modules/Pokemons/components';

const PokemonTypePage: FC = () => {
  return (
    <Page>
      <h1 className="pb-2.5 font-bold">Pokemons by Types</h1>

      <PokemonsByTypes />
    </Page>
  );
};

export default PokemonTypePage;
