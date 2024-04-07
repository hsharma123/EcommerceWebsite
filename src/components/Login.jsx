
import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import account from '../Services/AuthServices';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

  }
  const loginOpen = async() => {
    try {
      if (!isValidEmail(email)) {
        console.log('Please enter a valid email');
        return;
      }
      const result = await account.createEmailSession(email, password);
      console.log(result);
      setIsLoggedIn(true);
      navigate('/Home');
    }
    catch (error) {
      console.error('Error login:', error);
    }
  }
  const handleLogin = (e) => { 
    e.preventDefault();
    if (email === "" || password === "") {
      console.log('please enter your all details');
    }
    else {
      loginOpen();
    }
  }
  if (isLoggedIn) {
    navigate('/Home')
    return null;
  }
  return (
      <div className='form-box'>
          <Box component='form' className='custom-form'>
              <Typography variant='h5' color= 'black' style={{marginBottom: '20px'}}>Login Your Account</Typography>
              <div>
                <TextField type='email' label='Email' variant='outlined' size='small' value={email} onChange={(e)=>setEmail(e.target.value)}> </TextField>
              </div>
              <div>
                <TextField type='password' label='Password' variant='outlined' size='small' value={password} onChange={(e) =>setPassword(e.target.value)} > </TextField>
              </div>
              <div>
                  <Button variant='contained' color='primary' className='btn btn-primary' sx={{ width: 258, padding: 1, margin: 0, height: 40 }} onClick={handleLogin}>Login</Button>
             </div>
              
          </Box>
      </div>
  )
}

export default Login