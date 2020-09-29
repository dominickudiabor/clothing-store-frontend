import React, { useState } from 'react';

import FormInput from '../form-input';
import { AppState } from '../../types';
import { passwordUpdateStart } from '../../redux/actions';

import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useDispatch, useSelector } from 'react-redux';

import '../../scss/form.scss';
import { useHistory } from 'react-router-dom';

const PasswordUpdate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const history = useHistory();

  const [input, setInput] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const { currentUser, token: authCheck } = useSelector(
    (state: AppState) => state.user
  );

  const { oldPassword, newPassword, confirmNewPassword } = input;

  const passwordConfirm = RegExp(/^[A-Za-z]\w{7,14}$/).test(newPassword);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handleReturn = () => {
    history.goBack();
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!oldPassword || !confirmNewPassword || !newPassword) {
      return;
    }
    if (newPassword !== confirmNewPassword) {
      return enqueueSnackbar('Passwords do not match', { variant: 'warning' });
    }
    if (!passwordConfirm) {
      return enqueueSnackbar('Password is invalid', { variant: 'warning' });
    }

    const data = {
      oldPassword,
      newPassword,
      email: currentUser?.email,
      userId: currentUser?._id,
      authCheck,
    };

    dispatch(passwordUpdateStart(data));

    setInput({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  return (
    <div className='sign-up'>
      <div className='update-title'>Password Update</div>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='password'
          name='oldPassword'
          value={oldPassword}
          handleChange={handleChange}
          label={'Old Password'}
          required
        />

        <FormInput
          type='password'
          name='newPassword'
          value={newPassword}
          handleChange={handleChange}
          label={'Password'}
          required
        />

        <FormInput
          type='password'
          name='confirmNewPassword'
          value={confirmNewPassword}
          handleChange={handleChange}
          label={'Confirm Password'}
          minLength={8}
          required
        />

        <Button
          className='button'
          variant='contained'
          color='primary'
          type='submit'
        >
          SUBMIT
        </Button>
      </form>
      <p className='info'>
        Your new password must include: 8-36 characters, at least 1 mixed-case
        letter and at least 1 number
      </p>
      <Button
        className='button'
        variant='text'
        color='default'
        type='submit'
        onClick={handleReturn}
      >
        return
      </Button>
    </div>
  );
};

export default PasswordUpdate;
