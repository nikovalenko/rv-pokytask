import 'tailwindcss/tailwind.css';

import { Page } from 'components';
import { PokemonsByTypes } from 'modules/Pokemons/components';
import React, { FC } from 'react';

const PokemonTypePage: FC = () => {
  return (
    <Page>
      <h1 className="pb-2.5 font-bold">Pokemons by Types</h1>
      <PokemonsByTypes />
    </Page>
  );
};

export default PokemonTypePage;
