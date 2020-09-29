import React, { useState } from 'react';
import FormInput from '../form-input';
import { Button } from '@material-ui/core';
import axios from 'axios';

import './image-upload.scss';

const ImageUpload = () => {
  const [image, setImage] = useState({
    imageTitle: '',
    fileUpload: {},
  });
  const { imageTitle, fileUpload } = image;

  const handleFileName = (event: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = event.target;
    setImage({ ...image, [name]: value });
  };

  const fileSelectHandler = (event: { target: { files: any } }) => {
    setImage({ ...image, fileUpload: event.target.files[0] });
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    const response = await axios.post('users/uploadphoto', { image });
    return response;
  };

  console.log(fileUpload);

  return (
    <div className='sign-up'>
      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='imageTitle'
          value={imageTitle}
          handleChange={handleFileName}
          label={'Image Title'}
        />

        <label htmlFor='upload-photo'>
          <input
            style={{ display: 'none' }}
            id='upload-photo'
            name='upload-photo'
            type='file'
            onChange={fileSelectHandler}
          />
          <Button
            color='secondary'
            variant='contained'
            component='span'
            className='upload-button'
          >
            Upload Image
          </Button>{' '}
        </label>

        <Button
          className='button'
          variant='contained'
          color='primary'
          type='submit'
        >
          SUBMIT
        </Button>
      </form>
    </div>
  );
};

export default ImageUpload;
