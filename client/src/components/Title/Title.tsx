import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

interface TitleProps {
  title: string;
  className?: string;
}

const defaultClassName = `capitalize font-bold text-xs`;

const Title: FC<TitleProps> = ({ title, className }) => <p className={`${defaultClassName} ${className}`}>{title}</p>;

export default Title;
