import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

import { Field, Title } from '../../../../components';
import { PokemonInfo } from '../../../../types/interfaces';

type PokemonInfoProps = PokemonInfo

const PokemonInfoComponent: FC<PokemonInfoProps> = props => {
  const { name, height, weight, hp, attack, defense } = props;
  const types = props.types.join(',');

  return (
    <div className="flex flex-col w-[200px] p-4">
      <Title className="pb-2.5" title={`<${name}>`} />
      <Field name="types" value={types} />
      <Field name="Height" value={height} />
      <Field name="Weight" value={weight} />
      <Field name="HP" value={hp} />
      <Field name="Attack" value={attack} />
      <Field name="Defense" value={defense} />
    </div>
  );
};

export default PokemonInfoComponent;
