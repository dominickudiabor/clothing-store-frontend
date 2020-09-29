import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppState, NewUser } from '../../../types';

import './dashboard.scss';
import { Button } from '@material-ui/core';

import './dashboard.scss';
import { confirmEmailStart } from '../../../redux/actions';
import { useHistory } from 'react-router-dom';

const DashBoard = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { currentUser, token: authCheck } = useSelector(
    (state: AppState) => state.user
  );

  const {
    firstname,
    lastname,
    email,
    photo,
    _id: userId,
  } = currentUser as NewUser;

  const handleToggle = () => {
    history.push('/profile/update');
  };
  const handleEmailConfirm = () => {
    const data = { userId, authCheck };
    dispatch(confirmEmailStart(data));
  };

  return (
    <>
      <div className='dashboard'>
        <div
          className='dash__header'
          tabIndex={0}
          role='button'
          onKeyDown={handleToggle}
          onClick={handleToggle}
        >
          Profile
        </div>

        <div className='dash__contents'>
          <img
            className='dash__image'
            src={photo || 'https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'}
            alt='current logged in profile'
          />

          <h3>{`${firstname} ${lastname}`}</h3>
          {currentUser?.role === 'admin' && <h4>Admin</h4>}
          <p>{email}</p>
          {currentUser?.role === 'user' && (
            <Button className='button'>Request Admin Access</Button>
          )}

          <div>
            {' '}
            <Button onClick={handleEmailConfirm} className='button'>
              Confirm email
            </Button>
          </div>

          <div className='dash__buttons'>
            <div
              role='button'
              onClick={handleToggle}
              tabIndex={0}
              onKeyDown={handleToggle}
              className='update'
            >
              Update user account information
            </div>

            <div className='confirm'>
              Confirm Email and re-login to update account information
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashBoard;
