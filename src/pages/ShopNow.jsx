import React from 'react'
import { Box, Typography } from '@mui/material';
import BestSeller from '../components/BestSeller';
import CustomerReview from '../components/CustomerReview';

const ShopNow = () => {
  return (
    <div>
        <Box className="section-space">
          <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Best Seller</Typography>
          <BestSeller />
      </Box>
      <Box className="section-space pt-0">
          <Typography variant='h3' textAlign='center' style={{marginBottom:'30px'}} className='main-title'>Customer Review</Typography>
          <CustomerReview/>
      </Box>
    </div>
  )
}

export default ShopNow