/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './menu-item.scss';

interface MenuItemProps {
  title: string;
  imageUrl: string;
  size?: string;
 
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  title,
  imageUrl,
  size,
 
}) => {
  const history = useHistory();
  const location = useLocation();


  const handleClick = () => {
    history.push(`${location.pathname}shop/${title}`);
  };

  return (
    <div className={`${size} menu-item`}>
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>

      <div className='content' onClick={handleClick}>
        <h1 className='title'>
        {title.toUpperCase()}
          </h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
