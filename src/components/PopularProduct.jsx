import React, { useState } from 'react';
import useApiData from '../customhooks/useApiData';
import { useCombinedContext } from '../cartcontext/CombinedContext';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Skeleton, Box, Paper, Modal, Button, Grid, Typography } from '@mui/material';
import theme from '../style/theme';

const PopularProduct = () => {
  const { addToCart, addToWishlist } = useCombinedContext();
  const { products, error, loading } = useApiData('https://dummyjson.com/products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Box>
      <Grid container spacing={2} alignItems='center'>
        {Array.isArray(products) &&
          products.slice(15, 19).map((item, index) => (
            <Grid key={index} item xs={12} sm={3}>
              <div style={{ position: 'relative' }} className='product-list'>
                {item.images && item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt=''
                    width='100%'
                    className='img-border'
                    style={{ height: '342px' }}
                  />
                )}
                {item.discountPercentage && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      backgroundColor: theme.palette.danger.main,
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                    }}
                  >
                    {item.discountPercentage}% OFF
                  </div>
                )}
              <Button variant='contained' className='btn btn-dark' size="small" onClick={() => handleOpen(item)}>Quick View</Button>
              <Modal open={open} onClose={handleClose} className='modal-box'>
                <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', p: 5 }} className='box-shadow'>
                  <Button onClick={handleClose}><ClearIcon className='close-icon' /></Button>
                  {selectedProduct && (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={6} style={{ paddingRight: '30px' }}>
                          <img src={selectedProduct.images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '300px', height: '280px', marginBottom: '16px' }} />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="h6" gutterBottom>
                            {selectedProduct.title}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            {selectedProduct.description}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Rs <b>{selectedProduct.price}</b>
                          </Typography>
                          <div className="modal-btn">
                            <div className="add-to-cart">
                              <Button variant='outlined' className='btn-cart' onClick={() => addToCart(item)}>Add To Cart</Button>
                            </div>
                            <div>
                              <FavoriteBorderIcon className='wishlist-icon' onClick={()=> addToWishlist(item)} />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Paper>
              </Modal>
              <div className='product-wishlist'>
                <FavoriteBorderIcon className='wishlist-icon' onClick={() => addToWishlist(item)} />
                <span className='wishlist-text' onClick={() => addToWishlist(item)}>Add to Wishlist</span>
              </div>
              <div className="add-to-cart">
                <Button variant='outlined' className='btn-cart' onClick={() => addToCart(item)}>Add To Cart</Button>
                </div>
                </div>
              <Typography variant='body2' align='center'>
                <b>{item.title}</b>
              </Typography>
              <Typography
                variant='body2'
                align='center'
                style={{ color: theme.palette.primary.main }}
              >
                Rs {item.price}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default PopularProduct;
