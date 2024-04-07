import React from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import {useCombinedContext } from '../cartcontext/CombinedContext';
import { Margin } from '@mui/icons-material'; 
import { Link, NavLink} from 'react-router-dom'; 

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCombinedContext();

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div style={{ display: 'flex' }} className='sec-space'>
      <div style={{ flex: 3 }}>
        <Typography variant='h4'>Cart</Typography>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Your cart is empty.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <img src={item.images[0]} alt={item.title} style={{ width: '50px', height: '50px' }} />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>Rs {item.price}</TableCell>
                    <TableCell>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>
      <div style={{ flex: 1, marginLeft: '20px' }}>
        <Paper style={{ padding: '40px 10px', minHeight:'100%' }}>
          <Typography variant="h6"style={{paddingBottom: '15px'}}>Order Summary</Typography>
          <Typography variant="body1">Total: Rs {totalPrice}</Typography>
          <div className="add-to-cart " style={{ marginTop:'20px' }}><Button variant='outlined' to="/checkout" component={NavLink} className='btn-cart btn-checkout'>Proceed To Checkout</Button></div>
        </Paper>
      </div>
    </div>
  );
};

export default CartPage;
