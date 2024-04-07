import React, { useState } from 'react';
import { useCombinedContext } from '../cartcontext/CombinedContext';
import { Typography, Grid, Button, Modal, Paper } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../style/theme';

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCombinedContext();
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className='sec-space'>
      <Typography variant="h4" gutterBottom>
        Wishlist
      </Typography>
      {wishlistItems.length === 0 ? (
        <Typography variant="body1">Your wishlist is empty.</Typography>
      ) : (
        <Grid container spacing={2} >
            <Grid container item justifyContent="flex-end" style={{ marginBottom: '40px',  marginTop: '20px'}}>
              <div className="product-view">
                <Typography variant='h6' className='text-uppercase'>
                View
                </Typography>
                <div className='view-button'  style={{paddingLeft: 0}}>
                    <Button
                    variant="outlined"
                    className={`btn btn-primary ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => handleToggleView('list')}
                  >
                <FormatListBulletedIcon />
                  </Button>
                  <Button
                    variant="outlined"
                    className={`btn btn-primary ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => handleToggleView('grid')}
                  >
                    <GridViewIcon />
                  </Button>
                </div>
              </div>
          </Grid>
          {wishlistItems.map((item, index) => (
            <Grid key={index} item xs={12} sm={viewMode === 'grid' ? 4 : 3} className='mb-3'>
              <div style={{ position: 'relative' }} className='product-list'>
                {item.images && item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt=""
                    width="100%"
                    className="img-border"
                    style={{ height: '320px' }}
                  />
                )}
                {item.discountPercentage && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '2px',
                      right: '2px',
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
                <Button variant="contained" className="btn btn-dark" size="small" onClick={() => handleOpen(item)}>Quick View</Button>
                <Modal open={open} onClose={handleClose} className="modal-box">
                  <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper', p: 5 }} className="box-shadow">
                    <Button onClick={handleClose}><ClearIcon className="close-icon" /></Button>
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
                                <Button variant="outlined" className="btn-cart" onClick={() => addToCart(selectedProduct)}>Add To Cart</Button>
                              </div>
                              <div>
                                <FavoriteBorderIcon className="wishlist-icon" />
                              </div>
                            </div>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Paper>
                </Modal>
                <div className="product-wishlist">
                  <FavoriteBorderIcon className="wishlist-icon" onClick={() => removeFromWishlist(item.id)} />
                  <span className="wishlist-text" onClick={() => removeFromWishlist(item.id)}>Remove from Wishlist</span>
                </div>
              </div>
              <Typography variant="body2" align="center">
                <b>{item.title}</b>
              </Typography>
              <Typography variant="body2" align="center" style={{ color: theme.palette.primary.main }}>
                Rs {item.price}
              </Typography>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

export default WishlistPage;
