import 'tailwindcss/tailwind.css';

import React, { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const defaultClassName = `flex  items-center
   bg-white hover:bg-black disabled:bg-black 
   text-black hover:text-white disabled:text-white
   font-bold py-2 px-4 
   border-2 border-black 
   shadow-md hover:shadow-lg`;

const Button: FC<ButtonProps> = props => {
  const { children, onClick, disabled = false, className } = props;

  return (
    <button className={className || defaultClassName} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
