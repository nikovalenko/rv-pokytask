import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const HeaderNav: FC = () => (
  <div className="flex flex-row space-x-4">
    <Link to={'/'}>
      <h2 className="text-base">To Pokedex</h2>
    </Link>
    <Link to={'/types'}>
      <h2 className=" text-base">To Types</h2>
    </Link>
  </div>
);

export default HeaderNav;
