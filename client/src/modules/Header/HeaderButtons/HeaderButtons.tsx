import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';
import { useAppSelector } from 'store';

import { LoginModal, LogoutButton, RegisterModal, UploadButton } from '..';

const HeaderButtons: FC = () => {
  const token = useAppSelector(state => state.token.token);

  return (
    <div className="flex flex-row space-x-4">
      {token && (
        <>
          <UploadButton />
          <LogoutButton />
        </>
      )}
      {!token && (
        <>
          <LoginModal />
          <RegisterModal />
        </>
      )}
    </div>
  );
};

export default HeaderButtons;
