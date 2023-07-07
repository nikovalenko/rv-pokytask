import 'tailwindcss/tailwind.css';

import React, { FC } from 'react';

interface FieldProps {
  name: string;
  value: string | number;
}

const defaultClassName = `capitalize text-[10px] `;

const Field: FC<FieldProps> = props => {
  const { name, value } = props;
  return (
    <div className="flex justify-between">
      <div className={defaultClassName}>{name}</div>
      <div className={defaultClassName}>{`<${value}>`}</div>
    </div>
  );
};

export default Field;
