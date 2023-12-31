import 'tailwindcss/tailwind.css';

import { Page } from 'components';
import { Pokemons } from 'modules/Pokemons/components';
import React, { FC } from 'react';

const Pokedex: FC = () => {
  return (
    <Page>
      <h1 className="pb-2.5 font-bold">Pokedex</h1>
      <Pokemons />
    </Page>
  );
};

export default Pokedex;
