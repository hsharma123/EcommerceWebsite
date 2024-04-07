import React, { useState } from 'react';
import {useCombinedContext } from '../cartcontext/CombinedContext';
import { Box, Grid, TextField, Typography, FormControl, Select, MenuItem, Button, Pagination, Modal, Paper } from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GridViewIcon from '@mui/icons-material/GridView';
import ClearIcon from '@mui/icons-material/Clear';
import theme from '../style/theme';

const Productlist = ({ selectedCategory, products, priceRange }) => {
  const {addToCart } =  useCombinedContext();
  const{addToWishlist} = useCombinedContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const itemsPerPage = 6;

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const searchMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && searchMatch && priceMatch;
  });

  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const sortProducts = (products) => {
    let sortedProducts = [...products];
    switch (sort) {
      case '10':
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case '20':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case '30':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      default:
        break;
    }
    return sortedProducts;
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleToggleView = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
 
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = sortProducts(filteredProducts).slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Box>
      <Grid container spacing={2} alignItems='center' className='product-filter'>
        <Grid xs={12} sm={3} style={{ marginBottom: '40px' }}>
          <TextField fullWidth value={searchQuery} onChange={handleSearchChange} placeholder='Search Product' size='small' className='text-field' />
        </Grid>
        <Grid xs={12} sm={4} style={{ marginBottom: '40px' }}>
          <div className="product-sort">
            <Typography variant='body2' className='text-uppercase'>
              Sort By
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <Select className='text-field' value={sort} onChange={handleSortChange}>
                <MenuItem value="">Sorting</MenuItem>
                <MenuItem value="10">Alphabetic A to Z</MenuItem>
                <MenuItem value="20">Price high to low</MenuItem>
                <MenuItem value="30">Price low to high</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Grid>
        <Grid xs={12} sm={5} style={{ marginBottom: '40px' }}>
          <div className="product-view">
            <Typography variant='body2' className='text-uppercase'>
              View
            </Typography>
            <div className="view-button">
              <Button
                variant='outlined'
                className={`btn btn-primary ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => handleToggleView('list')}
              >
                <FormatListBulletedIcon />
              </Button>
              <Button
                variant='outlined'
                className={`btn btn-primary ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => handleToggleView('grid')}
              >
                <GridViewIcon />
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center">
        {Array.isArray(products) &&
          currentProducts.map((item, index) => (
            <Grid key={index} item xs={12} sm={viewMode === 'grid' ? 4 : 3} className='mb-3'>
              <div style={{ position: 'relative' }} className='product-list'>
                {item.images && item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt=""
                    width="100%"
                    className="img-border"
                    style={{ height: '280px' }}
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
                <Button variant='contained' className='btn btn-dark' size="small" onClick={() => handleOpen(item)}>Quick View</Button>
                <Modal open={open} onClose={handleClose} className='modal-box'>
                  <Paper sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 800, bgcolor: 'background.paper',p: 5 }} className='box-shadow'>
                  <Button onClick={handleClose}><ClearIcon className='close-icon'/></Button>
                    {selectedProduct && (
                      <>
                        <Grid container spacing={2}>
                          <Grid item xs={6} style={{paddingRight:'30px'}}>
                            <img src={selectedProduct.images[0]} alt="" style={{ maxWidth: '100%', maxHeight: '300px', height:'280px', marginBottom: '16px' }} />
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
                  <FavoriteBorderIcon className='wishlist-icon' onClick={()=> addToWishlist(item)} />
                  <span className='wishlist-text' onClick={()=> addToWishlist(item)}>Add to Wishlist</span>
                </div>
                <div className="add-to-cart">
                <Button variant='outlined' className='btn-cart' onClick={() => addToCart(item)}>Add To Cart</Button>

                </div>
              </div>
              <Typography variant="body2" align="center">
                <b>{item.title}</b>
              </Typography>
              <Typography
                variant="body2"
                align="center"
                style={{ color: theme.palette.primary.main }}
              >
                Rs {item.price}
              </Typography>
            </Grid>
          ))}
      </Grid>
      <div className="pagination">
        <Pagination count={Math.ceil(filteredProducts.length / itemsPerPage)} page={currentPage} onChange={handlePageChange} color="primary" />
      </div>
    </Box>
  );
};

export default Productlist;
