import 'tailwindcss/tailwind.css';

import React, { Route, Routes } from 'react-router-dom';

import Pokedex from '../../pages/Pokedex';
import PokemonPage from '../../pages/Pokemon/PokemonPage';
import PokemonTypePage from '../../pages/PokemonTypePage';

export const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Pokedex />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
        <Route path="/types/" element={<PokemonTypePage />} />
      </Routes>
    </div>
  );
};
