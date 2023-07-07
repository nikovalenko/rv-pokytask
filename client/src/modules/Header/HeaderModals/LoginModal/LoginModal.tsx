import React, { FC, useState } from 'react';

import { Button } from '../../../../components';
import Modal from '../../../../components/Modal/Modal';
import { LoginForm } from '../../';

const LoginModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Login</Button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <LoginForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default LoginModal;
