import React, { FC, useState } from 'react';

import { Button } from '../../../../components';
import Modal from '../../../../components/Modal/Modal';
import { RegistrForm } from '../..';

const RegisterModal: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Register</Button>
      {isOpen && (
        <Modal onClose={closeModal}>
          <RegistrForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default RegisterModal;
