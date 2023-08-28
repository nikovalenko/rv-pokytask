import 'tailwindcss/tailwind.css';

import { Button } from 'components';
import React, { FC } from 'react';
import { useAppDispatch } from 'store';
import { removeToken } from 'store/tokenSlice';

const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
