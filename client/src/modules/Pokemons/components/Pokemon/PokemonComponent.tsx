import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Image, Title } from '../../../../components';
import { Pokemon } from '../../../../types/interfaces';

interface PokemonProps {
  id: Pokemon['id'];
  name: Pokemon['name'];
}

const PokemonComponent: FC<PokemonProps> = props => {
  const { name } = props;

  return (
    <Link to={`/pokemon/${name}`} className="grid place-items-center border-2 border-black">
      <Image className="w-[100px] m-1" {...props} />
      <Title className="capitalize bg-secondary m-1 rounded" title={`<${name}>`} />
    </Link>
  );
};

export default PokemonComponent;
