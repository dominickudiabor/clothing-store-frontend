import React, { useState } from 'react';
import FormInput from '../form-input';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import '../../scss/form.scss';
import {
  updateUserProfileStart,
  uploadProfilePhoto,
} from '../../redux/actions';
import { AppState, UpdatedUser } from '../../types';
import { useHistory } from 'react-router-dom';

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { token: authCheck, currentUser } = useSelector(
    (state: AppState) => state.user
  );

  const [input, setInput] = useState<UpdatedUser>({
    displayName: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
  });
  const { displayName, firstName, lastName, email, photo } = input;

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleToggle = () => {
    history.push('/profile/update-password');
  };

  const handleReturn = () => {
    history.goBack();
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (Object.values(input).filter(Boolean).length === 0) return;

    const updatedUser = {
      ...input,
      userId: currentUser?._id,
      authCheck,
    };

    dispatch(updateUserProfileStart(updatedUser));

    setInput({
      displayName: '',
      firstName: '',
      lastName: '',
      email: '',
      photo: '',
    });
  };

  const fileSelectHandler = (event: { target: { files: any } }) => {
    setInput({ ...input, photo: event.target.files[0] });
  };

  const handlePhotoUpload = async () => {
    if (!photo) return;
    const user = { photo, userId: currentUser?._id } as UpdatedUser;

    dispatch(uploadProfilePhoto(user));
  };

  return (
    <div className='sign-up'>
      <div className='header'>Update User Information</div>
      <label htmlFor='photo'>
        <input
          style={{ display: 'none' }}
          id='photo'
          name='photo'
          type='file'
          accept='.png, .jpg'
          onChange={fileSelectHandler}
        />
        <img
          className='update-photo'
          src={
            currentUser?.photo ||
            'https://i.ibb.co/MCxqZF5/avatar-1577909-1280.png'
          }
          alt='current logged in profile'
        />
      </label>
      <Button
        className='button'
        variant='text'
        color='primary'
        onClick={handlePhotoUpload}
      >
        Upload New Photo
      </Button>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label={'Display Name'}
          minLength={3}
          required={false}
        />
        <FormInput
          type='firstName'
          name='firstName'
          value={firstName}
          handleChange={handleChange}
          label={'Firstname'}
          required={false}
        />

        <FormInput
          type='lastName'
          name='lastName'
          value={lastName}
          handleChange={handleChange}
          label={'Lastname'}
          required={false}
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label={'Email'}
          required={false}
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
      <div
        tabIndex={0}
        role='button'
        className='password'
        onKeyDown={handleToggle}
        onClick={handleToggle}
      >
        Click to Update Password
      </div>
      <div className='info-text'>
        Enter information only in fields you wish to update, change profile
        photo by clicking on the image
      </div>
      <Button
        className='button'
        variant='text'
        color='primary'
        type='submit'
        onClick={handleReturn}
      >
        return
      </Button>
    </div>
  );
};

export default ProfileUpdate;
