import React from 'react';

import './custom-buttom.styles.scss';

interface ButtonProps{
  children: String,
  inverted?: Boolean,
  handleClick : ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | any

}

const CustomButton = ({
  children,
  inverted,
handleClick,
  ...otherProps
}: ButtonProps) => (
  <button
    className={`${inverted ? 'inverted' : ''} custom-button`}
    {...otherProps}
    onClick = {handleClick}
  >
    {children}
  </button>
);

export default CustomButton;
