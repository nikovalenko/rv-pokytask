import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface PokemonNavProps {
  name: string;
}

const PokemonNav: FC<PokemonNavProps> = ({ name }) => {
  return (
    <div className="flex space-x-4 pb-2.5">
      <Link to={'/'}>
        <h1 className="font-bold text-base">Pokedex</h1>
      </Link>
      <p className="font-bold text-base">/</p>
      <p className="capitalize font-bold text-base"> {name}</p>
    </div>
  );
};

export default PokemonNav;
