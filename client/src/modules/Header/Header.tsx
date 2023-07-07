import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

import { HeaderButtons,HeaderNav } from '.';

const Header: FC = () => {
  return (
    <header className="flex flex-col sm:flex-row justify-between">
      <HeaderNav />
      <HeaderButtons />
    </header>
  );
};

export default Header;
