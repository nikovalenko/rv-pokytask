import 'tailwindcss/tailwind.css';

import { Header } from 'modules/Header';
import React, { FC, ReactNode } from 'react';

interface PageProps {
  children: ReactNode | undefined;
}

const PageComponent: FC<PageProps> = ({ children }) => {
  return (
    <div className="p-6 h-auto md:h-full sm:h-auto">
      <Header />
      {children}
    </div>
  );
};

export default PageComponent;
