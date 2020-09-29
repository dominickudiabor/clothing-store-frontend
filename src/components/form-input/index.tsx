import React from 'react';

import './form-input.scss';

interface propType {
  name: string;
  type: string;
  value: string | undefined | any;
  label?: string;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  handleChange: (event: {
    target: {
      value: string;
      name: string;
    };
  }) => void;
}

const FormInput = ({
  name,
  type,
  handleChange,
  label,
  value,
  minLength,
  pattern,
}: propType) => (
  <div className='input'>
    <input
      minLength={minLength}
      onChange={handleChange}
      autoComplete='off'
      id={name}
      type={type}
      name={name}
      value={value}
      pattern={pattern}
    />
    {label && (
      <label
        htmlFor={name}
        className={`${value?.length ? 'input__shrink' : ''} input__label`}
      >
        {label}
      </label>
    )}
  </div>
);

export default FormInput;
