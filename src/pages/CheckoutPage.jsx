import React, { useState } from 'react';
import { Typography, Grid, TextField, Button, Paper, MenuItem } from '@mui/material';
import { useCombinedContext } from '../cartcontext/CombinedContext';


const CheckoutPage = () => {
  const { cartItems, clearCart } = useCombinedContext(); 


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '', 
    city: '',
    zip: '',
    state: '', 
    country: '',
    paymentMethod: 'creditCard',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentMethodChange = (e) => {
    setFormData({ ...formData, paymentMethod: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearCart();
 window.location.href = '/confirmation';
  };

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper elevation={3}  className='checkout'>
          <Typography variant="h6" gutterBottom className='mb-3'>Shipping Information</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Address"
                  variant="outlined"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Zip Code"
                  variant="outlined"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  label="State"
                  variant="outlined"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  fullWidth className='mb-3'
                />
              </Grid>
              {/* Add more fields for country, etc. */}
            </Grid>
            <Typography variant="h6" style={{ marginTop: '20px' }} className='mb-3'>Payment Method</Typography>
            <TextField
              select
              variant="outlined"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handlePaymentMethodChange}
              fullWidth
            >
              <MenuItem value="creditCard">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>Place Order</Button>
          </form>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} style={{ paddingLeft:'20px' }}  className='checkout'>
          <Typography variant="h6">Order Summary</Typography>
          <Typography variant="body1">Total: ${totalPrice.toFixed(2)}</Typography>
          {/* Display cart items */}
          {cartItems.map((item) => (
            <Typography key={item.id}>{item.title} - ${item.price.toFixed(2)}</Typography>
          ))}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
