import React, { useState } from 'react';
import useApiData from '../customhooks/useApiData';
import { Skeleton, Box, Typography, Modal, Paper, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {useCombinedContext } from '../cartcontext/CombinedContext';
import Slider from 'react-slick';
import theme from '../style/theme';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BestSeller = () => {
  const {addToCart } =  useCombinedContext();
  const{addToWishlist} = useCombinedContext();
  const { products, error, loading } = useApiData('https://dummyjson.com/products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [open, setOpen] = useState(false);

  if (loading) {
    return <Skeleton variant="rectangular" width={210} height={118} />;
  }

  if (error) {
    return <Typography variant="body2">Error: {error.message}</Typography>;
  }

  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <Box>
      <Slider {...settings}>
        {Array.isArray(products) &&
          products.slice(8, 16).map((item, index) => (
            <div key={index}>
              <div style={{ position: 'relative' }} className='product-list'>
                {item.images && item.images[0] && (
                  <img src={item.images[0]} alt='' width='100%' style={{ height: '300px' }} />
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
                <Button variant='contained' className='btn btn-dark' size='small' onClick={() => handleOpen(item)}>
                  Quick View
                </Button>
                <Modal open={open} onClose={handleClose} className='modal-box'>
                  <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', p: 5 }} className='box-shadow'>
                    <Button onClick={handleClose}>
                      <ClearIcon className='close-icon' />
                    </Button>
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
                                <FavoriteBorderIcon className='wishlist-icon' onClick={() => addToWishlist(item)} />
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
              <Typography variant='body2' align='center' style={{ marginTop: '10px' }}>
                <b>{item.title}</b>
              </Typography>
              <Typography variant='body2' align='center' style={{ color: theme.palette.primary.main }}>
                Rs {item.price}
              </Typography>
            </div>
          ))}
      </Slider>
    </Box>
  );
};

export default BestSeller;
