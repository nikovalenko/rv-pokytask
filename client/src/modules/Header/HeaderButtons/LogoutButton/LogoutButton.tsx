import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

import { Button } from '../../../../components';
import { useAppDispatch } from '../../../../store';
import { removeToken } from '../../../../store/tokenSlice';

const LogoutButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
