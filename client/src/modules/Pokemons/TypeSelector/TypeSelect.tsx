import React, { ChangeEvent, FC } from 'react';
import { useAppDispatch } from 'store';
import { fetchPokemonsByType } from 'store/pokemonByTypesSlice';

interface TypeSelectProps {
  options: string[];
}

const TypeSelect: FC<TypeSelectProps> = ({ options }) => {
  const dispatch = useAppDispatch();

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = event.target.value;
    dispatch(fetchPokemonsByType(selectedOption));
  };

  return (
    <select className="w-[100px] h-[30px] bg-black text-white" onChange={handleSelectChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default TypeSelect;
