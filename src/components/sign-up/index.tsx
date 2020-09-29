import React, { useState } from 'react';

import FormInput from '../form-input';

import { Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { toggleSignUpForm, signUpStart } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import '../../scss/form.scss';

const SignUp = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const {
    displayName,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  } = input;

  const emailConfirm = RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(
    email
  );

  const passwordConfirm = RegExp(/^[A-Za-z]\w{7,14}$/).test(password);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleToggle = () => {
    dispatch(toggleSignUpForm());
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      enqueueSnackbar('Passwords do not match', { variant: 'warning' });
    } else {
      if (emailConfirm && passwordConfirm === true) {
        const newUser = input;
        dispatch(signUpStart(newUser));

        setInput({
          displayName: '',
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
      } else if (!emailConfirm) {
        enqueueSnackbar('Invalid Email', { variant: 'warning' });
      } else enqueueSnackbar('Invalid Password', { variant: 'warning' });
    }
  };

  return (
    <div className='sign-up'>
      <p className='title'>Create An Account</p>
      <div
        role='button'
        onClick={handleToggle}
        tabIndex={0}
        onKeyDown={handleToggle}
        className='signUp'
      >
        Already have a account ? Sign In{' '}
      </div>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label={'Display Name'}
          minLength={3}
          required
        />
        <FormInput
          type='firstName'
          name='firstName'
          value={firstName}
          handleChange={handleChange}
          label={'Firstname'}
          required
        />

        <FormInput
          type='lastName'
          name='lastName'
          value={lastName}
          handleChange={handleChange}
          label={'Lastname'}
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label={'Email'}
          required
        />

        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label={'Password'}
          required
        />

        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
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
          SIGN UP
        </Button>
      </form>
      <p className='info'>
        Your new password must include: 8-36 characters, at least 1 mixed-case
        letter and at least 1 number
      </p>
    </div>
  );
};

export default SignUp;
