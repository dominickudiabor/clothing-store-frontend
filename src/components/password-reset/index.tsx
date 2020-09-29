import React, { useState } from 'react';

import FormInput from '../form-input';

import { Button } from '@material-ui/core';

import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';

import '../../scss/form.scss'


const PasswordResetForm = () => {
  const [input, setInput] = useState({
    password: undefined as string | undefined,
    confirmPassword: undefined as string | undefined,
  });
  const {password,confirmPassword  } = input
  const history = useHistory()

  const {token }= useParams()
  const userUrl = 'http://localhost:9000/api/v1/auth/';
  const { enqueueSnackbar } = useSnackbar();


  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };
  const handleReturn = () => history.push('/login')

 const handleSubmit = async (event: { preventDefault: () => void }) => {
  event.preventDefault();
  if(!password){return }
  if (confirmPassword !== password) { return enqueueSnackbar('Passwords do not match', { variant: 'error' })
  }
try {
  await axios
  .post(`${userUrl}password-reset/${token}`,{password})
  .then((res) =>{
if(res.data.message){
  enqueueSnackbar(res.data.message, { variant: 'success' })
  
}else if (res.data.error){
  throw new Error()
}
  })
  setInput({  password: undefined,
  confirmPassword: undefined})
} catch (error) {
  enqueueSnackbar('Password reset failed , try again later', { variant: 'error' })
}
 
 }


  return (
  <>
 
    <div className='reset'>

    <p className='title'>Enter new password</p>
     
        <form className='reset__form' onSubmit={handleSubmit}>
          <FormInput
            name='password'
            type='password'
            label='Password'
            value={password}
            handleChange={handleChange}
            minLength={6}
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
            {' '}
            Submit
          </Button>
        </form>
        <p className = 'title'>
Your new password must include:
8-36 characters,
at least 1 mixed-case letter and
at least 1 number</p>
<Button className = 'dash__button' onClick={handleReturn}>Return</Button>
    </div>
    </>
  );
};

export default PasswordResetForm
