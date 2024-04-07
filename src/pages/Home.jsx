import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import theme from '../style/theme';
import { NavLink } from 'react-router-dom';
import banner from '../assets/Images/new-banner.jpg';
import PopularProduct from '../components/PopularProduct';
import ProductCategory from '../components/ProductCategory';
import BestSeller from '../components/BestSeller';
import CustomerReview from '../components/CustomerReview';

const Home = () => {
  return (
    <>
        <Box className='section-space'>
          <Grid container spacing={2} alignItems= 'center'>
            <Grid item xs={12} sm={6} style={{position:'relative'}} className='main-banner'>
              <Typography variant='h3'style={{marginBottom:'30px'}} className='banner-title' >
                Latest Trends
              </Typography>
              <Typography variant='body1'>
                An e-commerce company conducts commercial transactions online, typically selling products or services over the internet. These companies leverage digital platforms to reach a wide audience, facilitate transactions, and provide a seamless shopping experience for customers.
              </Typography>
              <Button variant='outlined' className='btn btn-primary btn-shop'component={NavLink} to='/products' style={{ margin: '15px 0 0 0' }}
              >Shop Now</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={banner} alt="" width='100%' />
            </Grid>
          </Grid>
        </Box>
        <Box className="section-space pt-0">
         <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Best Seller</Typography>
          <BestSeller />
        </Box>
        <Box className="section-space pt-0">
          <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Popular Product</Typography>
          <PopularProduct />
        </Box>
        <Box className="section-space pt-0">
          <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Shop By Category</Typography>
          <ProductCategory />
        </Box>
        <Box className="section-space pt-0">
          <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Customer Review</Typography>
          <CustomerReview/>
        </Box>
    </>
  );
};

export default Home;
