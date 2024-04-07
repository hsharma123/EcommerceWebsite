import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import account from '../Services/AuthServices';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const register = async () => { 
    try {
      if (!isValidEmail(email)) {
        console.error('Invalid email address');
        return;
      }

      const result = await account.create('unique()',email, password,name);
      console.log(result);
      navigate('/login');
    } catch (error) {
      // console.error('Error registering:', error);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.error('Please enter all details');
    } else {
      register();
    }
  };

  return (
    <div className='form-box'>
      <Box component='form' className='custom-form'>
        <Typography variant='h5' color='black' style={{ marginBottom: '20px' }}>
          Create Your Account
        </Typography>
        <div className=''>
          <TextField type='text' label='Name' variant='outlined' size='small' name='name' value={name} onChange={(e) => setName(e.target.value)}></TextField>
        </div>
        <div>
          <TextField type='email' label='Email' variant='outlined' size='small' name='email' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
        </div>
        <div>
          <TextField type='password' label='Password' variant='outlined' size='small' name='password' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
        </div>
        <div>
          <Button
            variant='contained'
            color='primary'
            className='btn btn-primary'
            sx={{ width: 258, padding: 1, margin: 0, height: 40 }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Signup;
