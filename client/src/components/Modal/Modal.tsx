import 'tailwindcss/tailwind.css';

import React, { FC, ReactNode, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const modalOverlayClasses = 'fixed inset-0 flex items-center justify-center bg-opacity-75 bg-gray-900';
const modalContainerClasses = 'bg-white rounded-lg p-6';

type ModalProps = {
  onClose: () => void;
  children: ReactNode;
};

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const modalRoot = document?.getElementById('modal-root') as HTMLElement;

  return ReactDOM.createPortal(
    <div className={modalOverlayClasses}>
      <div ref={modalRef} className={modalContainerClasses}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
