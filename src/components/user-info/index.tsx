import React from 'react';

import { Radio } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminModifyUser,
  highlightName,
  adminModifyProduct,
} from '../../redux/actions';
import { NewUser, AppState, Product } from '../../types';

import './user-info.scss';

interface propType {
  firstName?: string;
  lastName?: string;
  email?: string;
  bannedStatus?: boolean;
  date?: any;
  avatar?: string;
  value?: NewUser;
  product?: Product;
  confirm?: boolean;
  price?: number;
}

const UserInfo = ({
  firstName,
  lastName,
  email,
  bannedStatus,
  date,
  avatar,
  value,
  confirm,
  price,
  product,
}: propType) => {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state: AppState) => state.ui.highlightName
  );

  const handleChange = (value: NewUser | undefined) => () => {
    dispatch(highlightName(firstName));
    dispatch(adminModifyUser(value));
  };
  const handleProduct = (product: Product | undefined) => () => {
    dispatch(highlightName(firstName));
    dispatch(adminModifyProduct(product));
  };

  return (
    <>
      <div className='user'>
        <Radio
          checked={selectedOption === firstName}
          onClick={!price ? handleChange(value) : handleProduct(product)}
          color={'primary'}
          className='user__checkbox'
        />
        <div className='user__info'>
          <img
            src={avatar || 'https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'}
            alt='item'
          />
        </div>
        {!price ? (
          <span className='user__name'>{`${firstName} ${lastName}`} </span>
        ) : (
          <span className='user__name'>{firstName} </span>
        )}
        <span className={`${confirm && 'confirm'} user__email`}>{email}</span>
        {price && <span className='user__price'>€{price}</span>}
        {bannedStatus
          ? !price && (
              <span className='user__ban' style={{ color: 'red' }}>
                True
              </span>
            )
          : !price && (
              <span className='user__ban' style={{ color: 'green' }}>
                False
              </span>
            )}
        <span className='user__date'>{date}</span>
      </div>
    </>
  );
};

export default UserInfo;
