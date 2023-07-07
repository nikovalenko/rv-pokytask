import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

interface ImageProps {
  id: string;
  name: string;
  className?: string;
}

const defaultClassName = `border-2 border-black`;

const Image: FC<ImageProps> = ({ id, name, className }) => {
  try {
    const alt = `${name} image`;
    const fetchedSrc = require(`../../assets/${id}.png`);
    return <img className={`${defaultClassName} ${className}`} src={fetchedSrc} alt={alt} />;
  } catch (error) {
    return null;
  }
};

export default Image;
